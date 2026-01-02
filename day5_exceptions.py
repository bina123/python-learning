# Day 5: Exception Handling

print("=" * 60)
print("EXCEPTION HANDLING")
print("=" * 60)

# Basic try-except (like PHP try-catch)
print("\n--- Basic Exception Handling ---")

# PHP: try { $result = 10 / 0; } catch (Exception $e) { }
# Python:
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Error: Cannot divide by zero!")

print("Program continues...")

# Catching multiple exceptions
print("\n--- Multiple Exception Types ---")

def process_number(value):
    """Process a number with multiple possible errors."""
    try:
        # Convert to integer
        num = int(value)
        
        # Divide by the number
        result = 100 / num
        
        # Access list
        numbers = [1, 2, 3]
        item = numbers[num]
        
        return result
        
    except ValueError:
        return "Error: Not a valid number"
    except ZeroDivisionError:
        return "Error: Cannot divide by zero"
    except IndexError:
        return "Error: Index out of range"

# Test different scenarios
print(f"process_number('5'): {process_number('5')}")
print(f"process_number('abc'): {process_number('abc')}")
print(f"process_number('0'): {process_number('0')}")
print(f"process_number('10'): {process_number('10')}")

# Getting exception details
print("\n--- Exception Details ---")

try:
    numbers = [1, 2, 3]
    print(numbers[10])
except IndexError as e:
    print(f"Exception type: {type(e).__name__}")
    print(f"Exception message: {e}")

# try-except-else-finally
print("\n--- try-except-else-finally ---")

def read_file_safe(filename):
    """Read file with complete error handling."""
    try:
        print(f"Trying to open {filename}...")
        with open(filename, 'r') as file:
            content = file.read()
            
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found")
        return None
        
    except PermissionError:
        print(f"Error: No permission to read '{filename}'")
        return None
        
    else:
        # Runs only if NO exception occurred
        print("✓ File read successfully")
        return content
        
    finally:
        # ALWAYS runs, whether exception occurred or not
        print("Cleanup: Closing resources if needed")

# Test it
print("\nTest 1: Existing file")
content = read_file_safe('day5_practice/sample.txt')

print("\nTest 2: Non-existent file")
content = read_file_safe('nonexistent.txt')

# Catching any exception
print("\n--- Catching Any Exception ---")

def risky_operation(value):
    """Operation that might fail in various ways."""
    try:
        # Some risky code
        result = int(value) / (int(value) - 5)
        return result
    except Exception as e:
        # Catches ANY exception
        print(f"Something went wrong: {type(e).__name__}: {e}")
        return None

print(f"risky_operation('10'): {risky_operation('10')}")
print(f"risky_operation('5'): {risky_operation('5')}")
print(f"risky_operation('abc'): {risky_operation('abc')}")

# Raising exceptions (like PHP throw)
print("\n--- Raising Exceptions ---")

def validate_age(age):
    """Validate age - raise exception if invalid."""
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    
    if age < 0:
        raise ValueError("Age cannot be negative")
    
    if age > 150:
        raise ValueError("Age seems unrealistic")
    
    return True

# Test validation
try:
    validate_age(25)
    print("✓ Age 25 is valid")
    
    validate_age("30")  # Wrong type
except (TypeError, ValueError) as e:
    print(f"✗ Validation failed: {e}")

try:
    validate_age(-5)  # Negative
except ValueError as e:
    print(f"✗ Validation failed: {e}")

# Custom exceptions
print("\n--- Custom Exceptions ---")

class InsufficientFundsError(Exception):
    """Raised when account has insufficient funds."""
    pass

class InvalidAccountError(Exception):
    """Raised when account number is invalid."""
    pass

class BankAccount:
    """Simple bank account with custom exceptions."""
    
    def __init__(self, account_number, balance=0):
        self.account_number = account_number
        self.balance = balance
    
    def withdraw(self, amount):
        """Withdraw money from account."""
        if amount > self.balance:
            raise InsufficientFundsError(
                f"Cannot withdraw ₹{amount}. Balance: ₹{self.balance}"
            )
        
        self.balance -= amount
        return self.balance
    
    def deposit(self, amount):
        """Deposit money to account."""
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        
        self.balance += amount
        return self.balance

