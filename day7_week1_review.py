# Day 7: Week 1 Complete Review

print("=" * 60)
print("WEEK 1 COMPREHENSIVE REVIEW")
print("=" * 60)

# Day 1-2 Review: Data Structures
print("\n--- DATA STRUCTURES REVIEW ---")

# Lists
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print(f"Lists: {numbers} → {squares}")

# Dictionaries
person = {"name": "Bina", "age": 31, "role": "Developer"}
print(f"Dictionary: {person}")

# Sets
skills = {"Python", "Django", "React", "ML"}
new_skills = {"FastAPI", "React", "Docker"}
all_skills = skills | new_skills
print(f"Set union: {all_skills}")

# Tuples
coordinates = (10, 20)
x, y = coordinates  # Unpacking
print(f"Tuple unpacking: x={x}, y={y}")

# Day 4 Review: Functions
print("\n--- FUNCTIONS REVIEW ---")

def calculate_total(price, quantity, discount=0, **fees):
    """Function with args, kwargs, default values."""
    subtotal = price * quantity
    discount_amount = subtotal * (discount / 100)
    fees_total = sum(fees.values())
    return subtotal - discount_amount + fees_total

total = calculate_total(100, 5, discount=10, shipping=50, handling=20)
print(f"Total with fees: ₹{total}")

# Lambda functions
multiply = lambda x, y: x * y
print(f"Lambda: 5 × 3 = {multiply(5, 3)}")

# Day 5 Review: File I/O & Exceptions
print("\n--- FILE I/O & EXCEPTIONS REVIEW ---")

import json

# Write JSON
data = {"name": "Review", "day": 7, "completed": True}
try:
    with open('day7_review.json', 'w') as f:
        json.dump(data, f, indent=2)
    print("✓ JSON file written")
    
    # Read JSON
    with open('day7_review.json', 'r') as f:
        loaded = json.load(f)
    print(f"✓ JSON loaded: {loaded}")
except Exception as e:
    print(f"Error: {e}")

# Day 6-7 Review: OOP
print("\n--- OOP REVIEW ---")
from abc import ABC, abstractmethod

class Account(ABC):
    """Abstract base class."""
    
    def __init__(self, holder, balance):
        self._holder = holder
        self._balance = balance
    
    @property
    def balance(self):
        return self._balance
    
    @abstractmethod
    def get_account_type(self):
        pass
    
    def deposit(self, amount):
        self._balance += amount
        return f"✓ Deposited ₹{amount}"

class SavingsAccount(Account):
    """Concrete implementation."""
    
    def get_account_type(self):
        return "Savings"
    
    def add_interest(self, rate=0.04):
        interest = self._balance * rate
        self._balance += interest
        return f"✓ Interest: ₹{interest:.2f}"

# Test OOP
acc = SavingsAccount("Bina", 10000)
print(f"Account type: {acc.get_account_type()}")
print(acc.deposit(5000))
print(f"Balance: ₹{acc.balance}")
print(acc.add_interest())
print(f"Final balance: ₹{acc.balance}")

# All concepts together!
print("\n" + "=" * 60)
print("MINI PROJECT: TODO LIST WITH ALL CONCEPTS")
print("=" * 60)

class Task:
    """Task class with OOP."""
    
    _id_counter = 0
    
    def __init__(self, title, priority="medium"):
        Task._id_counter += 1
        self.id = Task._id_counter
        self.title = title
        self.priority = priority
        self.completed = False
    
    def complete(self):
        self.completed = True
    
    def __str__(self):
        status = "✓" if self.completed else "○"
        return f"{status} [{self.priority}] {self.title}"
    
    def to_dict(self):
        """Convert to dictionary for JSON."""
        return {
            "id": self.id,
            "title": self.title,
            "priority": self.priority,
            "completed": self.completed
        }

