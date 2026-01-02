# Day 4 Exercises

print("=" * 60)
print("DAY 4 EXERCISES")
print("=" * 60)

# Exercise 1: Calculator Functions
print("\n--- Exercise 1: Calculator with Functions ---")
"""
Create functions for: add, subtract, multiply, divide, power
Each function should handle errors (like division by zero)
"""

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Error: Division by zero"
    return a / b

def power(a, b):
    return a ** b

# Test all functions
print(f"10 + 5 = {add(10, 5)}")
print(f"10 - 5 = {subtract(10, 5)}")
print(f"10 * 5 = {multiply(10, 5)}")
print(f"10 / 5 = {divide(10, 5)}")
print(f"10 / 0 = {divide(10, 0)}")
print(f"2 ** 3 = {power(2, 3)}")

# Exercise 2: Flexible Product Price Calculator
print("\n\n--- Exercise 2: Product Price Calculator ---")
"""
Create a function that calculates final price:
- Takes price, quantity
- Optional discount percentage
- Optional tax rate
- Should support **kwargs for additional fees
"""

def calculate_final_price(price, quantity, discount=0, tax_rate=0.18, **fees):
    """
    Calculate final price with discount, tax, and additional fees.
    
    Args:
        price: Item price
        quantity: Number of items
        discount: Discount percentage (0-100)
        tax_rate: Tax rate (default 18%)
        **fees: Additional fees (shipping, handling, etc.)
    """
    subtotal = price * quantity
    discount_amount = subtotal * (discount / 100)
    after_discount = subtotal - discount_amount
    tax_amount = after_discount * tax_rate
    
    # Add all additional fees
    total_fees = sum(fees.values())
    
    final_price = after_discount + tax_amount + total_fees
    
    print(f"Price: ₹{price} × {quantity} = ₹{subtotal}")
    if discount > 0:
        print(f"Discount ({discount}%): -₹{discount_amount:.2f}")
    print(f"Tax ({tax_rate*100}%): +₹{tax_amount:.2f}")
    if fees:
        print(f"Additional fees: +₹{total_fees:.2f}")
        for fee_name, fee_amount in fees.items():
            print(f"  {fee_name}: ₹{fee_amount}")
    print(f"Final Price: ₹{final_price:.2f}")
    
    return final_price

# Test cases
print("Case 1: Basic")
calculate_final_price(1000, 2)

print("\nCase 2: With discount")
calculate_final_price(1000, 2, discount=10)

print("\nCase 3: With discount and fees")
calculate_final_price(
    1000, 2,
    discount=15,
    shipping=100,
    handling=50,
    insurance=30
)

# Exercise 3: Data Processor with Lambda
print("\n\n--- Exercise 3: Process User Data ---")
"""
Given a list of users, use lambda functions to:
1. Filter users above age 25
2. Get list of all emails
3. Sort by name
"""

users = [
    {"name": "Alice", "age": 28, "email": "alice@example.com", "salary": 50000},
    {"name": "Bob", "age": 22, "email": "bob@example.com", "salary": 45000},
    {"name": "Charlie", "age": 35, "email": "charlie@example.com", "salary": 70000},
    {"name": "Diana", "age": 24, "email": "diana@example.com", "salary": 48000},
    {"name": "Eve", "age": 30, "email": "eve@example.com", "salary": 65000}
]

# Filter users above 25
above_25 = list(filter(lambda u: u["age"] > 25, users))
print("Users above 25:")
for user in above_25:
    print(f"  {user['name']}: {user['age']} years")

# Get all emails
emails = list(map(lambda u: u["email"], users))
print(f"\nAll emails: {emails}")

# Sort by name
sorted_by_name = sorted(users, key=lambda u: u["name"])
print("\nSorted by name:")
for user in sorted_by_name:
    print(f"  {user['name']}")

# Sort by salary (descending)
sorted_by_salary = sorted(users, key=lambda u: u["salary"], reverse=True)
print("\nSorted by salary (highest first):")
for user in sorted_by_salary:
    print(f"  {user['name']}: ₹{user['salary']}")

# Exercise 4: Function Factory
print("\n\n--- Exercise 4: Discount Calculator Factory ---")
"""
Create a function that returns discount calculators
for different customer types.
"""

def create_discount_calculator(customer_type):
    """Create discount calculator based on customer type."""
    discount_rates = {
        "premium": 0.25,
        "gold": 0.15,
        "silver": 0.10,
        "regular": 0.05
    }
    
    rate = discount_rates.get(customer_type, 0)
    
    def calculate_discount(amount):
        discount = amount * rate
        final_price = amount - discount
        return {
            "original": amount,
            "discount": discount,
            "final_price": final_price,
            "type": customer_type
        }
    
    return calculate_discount

# Create calculators for different types
premium_calc = create_discount_calculator("premium")
gold_calc = create_discount_calculator("gold")
regular_calc = create_discount_calculator("regular")

# Test with ₹10,000 purchase
amount = 10000
print(f"Purchase amount: ₹{amount}")

for calc, name in [(premium_calc, "Premium"), (gold_calc, "Gold"), (regular_calc, "Regular")]:
    result = calc(amount)
    print(f"\n{name} Customer:")
    print(f"  Discount: ₹{result['discount']:.2f}")
    print(f"  Final Price: ₹{result['final_price']:.2f}")

print("\n" + "=" * 60)