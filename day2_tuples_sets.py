# Day 2: Tuples and Sets

print("=" * 60)
print("TUPLES AND SETS")
print("=" * 60)

# TUPLES - Immutable (cannot be changed) lists
print("\n--- TUPLES (Immutable Lists) ---")
# Use parentheses instead of square brackets
coordinates = (10, 20)
rgb_color = (255, 0, 128)
person = ("John", 30, "Developer")

print(f"Coordinates: {coordinates}")
print(f"RGB Color: {rgb_color}")
print(f"Person: {person}")

# Accessing tuple elements (same as lists)
print(f"\nFirst coordinate: {coordinates[0]}")
print(f"Name: {person[0]}")

# Tuple unpacking (VERY useful!)
x, y = coordinates
print(f"\nx = {x}, y = {y}")

name, age, job = person
print(f"Name: {name}, Age: {age}, Job: {job}")

# Tuples are immutable
print("\nTuples cannot be changed:")
try:
    coordinates[0] = 15  # This will raise an error
except TypeError as e:
    print(f"Error: {e}")

# When to use tuples vs lists?
# Tuples: Fixed data (coordinates, RGB colors, database records)
# Lists: Dynamic data that needs to change

# SETS - Unordered, unique collections
print("\n\n--- SETS (Unique Collections) ---")
# Use curly braces like dictionaries but without key:value
fruits_set = {"apple", "banana", "cherry"}
numbers_set = {1, 2, 3, 4, 5}

print(f"Fruits set: {fruits_set}")
print(f"Numbers set: {numbers_set}")

# Sets automatically remove duplicates
duplicates = {1, 2, 2, 3, 3, 3, 4, 5, 5}
print(f"\nWith duplicates: {duplicates}")  # Only unique values

# Adding to sets
fruits_set.add("orange")
print(f"After add: {fruits_set}")

# Removing from sets
fruits_set.remove("banana")
print(f"After remove: {fruits_set}")

# Set operations
print("\n--- Set Operations ---")
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

print(f"Set 1: {set1}")
print(f"Set 2: {set2}")
print(f"Union (all items): {set1 | set2}")
print(f"Intersection (common): {set1 & set2}")
print(f"Difference (in set1 but not set2): {set1 - set2}")

# Practical use case: Remove duplicates from list
print("\n--- Practical Example: Remove Duplicates ---")
numbers_with_dupes = [1, 2, 2, 3, 4, 4, 5, 5, 5]
unique_numbers = list(set(numbers_with_dupes))
print(f"Original: {numbers_with_dupes}")
print(f"Unique: {unique_numbers}")

# Check membership (very fast with sets!)
print("\n--- Membership Testing ---")
large_set = set(range(1000000))
print(f"Is 500000 in set? {500000 in large_set}")  # Very fast!

print("\n" + "=" * 60)