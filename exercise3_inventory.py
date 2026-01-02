# Exercise 3: Product Inventory System

# Create a list of products (each product is a dictionary)
# Each product should have: name, price, quantity, category

products = [
    {"name": "Diamond 1", "price": 23.33,"quantity": 3,"category": "Single Stone"},
    {"name": "Diamond 2", "price": 33.33,"quantity": 2,"category": "Parcel Stone"},
    {"name": "Diamond 3", "price": 43.33,"quantity": 1,"category": "Single Stone"},
    {"name": "Diamond 4", "price": 63.33,"quantity": 4,"category": "Parcel Stone"},
    {"name": "Diamond 5", "price": 33.33,"quantity": 1,"category": "Single Stone"}
]

# TASKS:
# 1. Calculate total inventory value (price * quantity for all)
# 2. Find the most expensive product
# 3. List all products in a specific category
# 4. Find products with quantity less than 5 (low stock)
# 5. Calculate average price of all products

# YOUR CODE HERE
# TASK 1: Calculate total inventory value
print("\n--- Task 1: Total Inventory Value ---")
total_inventory_value = 0  # Start with 0, not ""
for product in products:
    total_inventory_value += product["price"] * product["quantity"]

print(f"Total Inventory Value: ${total_inventory_value:.2f}")

# TASK 2: Find the most expensive product
print("\n--- Task 2: Most Expensive Product ---")
most_expensive_product = None
max_price = 0

for product in products:
    if product["price"] > max_price:
        max_price = product["price"]
        most_expensive_product = product

if most_expensive_product:
    print(f"Most Expensive: {most_expensive_product['name']}")
    print(f"Price: ${most_expensive_product['price']:.2f}")
    
# TASK 3: List all products in a specific category
print("\n--- Task 3: Products by Category ---")
category_to_find = "Single Stone"
print(f"Products in '{category_to_find}' category:")

for product in products:
    if product["category"] == category_to_find:
        print(f"  - {product['name']}: ${product['price']:.2f} (Qty: {product['quantity']})")

print("\n--- Task 4: Low Stock Products ---")
low_stock_products = []

for product in products:
    if product["quantity"] < 5:
        low_stock_products.append(product)

print(f"Found {len(low_stock_products)} low stock products:")
for product in low_stock_products:
    print(f"  - {product['name']}: Only {product['quantity']} left")

print("\n--- Task 5: Average Price ---")
total_price = 0

for product in products:
    total_price += product["price"]
average_price = total_price / len(products)

print(f"Average Price: ${average_price:.2f}")


category_to_find = "Single Stone"
print(f"\n--- Products in '{category_to_find}' category ---")
for product in products:
    if product["category"] == category_to_find:
        print(f"  {product['name']}: ${product['price']}")

# Method 2: Using list comprehension (more Pythonic)
single_stone_products = [p for p in products if p["category"] == "Single Stone"]
print(f"\nSingle Stone products: {single_stone_products}")