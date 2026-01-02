# Day 7: Advanced OOP Patterns

print("=" * 60)
print("ADVANCED OOP PATTERNS")
print("=" * 60)

# Pattern 1: Singleton Pattern
# Ensures only ONE instance of a class exists
print("\n--- SINGLETON PATTERN ---")

class DatabaseConnection:
    """Singleton - only one database connection exists."""
    
    _instance = None
    
    def __new__(cls):
        """Override __new__ to control instance creation."""
        if cls._instance is None:
            print("Creating new database connection...")
            cls._instance = super().__new__(cls)
            cls._instance.connection_id = id(cls._instance)
        else:
            print("Reusing existing database connection...")
        return cls._instance
    
    def query(self, sql):
        return f"Connection {self.connection_id}: Executing {sql}"

# Test Singleton
print("\nCreating first connection:")
db1 = DatabaseConnection()
print(f"db1 ID: {id(db1)}")

print("\nCreating second connection:")
db2 = DatabaseConnection()
print(f"db2 ID: {id(db2)}")

print(f"\nAre they the same object? {db1 is db2}")  # True!

# Pattern 2: Factory Pattern
# Creates objects without specifying exact class
print("\n" + "=" * 60)
print("FACTORY PATTERN")
print("=" * 60)

from abc import ABC, abstractmethod

class Vehicle(ABC):
    """Base vehicle class."""
    
    @abstractmethod
    def get_info(self):
        pass

class Car(Vehicle):
    def __init__(self, model):
        self.model = model
        self.wheels = 4
    
    def get_info(self):
        return f"Car: {self.model} with {self.wheels} wheels 🚗"

class Motorcycle(Vehicle):
    def __init__(self, model):
        self.model = model
        self.wheels = 2
    
    def get_info(self):
        return f"Motorcycle: {self.model} with {self.wheels} wheels 🏍️"

class Truck(Vehicle):
    def __init__(self, model):
        self.model = model
        self.wheels = 6
    
    def get_info(self):
        return f"Truck: {self.model} with {self.wheels} wheels 🚚"

class VehicleFactory:
    """Factory to create vehicles without knowing exact class."""
    
    @staticmethod
    def create_vehicle(vehicle_type, model):
        """Create vehicle based on type."""
        vehicles = {
            'car': Car,
            'motorcycle': Motorcycle,
            'truck': Truck
        }
        
        vehicle_class = vehicles.get(vehicle_type.lower())
        if vehicle_class:
            return vehicle_class(model)
        
        raise ValueError(f"Unknown vehicle type: {vehicle_type}")

# Test Factory Pattern
print("\nCreating vehicles using factory:")
vehicle1 = VehicleFactory.create_vehicle('car', 'Honda Civic')
vehicle2 = VehicleFactory.create_vehicle('motorcycle', 'Yamaha R15')
vehicle3 = VehicleFactory.create_vehicle('truck', 'Tata Prima')

print(vehicle1.get_info())
print(vehicle2.get_info())
print(vehicle3.get_info())

# Pattern 3: Observer Pattern
# Objects notify others when state changes
print("\n" + "=" * 60)
print("OBSERVER PATTERN")
print("=" * 60)

class Subject:
    """Subject that observers watch."""
    
    def __init__(self):
        self._observers = []
        self._state = None
    
    def attach(self, observer):
        """Add an observer."""
        if observer not in self._observers:
            self._observers.append(observer)
            print(f"✓ {observer.name} is now observing")
    
    def detach(self, observer):
        """Remove an observer."""
        if observer in self._observers:
            self._observers.remove(observer)
            print(f"✓ {observer.name} stopped observing")
    
    def notify(self):
        """Notify all observers of state change."""
        for observer in self._observers:
            observer.update(self._state)
    
    def set_state(self, state):
        """Change state and notify observers."""
        print(f"\n📢 State changed to: {state}")
        self._state = state
        self.notify()

class Observer:
    """Observer that watches subject."""
    
    def __init__(self, name):
        self.name = name
    
    def update(self, state):
        """React to state change."""
        print(f"  → {self.name} received update: {state}")

# Test Observer Pattern
print("\nObserver Pattern Demo:")
subject = Subject()

observer1 = Observer("Email Service")
observer2 = Observer("SMS Service")
observer3 = Observer("Push Notification")

subject.attach(observer1)
subject.attach(observer2)
subject.attach(observer3)

