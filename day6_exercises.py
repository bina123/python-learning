# Day 6 Exercises - OOP Practice

print("=" * 60)
print("DAY 6 EXERCISES - OOP")
print("=" * 60)

# Exercise 1: Library Management System
print("\n--- Exercise 1: Library Management System ---")
"""
Create a library system with:
- Book class (title, author, ISBN, available)
- Library class (add book, lend book, return book)
- Member class (name, member_id, borrowed_books)
"""

class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.available = True
    
    def __str__(self):
        status = "Available" if self.available else "Borrowed"
        return f"{self.title} by {self.author} - {status}"

class Member:
    _member_counter = 1000
    
    def __init__(self, name):
        Member._member_counter += 1
        self.member_id = f"MEM{Member._member_counter}"
        self.name = name
        self.borrowed_books = []
    
    def __str__(self):
        return f"Member {self.member_id}: {self.name} ({len(self.borrowed_books)} books borrowed)"

class Library:
    def __init__(self, name):
        self.name = name
        self.books = []
        self.members = []
    
    def add_book(self, book):
        self.books.append(book)
        return f"✓ Added: {book.title}"
    
    def register_member(self, member):
        self.members.append(member)
        return f"✓ Registered: {member.name}"
    
    def lend_book(self, isbn, member_id):
        # Find book
        book = next((b for b in self.books if b.isbn == isbn), None)
        if not book:
            return "✗ Book not found"
        
        if not book.available:
            return "✗ Book already borrowed"
        
        # Find member
        member = next((m for m in self.members if m.member_id == member_id), None)
        if not member:
            return "✗ Member not found"
        
        # Lend book
        book.available = False
        member.borrowed_books.append(book)
        return f"✓ {book.title} lent to {member.name}"
    
    def return_book(self, isbn):
        book = next((b for b in self.books if b.isbn == isbn), None)
        if not book:
            return "✗ Book not found"
        
        if book.available:
            return "✗ Book was not borrowed"
        
        # Find member who borrowed it
        member = next((m for m in self.members if book in m.borrowed_books), None)
        if member:
            member.borrowed_books.remove(book)
        
        book.available = True
        return f"✓ {book.title} returned"

# Test library system
library = Library("Python Community Library")

# Add books
book1 = Book("Python Crash Course", "Eric Matthes", "ISBN001")
book2 = Book("Clean Code", "Robert Martin", "ISBN002")
library.add_book(book1)
library.add_book(book2)

# Register members
member1 = Member("Bina")
member2 = Member("Raj")
library.register_member(member1)
library.register_member(member2)

# Lend and return
print(library.lend_book("ISBN001", member1.member_id))
print(library.lend_book("ISBN002", member2.member_id))
print(member1)
print(library.return_book("ISBN001"))

# Exercise 2: Vehicle Hierarchy
print("\n\n--- Exercise 2: Vehicle Hierarchy ---")
"""
Create vehicle hierarchy:
- Vehicle (base class)
- Car, Motorcycle, Truck (inherit from Vehicle)
- Each has specific attributes and methods
"""

class Vehicle:
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year
        self.odometer = 0
    
    def drive(self, distance):
        self.odometer += distance
        return f"Drove {distance}km. Total: {self.odometer}km"
    
    def __str__(self):
        return f"{self.year} {self.make} {self.model}"

class Car(Vehicle):
    def __init__(self, make, model, year, doors):
        super().__init__(make, model, year)
        self.doors = doors
    
    def honk(self):
        return "Beep beep! 🚗"

class Motorcycle(Vehicle):
    def __init__(self, make, model, year, cc):
        super().__init__(make, model, year)
        self.cc = cc
    
    def wheelie(self):
        return "Doing a wheelie! 🏍️"

class Truck(Vehicle):
    def __init__(self, make, model, year, capacity):
        super().__init__(make, model, year)
        self.capacity = capacity  # in tons
    
    def load(self, weight):
        if weight > self.capacity:
            return f"✗ Cannot load {weight}t. Max capacity: {self.capacity}t"
        return f"✓ Loaded {weight}t"

# Test vehicles
car = Car("Honda", "Civic", 2023, 4)
bike = Motorcycle("Yamaha", "R15", 2022, 155)
truck = Truck("Tata", "LPT 2518", 2021, 25)

print(car)
print(car.drive(100))
print(car.honk())

print(f"\n{bike}")
print(bike.wheelie())

print(f"\n{truck}")
print(truck.load(20))
print(truck.load(30))

# Exercise 3: Polymorphism - Payment System
print("\n\n--- Exercise 3: Payment Processing System ---")
"""
Create payment system with different payment methods:
- Payment (base class)
- CreditCard, DebitCard, UPI, Cash
- All have process_payment method but different implementation
"""
from abc import ABC, abstractmethod

class Payment(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass

class CreditCardPayment(Payment):
    def __init__(self, card_number):
        self.card_number = f"****{card_number[-4:]}"
    
    def process_payment(self, amount):
        return f"✓ Charged ₹{amount} to credit card {self.card_number}"

class DebitCardPayment(Payment):
    def __init__(self, card_number, pin):
        self.card_number = f"****{card_number[-4:]}"
        self.pin = pin
    
    def process_payment(self, amount):
        return f"✓ Debited ₹{amount} from card {self.card_number}"

class UPIPayment(Payment):
    def __init__(self, upi_id):
        self.upi_id = upi_id
    
    def process_payment(self, amount):
        return f"✓ Paid ₹{amount} via UPI ({self.upi_id})"

class CashPayment(Payment):
    def process_payment(self, amount):
        return f"✓ Received ₹{amount} in cash"

# Polymorphism in action
def process_transaction(payment_method, amount):
    print(payment_method.process_payment(amount))

# Test different payment methods
credit = CreditCardPayment("1234567890123456")
debit = DebitCardPayment("9876543210987654", "1234")
upi = UPIPayment("bina@paytm")
cash = CashPayment()

print("Processing different payments:")
process_transaction(credit, 5000)
process_transaction(debit, 3000)
process_transaction(upi, 1500)
process_transaction(cash, 500)

print("\n" + "=" * 60)