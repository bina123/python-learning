# Day 2: Practical Examples

print("=" * 60)
print("PRACTICAL DATA STRUCTURE EXAMPLES")
print("=" * 60)

# Example 1: Student Management System
print("\n--- Example 1: Student Records ---")

students = [
    {"name": "John", "age": 20, "grades": [85, 90, 88]},
    {"name": "Jane", "age": 21, "grades": [92, 88, 95]},
    {"name": "Bob", "age": 19, "grades": [78, 82, 80]}
]

print("Student Records:")
for student in students:
    avg_grade = sum(student["grades"]) / len(student["grades"])
    print(f"  {student['name']} (Age {student['age']}): Avg Grade = {avg_grade:.2f}")

# Example 2: Shopping Cart
print("\n--- Example 2: Shopping Cart ---")

cart = {
    "items": [
        {"name": "Laptop", "price": 999.99, "quantity": 1},
        {"name": "Mouse", "price": 25.99, "quantity": 2},
        {"name": "Keyboard", "price": 79.99, "quantity": 1}
    ]
}

total = 0
print("Shopping Cart:")
for item in cart["items"]:
    subtotal = item["price"] * item["quantity"]
    total += subtotal
    print(f"  {item['name']}: ${item['price']} x {item['quantity']} = ${subtotal:.2f}")

print(f"\nTotal: ${total:.2f}")

# Example 3: Word Counter
print("\n--- Example 3: Word Counter ---")

text = "python is awesome python is powerful python is easy to learn"
words = text.split()

# Count word occurrences using dictionary
word_count = {}
for word in words:
    if word in word_count:
        word_count[word] += 1
    else:
        word_count[word] = 1

print("Word frequencies:")
for word, count in word_count.items():
    print(f"  '{word}': {count}")

# Example 4: Contact Book
print("\n--- Example 4: Contact Book ---")

contacts = {
    "John": {"phone": "555-1234", "email": "john@example.com"},
    "Jane": {"phone": "555-5678", "email": "jane@example.com"},
    "Bob": {"phone": "555-9012", "email": "bob@example.com"}
}

# Search contact
search_name = "Jane"
if search_name in contacts:
    contact = contacts[search_name]
    print(f"\nFound {search_name}:")
    print(f"  Phone: {contact['phone']}")
    print(f"  Email: {contact['email']}")

# Example 5: Todo List
print("\n--- Example 5: Todo List ---")

todos = [
    {"task": "Learn Python basics", "completed": True},
    {"task": "Build a project", "completed": False},
    {"task": "Deploy to production", "completed": False}
]

print("Todo List:")
for i, todo in enumerate(todos, 1):
    status = "✓" if todo["completed"] else "○"
    print(f"  {status} {i}. {todo['task']}")

# Count completed vs pending
completed = sum(1 for todo in todos if todo["completed"])
pending = len(todos) - completed
print(f"\nCompleted: {completed}, Pending: {pending}")

print("\n" + "=" * 60)