subject.set_state("New user registered")
subject.set_state("Order placed")

subject.detach(observer2)
subject.set_state("Payment received")

# Pattern 4: Strategy Pattern
# Different algorithms, same interface
print("\n" + "=" * 60)
print("STRATEGY PATTERN")
print("=" * 60)

class SortStrategy(ABC):
    """Abstract sort strategy."""
    
    @abstractmethod
    def sort(self, data):
        pass

class BubbleSort(SortStrategy):
    def sort(self, data):
        print("Sorting using Bubble Sort...")
        return sorted(data)  # Simplified

class QuickSort(SortStrategy):
    def sort(self, data):
        print("Sorting using Quick Sort...")
        return sorted(data)  # Simplified

class MergeSort(SortStrategy):
    def sort(self, data):
        print("Sorting using Merge Sort...")
        return sorted(data)  # Simplified

class DataProcessor:
    """Uses different sorting strategies."""
    
    def __init__(self, strategy: SortStrategy):
        self._strategy = strategy
    
    def set_strategy(self, strategy: SortStrategy):
        """Change strategy at runtime."""
        self._strategy = strategy
    
    def process_data(self, data):
        """Process data using current strategy."""
        return self._strategy.sort(data)

# Test Strategy Pattern
print("\nStrategy Pattern Demo:")
data = [5, 2, 8, 1, 9, 3]

processor = DataProcessor(BubbleSort())
result = processor.process_data(data.copy())
print(f"Result: {result}")

# Change strategy at runtime
processor.set_strategy(QuickSort())
result = processor.process_data(data.copy())
print(f"Result: {result}")

processor.set_strategy(MergeSort())
result = processor.process_data(data.copy())
print(f"Result: {result}")

# Pattern 5: Decorator Pattern (Not @decorator!)
# Add functionality to objects dynamically
print("\n" + "=" * 60)
print("DECORATOR PATTERN")
print("=" * 60)

class Coffee(ABC):
    """Base coffee interface."""
    
    @abstractmethod
    def cost(self):
        pass
    
    @abstractmethod
    def description(self):
        pass

class SimpleCoffee(Coffee):
    """Basic coffee."""
    
    def cost(self):
        return 50
    
    def description(self):
        return "Simple Coffee"

class CoffeeDecorator(Coffee):
    """Base decorator."""
    
    def __init__(self, coffee):
        self._coffee = coffee
    
    def cost(self):
        return self._coffee.cost()
    
    def description(self):
        return self._coffee.description()

class MilkDecorator(CoffeeDecorator):
    """Add milk to coffee."""
    
    def cost(self):
        return self._coffee.cost() + 20
    
    def description(self):
        return self._coffee.description() + " + Milk"

class SugarDecorator(CoffeeDecorator):
    """Add sugar to coffee."""
    
    def cost(self):
        return self._coffee.cost() + 5
    
    def description(self):
        return self._coffee.description() + " + Sugar"

class WhippedCreamDecorator(CoffeeDecorator):
    """Add whipped cream to coffee."""
    
    def cost(self):
        return self._coffee.cost() + 30
    
    def description(self):
        return self._coffee.description() + " + Whipped Cream"

# Test Decorator Pattern
print("\nDecorator Pattern Demo:")

# Simple coffee
coffee = SimpleCoffee()
print(f"{coffee.description()}: ₹{coffee.cost()}")

# Coffee with milk
coffee = MilkDecorator(SimpleCoffee())
print(f"{coffee.description()}: ₹{coffee.cost()}")

# Coffee with milk and sugar
coffee = SugarDecorator(MilkDecorator(SimpleCoffee()))
print(f"{coffee.description()}: ₹{coffee.cost()}")

# Fancy coffee with everything!
coffee = WhippedCreamDecorator(
    SugarDecorator(
        MilkDecorator(SimpleCoffee())
    )
)
print(f"{coffee.description()}: ₹{coffee.cost()}")

# Pattern 6: Builder Pattern
# Construct complex objects step by step
print("\n" + "=" * 60)
print("BUILDER PATTERN")
print("=" * 60)

