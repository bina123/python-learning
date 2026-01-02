# Day 6: Object-Oriented Programming - Classes & Objects

print("=" * 60)
print("OBJECT-ORIENTED PROGRAMMING IN PYTHON")
print("=" * 60)

# Basic Class Definition
# PHP: class Person { }
# Python:

class Person:
    """A simple Person class."""
    
    # Constructor (like PHP __construct)
    def __init__(self, name, age):
        """
        Initialize a Person object.
        
        Args:
            name: Person's name
            age: Person's age
        """
        # self is like PHP's $this
        self.name = name
        self.age = age
    
    # Instance method
    def introduce(self):
        """Introduce the person."""
        return f"Hi, I'm {self.name} and I'm {self.age} years old."
    
    def birthday(self):
        """Celebrate birthday - increase age."""
        self.age += 1
        return f"Happy birthday! {self.name} is now {self.age}!"

print("\n--- Creating Objects ---")

# Create objects (instances)
person1 = Person("Bina", 31)
person2 = Person("Raj", 28)

print(person1.introduce())
print(person2.introduce())

# Call methods
print(f"\n{person1.name}'s birthday:")
print(person1.birthday())
print(person1.introduce())

# Access attributes
print(f"\n--- Accessing Attributes ---")
print(f"Name: {person1.name}")
print(f"Age: {person1.age}")

# Modify attributes
person1.age = 32
print(f"Updated age: {person1.age}")

# Class attributes (shared by all instances)
print("\n--- Class Attributes ---")

class BankAccount:
    """Bank account with class and instance attributes."""
    
    # Class attribute (like PHP static property)
    bank_name = "Python Bank"
    interest_rate = 0.05
    total_accounts = 0
    
    def __init__(self, account_holder, balance=0):
        # Instance attributes
        self.account_holder = account_holder
        self.balance = balance
        self.account_number = f"ACC{BankAccount.total_accounts + 1:04d}"
        
        # Increment class variable
        BankAccount.total_accounts += 1
    
    def deposit(self, amount):
        """Deposit money."""
        if amount > 0:
            self.balance += amount
            return f"Deposited ₹{amount}. New balance: ₹{self.balance}"
        return "Invalid amount"
    
    def withdraw(self, amount):
        """Withdraw money."""
        if amount > self.balance:
            return f"Insufficient funds. Balance: ₹{self.balance}"
        
        self.balance -= amount
        return f"Withdrew ₹{amount}. New balance: ₹{self.balance}"
    
    def add_interest(self):
        """Add interest to balance."""
        interest = self.balance * BankAccount.interest_rate
        self.balance += interest
        return f"Interest added: ₹{interest:.2f}"
    
    def get_info(self):
        """Get account information."""
        return (f"Account: {self.account_number}\n"
                f"Holder: {self.account_holder}\n"
                f"Balance: ₹{self.balance}\n"
                f"Bank: {BankAccount.bank_name}")

# Create accounts
acc1 = BankAccount("Bina Pithadiya", 10000)
acc2 = BankAccount("Raj Kumar", 5000)
acc3 = BankAccount("Priya Sharma", 15000)

print(f"Total accounts created: {BankAccount.total_accounts}")
print(f"\n{acc1.get_info()}")

# Transactions
print(f"\n--- Transactions ---")
print(acc1.deposit(5000))
print(acc1.withdraw(3000))
print(acc1.add_interest())

# Magic methods (like PHP __toString, __get, etc.)
print("\n" + "=" * 60)
print("MAGIC METHODS (Dunder Methods)")
print("=" * 60)

class Product:
    """Product with magic methods."""
    
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
    
    # __str__ - like PHP __toString
    # Used by print() and str()
    def __str__(self):
        """String representation for users."""
        return f"{self.name} - ₹{self.price} ({self.quantity} in stock)"
    
    # __repr__ - developer-friendly representation
    # Used in debugger and by repr()
    def __repr__(self):
        """String representation for developers."""
        return f"Product(name='{self.name}', price={self.price}, quantity={self.quantity})"
    
    # __len__ - define length
    def __len__(self):
        """Return quantity as length."""
        return self.quantity
    
    # __eq__ - define equality comparison
    def __eq__(self, other):
        """Check if products are equal."""
        if isinstance(other, Product):
            return self.name == other.name and self.price == other.price
        return False
    
    # __lt__ - define less than (for sorting)
    def __lt__(self, other):
        """Compare products by price."""
        return self.price < other.price
    
    # __add__ - define addition
    def __add__(self, other):
        """Add quantities of same product."""
        if isinstance(other, Product) and self.name == other.name:
            return Product(self.name, self.price, self.quantity + other.quantity)
        raise ValueError("Cannot add different products")

print("\n--- Magic Methods Demo ---")

laptop = Product("Laptop", 75000, 5)
mouse = Product("Mouse", 500, 50)

# __str__ is called by print
print(f"Print calls __str__: {laptop}")

# __repr__ is called in interactive mode
print(f"Repr calls __repr__: {repr(laptop)}")

# __len__
print(f"len(laptop) = {len(laptop)}")

# __eq__
laptop2 = Product("Laptop", 75000, 3)
laptop3 = Product("Laptop", 80000, 5)
print(f"laptop == laptop2: {laptop == laptop2}")
print(f"laptop == laptop3: {laptop == laptop3}")

# __lt__ (used for sorting)
products = [laptop, mouse, Product("Keyboard", 2000, 20)]
sorted_products = sorted(products)
print("\nProducts sorted by price:")
for p in sorted_products:
    print(f"  {p}")

