# Day 2: Lists - Like PHP indexed arrays but MORE powerful!

print("=" * 60)
print("PYTHON LISTS")
print("=" * 60)

# Creating lists
# PHP: $fruits = array("apple", "banana", "cherry");
# Python:
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = ["John", 25, True, 3.14]  # Can mix types!

print("\n--- Basic Lists ---")
print(f"Fruits: {fruits}")
print(f"Numbers: {numbers}")
print(f"Mixed: {mixed}")

# Accessing elements (0-indexed, same as PHP)
print("\n--- Accessing Elements ---")
print(f"First fruit: {fruits[0]}")
print(f"Last fruit: {fruits[-1]}")  # Negative indexing! NEW!
print(f"Second to last: {fruits[-2]}")

# List length
print(f"\nNumber of fruits: {len(fruits)}")

# Adding elements
print("\n--- Adding Elements ---")
fruits.append("orange")  # Add to end
print(f"After append: {fruits}")

fruits.insert(1, "mango")  # Insert at index 1
print(f"After insert: {fruits}")

fruits.extend(["grape", "kiwi"])  # Add multiple
print(f"After extend: {fruits}")

# Removing elements
print("\n--- Removing Elements ---")
fruits.remove("banana")  # Remove by value
print(f"After remove: {fruits}")

popped = fruits.pop()  # Remove and return last item
print(f"Popped: {popped}")
print(f"After pop: {fruits}")

fruits.pop(0)  # Remove by index
print(f"After pop(0): {fruits}")

# Checking if item exists
print("\n--- Checking Membership ---")
if "apple" in fruits:
    print("✓ Apple is in the list")
else:
    print("✗ Apple is not in the list")

# List slicing (VERY POWERFUL!)
print("\n--- List Slicing ---")
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(f"Original: {numbers}")
print(f"First 5: {numbers[0:5]}")  # or numbers[:5]
print(f"Last 5: {numbers[5:]}")
print(f"Middle: {numbers[3:7]}")
print(f"Every 2nd: {numbers[::2]}")  # Step by 2
print(f"Reverse: {numbers[::-1]}")  # Reverse the list!

# Looping through lists
print("\n--- Looping Through Lists ---")
fruits = ["apple", "banana", "cherry"]

# Method 1: Simple
for fruit in fruits:
    print(f"I like {fruit}")

print()

# Method 2: With index (like PHP foreach with key)
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

print()

# Method 3: With index starting from 1
for index, fruit in enumerate(fruits, start=1):
    print(f"#{index}: {fruit}")

# List methods
print("\n--- Useful List Methods ---")
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
print(f"Original: {numbers}")
numbers.sort()  # Sort in place
print(f"Sorted: {numbers}")

numbers.reverse()  # Reverse in place
print(f"Reversed: {numbers}")

print(f"Count of 1: {numbers.count(1)}")
print(f"Index of 5: {numbers.index(5)}")

# List copying
print("\n--- Copying Lists ---")
list1 = [1, 2, 3]
list2 = list1  # ❌ This doesn't copy! Both point to same list
list3 = list1.copy()  # ✓ This copies
list4 = list1[:]  # ✓ This also copies

list1.append(4)
print(f"list1: {list1}")
print(f"list2 (same reference): {list2}")
print(f"list3 (copy): {list3}")

# List comprehensions (SUPER POWERFUL!)
print("\n--- List Comprehensions (Advanced) ---")
# Create a list of squares
squares = [x**2 for x in range(10)]
print(f"Squares: {squares}")

# Filter even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [x for x in numbers if x % 2 == 0]
print(f"Even numbers: {evens}")

# Convert to uppercase
fruits = ["apple", "banana", "cherry"]
upper_fruits = [fruit.upper() for fruit in fruits]
print(f"Uppercase: {upper_fruits}")

print("\n" + "=" * 60)