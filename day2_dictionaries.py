# Day 2: Dictionaries - Like PHP associative arrays

print("=" * 60)
print("PYTHON DICTIONARIES")
print("=" * 60)

# Creating dictionaries
# PHP: $person = array("name" => "John", "age" => 30);
# Python:
person = {
    "name": "John Doe",
    "age": 30,
    "city": "New York",
    "is_developer": True
}

print("\n--- Basic Dictionary ---")
print(person)

# Accessing values
print("\n--- Accessing Values ---")
print(f"Name: {person['name']}")
print(f"Age: {person['age']}")

# Safe access with get() - returns None if key doesn't exist
print(f"Email: {person.get('email')}")  # Returns None
print(f"Email: {person.get('email', 'Not provided')}")  # Default value

# Adding/Updating values
print("\n--- Adding/Updating ---")
person["email"] = "john@example.com"  # Add new key
person["age"] = 31  # Update existing key
print(person)

# Removing items
print("\n--- Removing Items ---")
person["temp"] = "temporary"
print(f"Before: {person}")

del person["temp"]  # Remove specific key
print(f"After del: {person}")

popped_value = person.pop("email")  # Remove and return value
print(f"Popped: {popped_value}")
print(f"After pop: {person}")

# Checking if key exists
print("\n--- Checking Keys ---")
if "name" in person:
    print("✓ 'name' key exists")

if "email" not in person:
    print("✓ 'email' key does not exist")

# Dictionary methods
print("\n--- Dictionary Methods ---")
person = {"name": "John", "age": 30, "city": "NYC"}

print(f"Keys: {person.keys()}")
print(f"Values: {person.values()}")
print(f"Items: {person.items()}")

# Looping through dictionaries
print("\n--- Looping Through Dictionary ---")

# Loop through keys
print("Keys only:")
for key in person:
    print(f"  {key}")

# Loop through values
print("\nValues only:")
for value in person.values():
    print(f"  {value}")

# Loop through key-value pairs (like PHP foreach)
print("\nKey-Value pairs:")
for key, value in person.items():
    print(f"  {key}: {value}")

# Nested dictionaries (like PHP multi-dimensional arrays)
print("\n--- Nested Dictionaries ---")
users = {
    "user1": {
        "name": "John",
        "age": 30,
        "skills": ["Python", "Django"]
    },
    "user2": {
        "name": "Jane",
        "age": 25,
        "skills": ["React", "JavaScript"]
    }
}

print(users)
print(f"\nUser1 name: {users['user1']['name']}")
print(f"User1 skills: {users['user1']['skills']}")

# Dictionary comprehension
print("\n--- Dictionary Comprehension ---")
# Create a dictionary of squares
squares = {x: x**2 for x in range(5)}
print(f"Squares: {squares}")

# Convert list to dictionary with index
fruits = ["apple", "banana", "cherry"]
fruit_dict = {i: fruit for i, fruit in enumerate(fruits)}
print(f"Fruit dict: {fruit_dict}")

# Merging dictionaries (Python 3.9+)
print("\n--- Merging Dictionaries ---")
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
merged = dict1 | dict2  # Merge operator
print(f"Merged: {merged}")

# Or using unpacking
merged2 = {**dict1, **dict2}
print(f"Merged2: {merged2}")

print("\n" + "=" * 60)