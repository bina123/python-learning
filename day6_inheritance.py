# Day 6: Inheritance and Polymorphism

print("=" * 60)
print("INHERITANCE IN PYTHON")
print("=" * 60)

# Basic Inheritance
# PHP: class Child extends Parent { }
# Python:

class Animal:
    """Base class for all animals."""
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def make_sound(self):
        """Make a sound - to be overridden."""
        return "Some sound"
    
    def sleep(self):
        """All animals sleep."""
        return f"{self.name} is sleeping... 😴"
    
    def __str__(self):
        return f"{self.__class__.__name__}: {self.name}, {self.age} years old"

class Dog(Animal):
    """Dog inherits from Animal."""
    
    def __init__(self, name, age, breed):
        # Call parent constructor
        # PHP: parent::__construct($name, $age)
        # Python:
        super().__init__(name, age)
        self.breed = breed
    
    # Override parent method
    def make_sound(self):
        """Dogs bark."""
        return "Woof! Woof! 🐕"
    
    # Additional method specific to Dog
    def fetch(self):
        """Dogs can fetch."""
        return f"{self.name} is fetching the ball!"

class Cat(Animal):
    """Cat inherits from Animal."""
    
    def __init__(self, name, age, color):
        super().__init__(name, age)
        self.color = color
    
    # Override parent method
    def make_sound(self):
        """Cats meow."""
        return "Meow! 🐱"
    
    # Additional method
    def scratch(self):
        """Cats scratch."""
        return f"{self.name} is scratching the furniture!"

class Bird(Animal):
    """Bird inherits from Animal."""
    
    def __init__(self, name, age, can_fly=True):
        super().__init__(name, age)
        self.can_fly = can_fly
    
    def make_sound(self):
        """Birds chirp."""
        return "Chirp chirp! 🐦"
    
    def fly(self):
        """Birds can fly."""
        if self.can_fly:
            return f"{self.name} is flying high!"
        return f"{self.name} cannot fly (maybe a penguin?)"

print("\n--- Inheritance Demo ---")

# Create objects
dog = Dog("Buddy", 5, "Golden Retriever")
cat = Cat("Whiskers", 3, "Orange")
bird = Bird("Tweety", 2)

# All inherit from Animal
print(dog)
print(cat)
print(bird)

# Inherited method (same for all)
print(f"\n{dog.sleep()}")
print(cat.sleep())

# Overridden method (different for each)
print(f"\n{dog.name} says: {dog.make_sound()}")
print(f"{cat.name} says: {cat.make_sound()}")
print(f"{bird.name} says: {bird.make_sound()}")

# Class-specific methods
print(f"\n{dog.fetch()}")
print(cat.scratch())
print(bird.fly())

# Check inheritance
print("\n--- Checking Inheritance ---")
print(f"Is dog an Animal? {isinstance(dog, Animal)}")
print(f"Is dog a Dog? {isinstance(dog, Dog)}")
print(f"Is dog a Cat? {isinstance(dog, Cat)}")

print(f"\nIs Dog subclass of Animal? {issubclass(Dog, Animal)}")
print(f"Is Dog subclass of Cat? {issubclass(Dog, Cat)}")

# Polymorphism - same interface, different implementations
print("\n" + "=" * 60)
print("POLYMORPHISM")
print("=" * 60)

def animal_concert(animals):
    """Make all animals perform - polymorphism in action!"""
    print("🎵 Animal Concert 🎵")
    for animal in animals:
        print(f"{animal.name}: {animal.make_sound()}")

# Different animals, same interface
zoo = [dog, cat, bird]
animal_concert(zoo)

# Multiple Inheritance
print("\n" + "=" * 60)
print("MULTIPLE INHERITANCE")
print("=" * 60)

class Flyable:
    """Mixin for flying ability."""
    
    def fly(self):
        return f"{self.name} is flying! ✈️"

class Swimmable:
    """Mixin for swimming ability."""
    
    def swim(self):
        return f"{self.name} is swimming! 🏊"

class Duck(Animal, Flyable, Swimmable):
    """Duck can fly AND swim!"""
    
    def __init__(self, name, age):
        super().__init__(name, age)
    
    def make_sound(self):
        return "Quack! 🦆"

print("\n--- Multiple Inheritance Demo ---")

duck = Duck("Donald", 4)

print(duck)
print(duck.make_sound())
print(duck.fly())      # From Flyable
print(duck.swim())     # From Swimmable
print(duck.sleep())    # From Animal

# Method Resolution Order (MRO)
print(f"\nDuck's MRO: {[cls.__name__ for cls in Duck.__mro__]}")

# Abstract Base Classes
print("\n" + "=" * 60)
print("ABSTRACT BASE CLASSES")
print("=" * 60)

from abc import ABC, abstractmethod

class Shape(ABC):
    """Abstract base class for shapes."""
    
    def __init__(self, name):
        self.name = name
    
    @abstractmethod
    def area(self):
        """Calculate area - must be implemented by subclasses."""
        pass
    
    @abstractmethod
    def perimeter(self):
        """Calculate perimeter - must be implemented by subclasses."""
        pass
    
    def describe(self):
        """Concrete method - can be used by all shapes."""
        return f"{self.name} - Area: {self.area():.2f}, Perimeter: {self.perimeter():.2f}"

class Rectangle(Shape):
    """Rectangle shape."""
    
    def __init__(self, width, height):
        super().__init__("Rectangle")
        self.width = width
        self.height = height
    
    def area(self):
        """Calculate rectangle area."""
        return self.width * self.height
    
    def perimeter(self):
        """Calculate rectangle perimeter."""
        return 2 * (self.width + self.height)

