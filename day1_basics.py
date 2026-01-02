# Day 1: Python Basics
# Coming from PHP, these are the key differences

print("=" * 50)
print("WELCOME TO PYTHON!")
print("=" * 50)

# Variables (no $ sign!)
name = "John Doe"
age = 30
salary = 75000.50
is_developer = True
projects = None  # like PHP's null

# Print variables
print("\n--- Variables ---")
print("Name:", name)
print("Age:", age)
print("Salary: $" + str(salary))  # Convert to string

# F-strings (BEST way - like PHP: "Hello $name")
print(f"Hello {name}, you are {age} years old")
print(f"Your salary is ${salary:,.2f}")  # Format with commas

# Check types
print("\n--- Data Types ---")
print(f"Type of name: {type(name)}")
print(f"Type of age: {type(age)}")
print(f"Type of salary: {type(salary)}")
print(f"Type of is_developer: {type(is_developer)}")

# String operations
print("\n--- String Operations ---")
text = "Python Programming"
print(f"Original: {text}")
print(f"Lowercase: {text.lower()}")
print(f"Uppercase: {text.upper()}")
print(f"Length: {len(text)}")
print(f"Replace: {text.replace('Python', 'Django')}")
print(f"Split: {text.split()}")

# Numbers and Math
print("\n--- Math Operations ---")
x = 10
y = 3
print(f"Addition: {x} + {y} = {x + y}")
print(f"Subtraction: {x} - {y} = {x - y}")
print(f"Multiplication: {x} * {y} = {x * y}")
print(f"Division: {x} / {y} = {x / y}")
print(f"Integer Division: {x} // {y} = {x // y}")  # NEW!
print(f"Modulo: {x} % {y} = {x % y}")
print(f"Power: {x} ** {y} = {x ** y}")  # 10^3 = 1000

# Multi-line string
print("\n--- Multi-line String ---")
bio = """
I am a PHP/Laravel developer
Learning Python and Django
To become a full-stack Python developer
"""
print(bio)

print("=" * 50)
print("Day 1 Basics Complete!")
print("=" * 50)