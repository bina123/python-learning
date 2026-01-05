# Day 7 Final Challenge: E-Commerce System

"""
Build a complete e-commerce system that uses ALL Week 1 concepts:
- Classes and inheritance
- Abstract methods
- Properties
- File I/O (save/load)
- Exception handling
- List/dict comprehensions
- Functions with *args/**kwargs
"""

import json
from abc import ABC, abstractmethod
from datetime import datetime

print("=" * 60)
print("WEEK 1 FINAL CHALLENGE: E-COMMERCE SYSTEM")
print("=" * 60)

# Product hierarchy
class Product(ABC):
    """Abstract base class for products."""
    
    _product_counter = 1000
    
    def __init__(self, name, price, stock):
        Product._product_counter += 1
        self._id = f"PROD{Product._product_counter}"
        self._name = name
        self._price = price
        self._stock = stock #protected variable
    
    @property #Getter method
    def id(self):
        return self._id
    
    @property
    def name(self):
        return self._name
    
    @property
    def price(self):
        return self._price
    
    @property
    def stock(self):
        return self._stock
    
    @abstractmethod
    def get_category(self):
        """Must be implemented by subclasses."""
        pass
    
    def reduce_stock(self, quantity):
        """Reduce stock quantity."""
        if quantity > self._stock:
            raise ValueError(f"Not enough stock. Available: {self._stock}")
        self._stock -= quantity
    
    def add_stock(self, quantity):
        """Add stock quantity."""
        self._stock += quantity
    
    def to_dict(self):
        """Convert to dictionary."""
        return {
            "id": self._id,
            "name": self._name,
            "price": self._price,
            "stock": self._stock,
            "category": self.get_category()
        }
    
    def __str__(self):
        return f"{self._name} - ₹{self._price} ({self._stock} in stock)"

class Electronics(Product):
    def __init__(self, name, price, stock, warranty_months):
        super().__init__(name, price, stock)
        self.warranty_months = warranty_months
    
    def get_category(self):
        return "Electronics"

class Clothing(Product):
    def __init__(self, name, price, stock, size):
        super().__init__(name, price, stock)
        self.size = size
    
    def get_category(self):
        return "Clothing"

class Books(Product):
    def __init__(self, name, price, stock, author):
        super().__init__(name, price, stock)
        self.author = author
    
    def get_category(self):
        return "Books"

# Customer class
class Customer:
    """Customer with shopping cart."""
    
    _customer_counter = 1000
    
    def __init__(self, name, email):
        Customer._customer_counter += 1
        self.id = f"CUST{Customer._customer_counter}"
        self.name = name
        self.email = email
        self.cart = []
        self.orders = []
    
    def add_to_cart(self, product, quantity=1):
        """Add product to cart."""
        if quantity > product.stock:
            return f"✗ Not enough stock for {product.name}"
        
        self.cart.append({"product": product, "quantity": quantity})
        return f"✓ Added {quantity}x {product.name} to cart"
    
    def get_cart_total(self):
        """Calculate cart total."""
        return sum(item["product"].price * item["quantity"] for item in self.cart)
    
    def checkout(self):
        """Process order."""
        if not self.cart:
            return "✗ Cart is empty"
        
        try:
            # Reduce stock for all items
            for item in self.cart:
                product = item["product"]
                quantity = item["quantity"]
                product.reduce_stock(quantity)
            
            # Create order
            order = Order(self, self.cart.copy())
            self.orders.append(order)
            
            # Clear cart
            self.cart = []
            
            return f"✓ Order placed! Order ID: {order.id}"
            
        except ValueError as e:
            return f"✗ Checkout failed: {e}"
    
    def __str__(self):
        return f"Customer {self.id}: {self.name} ({self.email})"

# Order class
class Order:
    """Customer order."""
    
    _order_counter = 1000
    
    def __init__(self, customer, items):
        Order._order_counter += 1
        self.id = f"ORD{Order._order_counter}"
        self.customer = customer
        self.items = items
        self.total = sum(item["product"].price * item["quantity"] for item in items)
        self.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.status = "Processing"
    
    def get_summary(self):
        """Get order summary."""
        summary = f"\n--- Order {self.id} ---\n"
        summary += f"Customer: {self.customer.name}\n"
        summary += f"Date: {self.timestamp}\n"
        summary += f"Status: {self.status}\n\n"
        summary += "Items:\n"
        
        for item in self.items:
            product = item["product"]
            quantity = item["quantity"]
            subtotal = product.price * quantity
            summary += f"  {quantity}x {product.name} - ₹{subtotal}\n"
        
        summary += f"\nTotal: ₹{self.total}"
        return summary