class TodoList:
    """Todo list manager."""
    
    def __init__(self):
        self.tasks = []
    
    def add_task(self, title, priority="medium"):
        """Add new task."""
        task = Task(title, priority)
        self.tasks.append(task)
        return f"✓ Added: {title}"
    
    def complete_task(self, task_id):
        """Mark task as complete."""
        task = self._find_task(task_id)
        if task:
            task.complete()
            return f"✓ Completed: {task.title}"
        return "✗ Task not found"
    
    def _find_task(self, task_id):
        """Find task by ID (private method)."""
        return next((t for t in self.tasks if t.id == task_id), None)
    
    def list_tasks(self, filter_by=None):
        """List tasks with optional filter."""
        tasks = self.tasks
        
        if filter_by == "completed":
            tasks = [t for t in tasks if t.completed]
        elif filter_by == "pending":
            tasks = [t for t in tasks if not t.completed]
        elif filter_by in ["high", "medium", "low"]:
            tasks = [t for t in tasks if t.priority == filter_by]
        
        if not tasks:
            print("No tasks found!")
            return
        
        print(f"\n--- Tasks ({len(tasks)}) ---")
        for task in tasks:
            print(f"  {task}")
    
    def get_statistics(self):
        """Get task statistics using comprehensions."""
        total = len(self.tasks)
        completed = sum(1 for t in self.tasks if t.completed)
        pending = total - completed
        
        by_priority = {
            "high": sum(1 for t in self.tasks if t.priority == "high"),
            "medium": sum(1 for t in self.tasks if t.priority == "medium"),
            "low": sum(1 for t in self.tasks if t.priority == "low")
        }
        
        return {
            "total": total,
            "completed": completed,
            "pending": pending,
            "by_priority": by_priority
        }
    
    def save_to_file(self, filename):
        """Save tasks to JSON file."""
        try:
            data = [task.to_dict() for task in self.tasks]
            with open(filename, 'w') as f:
                json.dump(data, f, indent=2)
            return f"✓ Saved to {filename}"
        except Exception as e:
            return f"✗ Save failed: {e}"
    
    def load_from_file(self, filename):
        """Load tasks from JSON file."""
        try:
            with open(filename, 'r') as f:
                data = json.load(f)
            
            self.tasks = []
            for item in data:
                task = Task(item['title'], item['priority'])
                task.id = item['id']
                task.completed = item['completed']
                self.tasks.append(task)
                Task._id_counter = max(Task._id_counter, task.id)
            
            return f"✓ Loaded {len(self.tasks)} tasks"
        except FileNotFoundError:
            return "✗ File not found"
        except Exception as e:
            return f"✗ Load failed: {e}"

# Demo: Complete Todo List
print("\nTodo List Demo:")

todo = TodoList()

# Add tasks (functions, parameters)
print(todo.add_task("Learn Python basics", "high"))
print(todo.add_task("Build Django project", "high"))
print(todo.add_task("Study Machine Learning", "medium"))
print(todo.add_task("Review React", "medium"))
print(todo.add_task("Read documentation", "low"))

# List all tasks
todo.list_tasks()

# Complete some tasks (methods)
print(f"\n{todo.complete_task(1)}")
print(todo.complete_task(3))

# List by filter (list comprehensions)
print("\n--- High Priority Tasks ---")
todo.list_tasks("high")

print("\n--- Pending Tasks ---")
todo.list_tasks("pending")

# Statistics (comprehensions, dictionaries)
print("\n--- Statistics ---")
stats = todo.get_statistics()
print(f"Total: {stats['total']}")
print(f"Completed: {stats['completed']}")
print(f"Pending: {stats['pending']}")
print(f"By priority: {stats['by_priority']}")

# File I/O (exception handling)
print(f"\n{todo.save_to_file('day7_todos.json')}")

# Create new todo list and load
print("\nTesting load:")
new_todo = TodoList()
print(new_todo.load_from_file('day7_todos.json'))
new_todo.list_tasks()

print("\n" + "=" * 60)
print("WEEK 1 COMPLETE! 🎉")
print("=" * 60)