class Pizza:
    """Complex object to build."""
    
    def __init__(self):
        self.size = None
        self.cheese = False
        self.pepperoni = False
        self.bacon = False
        self.mushrooms = False
        self.olives = False
        self.crust = "regular"
    
    def __str__(self):
        toppings = []
        if self.cheese:
            toppings.append("cheese")
        if self.pepperoni:
            toppings.append("pepperoni")
        if self.bacon:
            toppings.append("bacon")
        if self.mushrooms:
            toppings.append("mushrooms")
        if self.olives:
            toppings.append("olives")
        
        toppings_str = ", ".join(toppings) if toppings else "no toppings"
        return f"{self.size} pizza with {toppings_str} on {self.crust} crust"

class PizzaBuilder:
    """Builder for Pizza."""
    
    def __init__(self):
        self.pizza = Pizza()
    
    def set_size(self, size):
        self.pizza.size = size
        return self  # Return self for chaining!
    
    def add_cheese(self):
        self.pizza.cheese = True
        return self
    
    def add_pepperoni(self):
        self.pizza.pepperoni = True
        return self
    
    def add_bacon(self):
        self.pizza.bacon = True
        return self
    
    def add_mushrooms(self):
        self.pizza.mushrooms = True
        return self
    
    def add_olives(self):
        self.pizza.olives = True
        return self
    
    def set_crust(self, crust):
        self.pizza.crust = crust
        return self
    
    def build(self):
        return self.pizza

# Test Builder Pattern
print("\nBuilder Pattern Demo:")

# Simple pizza
pizza1 = PizzaBuilder().set_size("small").add_cheese().build()
print(pizza1)

# Meat lovers pizza (method chaining!)
pizza2 = (PizzaBuilder()
    .set_size("large")
    .add_cheese()
    .add_pepperoni()
    .add_bacon()
    .set_crust("thick")
    .build())
print(pizza2)

# Vegetarian pizza
pizza3 = (PizzaBuilder()
    .set_size("medium")
    .add_cheese()
    .add_mushrooms()
    .add_olives()
    .set_crust("thin")
    .build())
print(pizza3)

# Dataclasses (Modern Python)
print("\n" + "=" * 60)
print("DATACLASSES (Python 3.7+)")
print("=" * 60)

from dataclasses import dataclass, field
from typing import List

@dataclass
class Product:
    """Product using dataclass - automatic __init__, __repr__, etc."""
    name: str
    price: float
    quantity: int = 0  # Default value
    tags: List[str] = field(default_factory=list)  # Mutable default
    
    def total_value(self):
        return self.price * self.quantity
    
    def __str__(self):
        return f"{self.name}: ₹{self.price} × {self.quantity} = ₹{self.total_value()}"

# Test dataclass
print("\nDataclass Demo:")
product1 = Product("Laptop", 75000, 5, ["electronics", "computers"])
product2 = Product("Mouse", 500, 20)

print(product1)
print(product2)
print(f"\nProduct1 tags: {product1.tags}")

# Named Tuples (Immutable data classes)
print("\n" + "=" * 60)
print("NAMED TUPLES")
print("=" * 60)

from collections import namedtuple

# Create a named tuple class
Point = namedtuple('Point', ['x', 'y'])
Person = namedtuple('Person', ['name', 'age', 'city'])

# Test named tuples
print("\nNamed Tuple Demo:")
p1 = Point(10, 20)
print(f"Point: x={p1.x}, y={p1.y}")

person = Person("Bina", 31, "Narnaund")
print(f"Person: {person.name}, {person.age}, {person.city}")

# Immutable!
# person.age = 32  # This would raise AttributeError!

# Context Managers (with statement)
print("\n" + "=" * 60)
print("CUSTOM CONTEXT MANAGERS")
print("=" * 60)

class Timer:
    """Context manager to time code execution."""
    
    def __init__(self, name):
        self.name = name
    
    def __enter__(self):
        """Called when entering 'with' block."""
        import time
        self.start_time = time.time()
        print(f"⏱️  Starting: {self.name}")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Called when exiting 'with' block."""
        import time
        elapsed = time.time() - self.start_time
        print(f"✓ {self.name} took {elapsed:.4f} seconds")
        return False  # Don't suppress exceptions

# Test context manager
print("\nContext Manager Demo:")

with Timer("Data Processing"):
    # Simulate some work
    total = sum(range(1000000))
    print(f"Calculated sum: {total}")

with Timer("File Operation"):
    # Simulate file operation
    data = [i**2 for i in range(10000)]
    print(f"Generated {len(data)} items")

print("\n" + "=" * 60)