# Store class
class Store:
    """E-commerce store."""
    
    def __init__(self, name):
        self.name = name
        self.products = {}
        self.customers = {}
        self.orders = []
    
    def add_product(self, product):
        """Add product to store."""
        self.products[product.id] = product
        return f"✓ Added: {product.name}"
    
    def register_customer(self, customer):
        """Register customer."""
        self.customers[customer.id] = customer
        return f"✓ Registered: {customer.name}"
    
    def get_product(self, product_id):
        """Get product by ID."""
        return self.products.get(product_id)
    
    def get_customer(self, customer_id):
        """Get customer by ID."""
        return self.customers.get(customer_id)
    
    def search_products(self, **filters):
        """Search products with filters."""
        results = list(self.products.values())
        
        # Filter by category
        if "category" in filters:
            results = [p for p in results if p.get_category() == filters["category"]]
        
        # Filter by max price
        if "max_price" in filters:
            results = [p for p in results if p.price <= filters["max_price"]]
        
        # Filter by availability
        if filters.get("in_stock"):
            results = [p for p in results if p.stock > 0]
        
        return results
    
    def get_sales_report(self):
        """Generate sales report."""
        total_revenue = sum(order.total for order in self.orders)
        total_orders = len(self.orders)
        
        # Products sold count
        products_sold = {}
        for order in self.orders:
            for item in order.items:
                product_name = item["product"].name
                quantity = item["quantity"]
                products_sold[product_name] = products_sold.get(product_name, 0) + quantity
        
        return {
            "total_revenue": total_revenue,
            "total_orders": total_orders,
            "products_sold": products_sold
        }
    
    def save_data(self, filename="store_data.json"):
        """Save store data to file."""
        try:
            data = {
                "products": [p.to_dict() for p in self.products.values()],
                "customers": [
                    {"id": c.id, "name": c.name, "email": c.email}
                    for c in self.customers.values()
                ]
            }
            
            with open(filename, 'w') as f:
                json.dump(data, f, indent=2)
            
            return f"✓ Data saved to {filename}"
        except Exception as e:
            return f"✗ Save failed: {e}"

# Demo: Complete E-Commerce System
print("\n--- Setting Up Store ---\n")

store = Store("Python E-Shop")

# Add products
laptop = Electronics("Dell Laptop", 75000, 10, 24)
phone = Electronics("iPhone 14", 85000, 15, 12)
tshirt = Clothing("Python T-Shirt", 500, 50, "L")
book = Books("Python Crash Course", 1200, 30, "Eric Matthes")

print(store.add_product(laptop))
print(store.add_product(phone))
print(store.add_product(tshirt))
print(store.add_product(book))

# Register customers
bina = Customer("Bina Pithadiya", "bina@example.com")
raj = Customer("Raj Kumar", "raj@example.com")

print(f"\n{store.register_customer(bina)}")
print(store.register_customer(raj))

# Shopping - Bina
print(f"\n--- {bina.name}'s Shopping ---\n")
print(bina.add_to_cart(laptop, 1))
print(bina.add_to_cart(book, 2))
print(f"Cart total: ₹{bina.get_cart_total()}")

# Checkout
print(f"\n{bina.checkout()}")
if bina.orders:
    store.orders.append(bina.orders[-1])
    print(bina.orders[-1].get_summary())

# Shopping - Raj
print(f"\n--- {raj.name}'s Shopping ---\n")
print(raj.add_to_cart(phone, 1))
print(raj.add_to_cart(tshirt, 3))
print(f"Cart total: ₹{raj.get_cart_total()}")

print(f"\n{raj.checkout()}")
if raj.orders:
    store.orders.append(raj.orders[-1])
    print(raj.orders[-1].get_summary())

# Search products
print("\n--- Product Search ---\n")
print("Electronics in stock:")
electronics = store.search_products(category="Electronics", in_stock=True)
for product in electronics:
    print(f"  {product}")

print("\nProducts under ₹10000:")
affordable = store.search_products(max_price=10000, in_stock=True)
for product in affordable:
    print(f"  {product}")

# Sales report
print("\n--- Sales Report ---\n")
report = store.get_sales_report()
print(f"Total Revenue: ₹{report['total_revenue']}")
print(f"Total Orders: {report['total_orders']}")
print(f"\nProducts Sold:")
for product, quantity in report['products_sold'].items():
    print(f"  {product}: {quantity} units")

# Save data
print(f"\n{store.save_data('day7_store_data.json')}")

print("\n" + "=" * 60)
print("CONGRATULATIONS! WEEK 1 COMPLETE! 🎉🎊")
print("=" * 60)
print("\nYou've mastered:")
print("✓ Python basics & syntax")
print("✓ Data structures (lists, dicts, tuples, sets)")
print("✓ Functions & lambdas")
print("✓ File I/O & JSON")
print("✓ Exception handling")
print("✓ Object-Oriented Programming")
print("✓ Inheritance & Polymorphism")
print("✓ Abstract classes & Design patterns")
print("\nReady for Week 2: Django & React! 🚀")
print("=" * 60)