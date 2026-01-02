# Day 4: Lambda Functions and Scope

print("=" * 60)
print("LAMBDA FUNCTIONS (Anonymous Functions)")
print("=" * 60)

# Lambda functions - like PHP anonymous functions/closures
# PHP: $square = function($x) { return $x * $x; };
# Python:
square = lambda x: x ** 2

print("\n--- Basic Lambda ---")
print(f"square(5) = {square(5)}")
print(f"square(10) = {square(10)}")

# Lambda with multiple arguments
add = lambda x, y: x + y
multiply = lambda x, y, z: x * y * z

print(f"\nadd(5, 3) = {add(5, 3)}")
print(f"multiply(2, 3, 4) = {multiply(2, 3, 4)}")

# Using lambda with built-in functions
numbers = [1, 2, 3, 4, 5]

print("\n--- Lambda with Built-in Functions ---")
# map() - apply function to each item
squared = list(map(lambda x: x ** 2, numbers))
print(f"Original: {numbers}")
print(f"Squared: {squared}")

# filter() - keep items that match condition
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(f"Even numbers: {evens}")

# Sorting with lambda
students = [
    {"name": "Alice", "grade": 85},
    {"name": "Bob", "grade": 92},
    {"name": "Charlie", "grade": 78},
    {"name": "Diana", "grade": 95}
]

print("\n--- Sorting with Lambda ---")
# Sort by grade
sorted_by_grade = sorted(students, key=lambda s: s["grade"])
print("Sorted by grade:")
for student in sorted_by_grade:
    print(f"  {student['name']}: {student['grade']}")

# Sort by grade (descending)
sorted_desc = sorted(students, key=lambda s: s["grade"], reverse=True)
print("\nSorted by grade (descending):")
for student in sorted_desc:
    print(f"  {student['name']}: {student['grade']}")

# When to use lambda vs regular function
print("\n--- Lambda vs Regular Function ---")

# Lambda: For simple, one-line operations
double = lambda x: x * 2

# Regular function: For complex logic
def calculate_discount(price, customer_type):
    """Calculate discount based on customer type."""
    if customer_type == "premium":
        return price * 0.20
    elif customer_type == "regular":
        return price * 0.10
    else:
        return 0

print(f"double(10) = {double(10)}")
print(f"Discount for premium: {calculate_discount(1000, 'premium')}")

# SCOPE - Variable visibility
print("\n" + "=" * 60)
print("VARIABLE SCOPE")
print("=" * 60)

# Global scope
global_var = "I'm global"

def test_global():
    """Access global variable."""
    print(f"Inside function: {global_var}")

print("\n--- Global Scope ---")
print(f"Outside function: {global_var}")
test_global()

# Local scope
def test_local():
    """Variables defined inside function are local."""
    local_var = "I'm local"
    print(f"Inside function: {local_var}")

print("\n--- Local Scope ---")
test_local()
# print(local_var)  # This would cause ERROR - local_var doesn't exist here!

# Modifying global variable
counter = 0

def increment_wrong():
    """This creates a LOCAL variable, doesn't modify global!"""
    counter = counter + 1  # ERROR! Can't read global before assigning
    print(f"Counter: {counter}")

def increment_correct():
    """Use 'global' keyword to modify global variable."""
    global counter
    counter = counter + 1
    print(f"Counter: {counter}")

print("\n--- Modifying Global Variables ---")
print(f"Initial counter: {counter}")
increment_correct()
increment_correct()
increment_correct()
print(f"Final counter: {counter}")

# Nested functions and nonlocal
def outer_function():
    """Outer function with nested function."""
    outer_var = "I'm in outer function"
    
    def inner_function():
        """Inner function can access outer variables."""
        print(f"Inner can access: {outer_var}")
    
    inner_function()
    print(f"Outer var: {outer_var}")

print("\n--- Nested Functions ---")
outer_function()

# Using nonlocal
def counter_function():
    """Function that maintains state using nonlocal."""
    count = 0
    
    def increment():
        nonlocal count  # Modify variable in outer function
        count += 1
        return count
    
    def get_count():
        return count
    
    # Return inner functions
    return increment, get_count

print("\n--- nonlocal Keyword ---")
inc, get = counter_function()
print(f"Count: {get()}")
print(f"After increment: {inc()}")
print(f"After increment: {inc()}")
print(f"After increment: {inc()}")
print(f"Final count: {get()}")

# Practical example: Closure (function factory)
def make_multiplier(n):
    """Create a function that multiplies by n."""
    def multiplier(x):
        return x * n
    return multiplier

print("\n--- Closures (Function Factory) ---")
times_2 = make_multiplier(2)
times_5 = make_multiplier(5)
times_10 = make_multiplier(10)

print(f"times_2(7) = {times_2(7)}")
print(f"times_5(7) = {times_5(7)}")
print(f"times_10(7) = {times_10(7)}")

# Practical example: Create validators
def create_validator(min_length, max_length):
    """Create a string length validator."""
    def validate(text):
        length = len(text)
        if length < min_length:
            return False, f"Too short (min {min_length})"
        elif length > max_length:
            return False, f"Too long (max {max_length})"
        else:
            return True, "Valid"
    return validate

print("\n--- Practical: Validators ---")
password_validator = create_validator(8, 20)
username_validator = create_validator(3, 15)

passwords = ["abc", "securepass123", "thispasswordiswaytoolongforvalidation"]
for pwd in passwords:
    valid, message = password_validator(pwd)
    status = "✓" if valid else "✗"
    print(f"{status} '{pwd}': {message}")

print("\n" + "=" * 60)