# __add__
laptop_combined = laptop + laptop2
print(f"\nCombined laptops: {laptop_combined}")

# Property decorators (like PHP __get and __set)
print("\n" + "=" * 60)
print("PROPERTIES AND ENCAPSULATION")
print("=" * 60)

class Employee:
    """Employee with properties for encapsulation."""
    
    def __init__(self, name, salary):
        self._name = name  # _ indicates "private" (by convention)
        self._salary = salary
    
    # Property - getter (like PHP __get)
    @property
    def name(self):
        """Get employee name."""
        return self._name.title()
    
    # Property - setter
    @name.setter
    def name(self, value):
        """Set employee name with validation."""
        if not value or not isinstance(value, str):
            raise ValueError("Name must be a non-empty string")
        self._name = value
    
    # Property - getter for salary
    @property
    def salary(self):
        """Get salary."""
        return self._salary
    
    # Property - setter for salary
    @salary.setter
    def salary(self, value):
        """Set salary with validation."""
        if value < 0:
            raise ValueError("Salary cannot be negative")
        self._salary = value
    
    # Computed property (read-only)
    @property
    def annual_salary(self):
        """Calculate annual salary."""
        return self._salary * 12
    
    # Property - deleter
    @salary.deleter
    def salary(self):
        """Delete salary."""
        print("Deleting salary...")
        del self._salary
    
    def __str__(self):
        return f"Employee: {self.name}, Salary: ₹{self.salary}/month"

print("\n--- Properties Demo ---")

emp = Employee("bina pithadiya", 75000)

# Access like attributes (but using property methods)
print(f"Name: {emp.name}")  # Calls getter, returns Title Case
print(f"Salary: ₹{emp.salary}")
print(f"Annual: ₹{emp.annual_salary}")  # Computed property

# Set values (calls setter with validation)
emp.name = "Bina Pithadiya"
emp.salary = 80000
print(f"\nUpdated: {emp}")

# Try invalid salary
try:
    emp.salary = -1000
except ValueError as e:
    print(f"Error: {e}")

# Class methods and Static methods
print("\n" + "=" * 60)
print("CLASS METHODS AND STATIC METHODS")
print("=" * 60)

class Pizza:
    """Pizza class with different method types."""
    
    def __init__(self, size, toppings):
        self.size = size
        self.toppings = toppings
    
    # Instance method (regular method)
    def describe(self):
        """Describe this pizza instance."""
        return f"{self.size} pizza with {', '.join(self.toppings)}"
    
    # Class method - works with class, not instance
    # Like PHP static method but receives class as first parameter
    @classmethod
    def margherita(cls, size):
        """Create a Margherita pizza."""
        return cls(size, ['mozzarella', 'tomato', 'basil'])
    
    @classmethod
    def pepperoni(cls, size):
        """Create a Pepperoni pizza."""
        return cls(size, ['mozzarella', 'pepperoni'])
    
    # Static method - doesn't use instance or class
    # Like PHP static method
    @staticmethod
    def is_valid_size(size):
        """Check if size is valid."""
        return size in ['small', 'medium', 'large']
    
    @staticmethod
    def calculate_price(size, num_toppings):
        """Calculate pizza price."""
        base_prices = {'small': 200, 'medium': 350, 'large': 500}
        base = base_prices.get(size, 350)
        return base + (num_toppings * 50)

print("\n--- Class and Static Methods Demo ---")

# Using class methods as factory methods
pizza1 = Pizza.margherita('large')
pizza2 = Pizza.pepperoni('medium')

print(pizza1.describe())
print(pizza2.describe())

# Using static methods
print(f"\nIs 'medium' valid? {Pizza.is_valid_size('medium')}")
print(f"Is 'extra-large' valid? {Pizza.is_valid_size('extra-large')}")

price = Pizza.calculate_price('large', 5)
print(f"Price for large pizza with 5 toppings: ₹{price}")

# Encapsulation - Public, Protected, Private
print("\n" + "=" * 60)
print("ENCAPSULATION (Public, Protected, Private)")
print("=" * 60)

class User:
    """User class demonstrating encapsulation."""
    
    def __init__(self, username, email, password):
        # Public attribute (no underscore)
        self.username = username
        
        # Protected attribute (single underscore)
        # Convention: "Don't access directly, but you can if needed"
        self._email = email
        
        # Private attribute (double underscore - name mangling)
        # Python makes it harder to access (but not impossible)
        self.__password = password
    
    # Public method
    def get_info(self):
        """Get user info (public)."""
        return f"User: {self.username}, Email: {self._email}"
    
    # Protected method
    def _validate_email(self):
        """Validate email (protected)."""
        return '@' in self._email
    
    # Private method
    def __hash_password(self):
        """Hash password (private)."""
        # In real app, use proper hashing
        return f"hashed_{self.__password}"
    
    def verify_password(self, password):
        """Public method to verify password."""
        return self.__hash_password() == f"hashed_{password}"

print("\n--- Encapsulation Demo ---")

user = User("bina", "bina@example.com", "secret123")

# Public - direct access OK
print(f"Username (public): {user.username}")

# Protected - can access but shouldn't
print(f"Email (protected): {user._email}")

# Private - harder to access (name mangled to _User__password)
# This works but is strongly discouraged!
# print(f"Password (private): {user._User__password}")

# Use public methods instead
print(f"User info: {user.get_info()}")
print(f"Verify password: {user.verify_password('secret123')}")

print("\n" + "=" * 60)