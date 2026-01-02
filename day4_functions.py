# Day 4: Functions - Like PHP but cleaner!

print("=" * 60)
print("PYTHON FUNCTIONS")
print("=" * 60)

# Basic function definition
# PHP: function greet($name) { return "Hello $name"; }
# Python:
def greet(name):
    """This is a docstring - describes what the function does."""
    return f"Hello {name}!"

# Calling functions
print("\n--- Basic Functions ---")
message = greet("Bina")
print(message)
print(greet("Python Developer"))

# Functions with multiple parameters
def calculate_total(price, quantity, tax_rate=0.18):
    """
    Calculate total price with tax.
    
    Args:
        price: Item price
        quantity: Number of items
        tax_rate: Tax rate (default 18%)
    
    Returns:
        Total price including tax
    """
    subtotal = price * quantity
    tax = subtotal * tax_rate
    total = subtotal + tax
    return total

print("\n--- Functions with Parameters ---")
total = calculate_total(100, 3)  # Uses default tax_rate
print(f"Total (with default tax): ₹{total:.2f}")

total_custom = calculate_total(100, 3, 0.28)  # Custom tax rate
print(f"Total (with 28% tax): ₹{total_custom:.2f}")

# Keyword arguments (like PHP named parameters)
total_keywords = calculate_total(quantity=5, price=50, tax_rate=0.12)
print(f"Total (keyword args): ₹{total_keywords:.2f}")

# Multiple return values (Python can do this!)
def get_user_info():
    """Return multiple values as tuple."""
    name = "Bina Pithadiya"
    age = 31
    role = "Developer"
    return name, age, role  # Returns tuple

print("\n--- Multiple Return Values ---")
# Unpack returned values
user_name, user_age, user_role = get_user_info()
print(f"Name: {user_name}")
print(f"Age: {user_age}")
print(f"Role: {user_role}")

# Or get as tuple
user_info = get_user_info()
print(f"As tuple: {user_info}")

# Functions with default parameters
def create_profile(name, age, city="Narnaund", country="India"):
    """Create user profile with defaults."""
    return {
        "name": name,
        "age": age,
        "city": city,
        "country": country
    }

print("\n--- Default Parameters ---")
profile1 = create_profile("Raj", 28)
print(f"Profile 1: {profile1}")

profile2 = create_profile("Priya", 25, "Mumbai")
print(f"Profile 2: {profile2}")

profile3 = create_profile("Alex", 30, "New York", "USA")
print(f"Profile 3: {profile3}")

# Type hints (modern Python - like PHP 7+ type declarations)
def add_numbers(a: int, b: int) -> int:
    """Add two integers and return result."""
    return a + b

def get_full_name(first_name: str, last_name: str) -> str:
    """Concatenate names."""
    return f"{first_name} {last_name}"

print("\n--- Type Hints ---")
result = add_numbers(10, 20)
print(f"10 + 20 = {result}")

full_name = get_full_name("Bina", "Pithadiya")
print(f"Full name: {full_name}")

# None return (like PHP void or null)
def log_message(message: str) -> None:
    """Print a log message - returns nothing."""
    print(f"[LOG] {message}")

print("\n--- Functions Returning None ---")
log_message("Application started")
log_message("User logged in")

print("\n" + "=" * 60)