# Test custom exceptions
account = BankAccount("ACC123", balance=1000)

try:
    print(f"Initial balance: ₹{account.balance}")
    
    account.deposit(500)
    print(f"After deposit: ₹{account.balance}")
    
    account.withdraw(300)
    print(f"After withdrawal: ₹{account.balance}")
    
    account.withdraw(2000)  # This will fail!
    
except InsufficientFundsError as e:
    print(f"✗ Transaction failed: {e}")
except ValueError as e:
    print(f"✗ Invalid operation: {e}")

# Practical example: Safe data processing
print("\n" + "=" * 60)
print("PRACTICAL: SAFE DATA PROCESSING")
print("=" * 60)

def process_user_data(data):
    """
    Process user data with comprehensive error handling.
    
    Args:
        data: Dictionary with user information
    
    Returns:
        Processed user data or None if invalid
    """
    try:
        # Validate required fields
        required_fields = ['name', 'age', 'email']
        for field in required_fields:
            if field not in data:
                raise KeyError(f"Missing required field: {field}")
        
        # Validate data types
        if not isinstance(data['name'], str):
            raise TypeError("Name must be a string")
        
        if not isinstance(data['age'], int):
            raise TypeError("Age must be an integer")
        
        # Validate values
        if data['age'] < 0 or data['age'] > 150:
            raise ValueError(f"Invalid age: {data['age']}")
        
        if '@' not in data['email']:
            raise ValueError(f"Invalid email: {data['email']}")
        
        # Process data
        processed = {
            'name': data['name'].strip().title(),
            'age': data['age'],
            'email': data['email'].lower(),
            'status': 'active'
        }
        
        return processed
        
    except KeyError as e:
        print(f"✗ Missing data: {e}")
        return None
    except TypeError as e:
        print(f"✗ Type error: {e}")
        return None
    except ValueError as e:
        print(f"✗ Value error: {e}")
        return None
    except Exception as e:
        print(f"✗ Unexpected error: {type(e).__name__}: {e}")
        return None

# Test with different data
test_cases = [
    {"name": "Bina", "age": 31, "email": "bina@example.com"},
    {"name": "Raj", "email": "raj@example.com"},  # Missing age
    {"name": "Priya", "age": "25", "email": "priya@example.com"},  # Wrong type
    {"name": "Amit", "age": -5, "email": "amit@example.com"},  # Invalid age
    {"name": "Neha", "age": 28, "email": "neha.com"},  # Invalid email
]

print("\nProcessing user data:\n")
for i, user_data in enumerate(test_cases, 1):
    print(f"Test case {i}: {user_data}")
    result = process_user_data(user_data)
    if result:
        print(f"✓ Success: {result}")
    print()

# Context managers for resource management
print("\n" + "=" * 60)
print("CONTEXT MANAGERS (with statement)")
print("=" * 60)

# This is why we use 'with' for files
# It ensures file is closed even if exception occurs

def demonstrate_with():
    """Show how 'with' handles exceptions."""
    try:
        with open('day5_practice/sample.txt', 'r') as file:
            content = file.read()
            # Even if error happens here, file will be closed
            result = 1 / 0  # Cause error
    except ZeroDivisionError:
        print("Error occurred, but file was safely closed")

demonstrate_with()

# Assert statements for debugging
print("\n--- Assert Statements ---")

def calculate_discount(price, discount_percent):
    """Calculate discount with assertions."""
    # These should NEVER fail in production
    assert price > 0, "Price must be positive"
    assert 0 <= discount_percent <= 100, "Discount must be 0-100%"
    
    discount = price * (discount_percent / 100)
    return price - discount

print(f"Price ₹1000 with 20% discount: ₹{calculate_discount(1000, 20)}")

# This will raise AssertionError
try:
    calculate_discount(1000, 150)
except AssertionError as e:
    print(f"Assertion failed: {e}")

print("\n" + "=" * 60)