class Circle(Shape):
    """Circle shape."""
    
    def __init__(self, radius):
        super().__init__("Circle")
        self.radius = radius
    
    def area(self):
        """Calculate circle area."""
        import math
        return math.pi * self.radius ** 2
    
    def perimeter(self):
        """Calculate circle circumference."""
        import math
        return 2 * math.pi * self.radius

print("\n--- Abstract Classes Demo ---")

# Cannot instantiate abstract class
# shape = Shape("Generic")  # This would raise TypeError!

# Can instantiate concrete classes
rect = Rectangle(5, 10)
circle = Circle(7)

print(rect.describe())
print(circle.describe())

# Composition over Inheritance
print("\n" + "=" * 60)
print("COMPOSITION OVER INHERITANCE")
print("=" * 60)

class Engine:
    """Engine component."""
    
    def __init__(self, horsepower):
        self.horsepower = horsepower
        self.running = False
    
    def start(self):
        """Start engine."""
        self.running = True
        return f"Engine started! {self.horsepower}HP"
    
    def stop(self):
        """Stop engine."""
        self.running = False
        return "Engine stopped"

class GPS:
    """GPS component."""
    
    def get_location(self):
        """Get current location."""
        return "Narnaund, Haryana, IN"
    
    def navigate_to(self, destination):
        """Navigate to destination."""
        return f"Navigating to {destination}..."

class Car:
    """Car uses composition - HAS-A relationship instead of IS-A."""
    
    def __init__(self, make, model, horsepower):
        self.make = make
        self.model = model
        # Composition - Car HAS-A Engine and GPS
        self.engine = Engine(horsepower)
        self.gps = GPS()
    
    def start(self):
        """Start the car."""
        return f"{self.make} {self.model}: {self.engine.start()}"
    
    def drive_to(self, destination):
        """Drive to destination."""
        if not self.engine.running:
            self.start()
        
        location = self.gps.get_location()
        navigation = self.gps.navigate_to(destination)
        return f"Currently at: {location}\n{navigation}"
    
    def __str__(self):
        return f"{self.make} {self.model} ({self.engine.horsepower}HP)"

print("\n--- Composition Demo ---")

my_car = Car("Toyota", "Camry", 200)

print(my_car)
print(my_car.start())
print(my_car.drive_to("Mumbai"))

# Practical Example: E-commerce System
print("\n" + "=" * 60)
print("PRACTICAL EXAMPLE: E-COMMERCE SYSTEM")
print("=" * 60)

class Product:
    """Base Product class."""
    
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock
    
    def is_available(self, quantity=1):
        """Check if product is available."""
        return self.stock >= quantity
    
    def reduce_stock(self, quantity):
        """Reduce stock."""
        if self.is_available(quantity):
            self.stock -= quantity
            return True
        return False
    
    def get_total_price(self, quantity):
        """Calculate total price."""
        return self.price * quantity
    
    def __str__(self):
        return f"{self.name} - ₹{self.price} ({self.stock} in stock)"

class DigitalProduct(Product):
    """Digital product (downloads, no shipping)."""
    
    def __init__(self, name, price, download_link):
        super().__init__(name, price, stock=999999)  # Unlimited stock
        self.download_link = download_link
    
    def get_download_link(self):
        """Get download link."""
        return f"Download: {self.download_link}"

class PhysicalProduct(Product):
    """Physical product (requires shipping)."""
    
    def __init__(self, name, price, stock, weight):
        super().__init__(name, price, stock)
        self.weight = weight  # in kg
    
    def calculate_shipping(self):
        """Calculate shipping cost."""
        if self.weight < 1:
            return 50
        elif self.weight < 5:
            return 100
        else:
            return 200

class ShoppingCart:
    """Shopping cart with items."""
    
    def __init__(self):
        self.items = []
    
    def add_item(self, product, quantity=1):
        """Add product to cart."""
        if product.is_available(quantity):
            self.items.append({"product": product, "quantity": quantity})
            product.reduce_stock(quantity)
            return f"✓ Added {quantity}x {product.name}"
        return f"✗ Not enough stock for {product.name}"
    
    def get_total(self):
        """Calculate cart total."""
        total = 0
        shipping = 0
        
        for item in self.items:
            product = item["product"]
            quantity = item["quantity"]
            total += product.get_total_price(quantity)
            
            # Add shipping for physical products
            if isinstance(product, PhysicalProduct):
                shipping += product.calculate_shipping()
        
        return {"subtotal": total, "shipping": shipping, "total": total + shipping}
    
    def show_cart(self):
        """Display cart contents."""
        if not self.items:
            print("Cart is empty!")
            return
        
        print("\n--- Shopping Cart ---")
        for item in self.items:
            product = item["product"]
            quantity = item["quantity"]
            subtotal = product.get_total_price(quantity)
            print(f"{quantity}x {product.name} - ₹{subtotal}")
        
        totals = self.get_total()
        print(f"\nSubtotal: ₹{totals['subtotal']}")
        print(f"Shipping: ₹{totals['shipping']}")
        print(f"Total: ₹{totals['total']}")

# Demo e-commerce system
print("\n--- E-commerce Demo ---")

# Create products
ebook = DigitalProduct("Python Mastery", 500, "https://download.com/python")
laptop = PhysicalProduct("Laptop", 75000, 5, 2.5)
mouse = PhysicalProduct("Wireless Mouse", 800, 20, 0.2)

# Create cart and add items
cart = ShoppingCart()

print(cart.add_item(laptop, 1))
print(cart.add_item(mouse, 2))
print(cart.add_item(ebook, 1))

# Show cart
cart.show_cart()

# Digital product features
print(f"\n{ebook.get_download_link()}")

print("\n" + "=" * 60)