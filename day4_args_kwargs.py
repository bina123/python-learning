# Day 4: *args and **kwargs - Variable arguments

print("=" * 60)
print("*ARGS AND **KWARGS")
print("=" * 60)

# *args - Variable number of positional arguments
# Like PHP func_get_args() but better!
def sum_all(*numbers):
    """Sum any number of arguments."""
    total = 0
    for num in numbers:
        total += num
    return total

print("\n--- *args (Variable Positional Arguments) ---")
print(f"sum_all(1, 2, 3) = {sum_all(1, 2, 3)}")
print(f"sum_all(10, 20, 30, 40, 50) = {sum_all(10, 20, 30, 40, 50)}")
print(f"sum_all(5) = {sum_all(5)}")
print(f"sum_all() = {sum_all()}")  # No arguments is fine!

# *args is a tuple
def print_args(*args):
    """Show what *args actually is."""
    print(f"Type of args: {type(args)}")
    print(f"Args: {args}")
    for i, arg in enumerate(args, 1):
        print(f"  Argument {i}: {arg}")

print("\n--- What is *args? ---")
print_args("Python", "Django", "React", "ML")

# **kwargs - Variable number of keyword arguments
# Like PHP's associative array parameters
def create_user(**kwargs):
    """Create user with any number of attributes."""
    print("Creating user with:")
    for key, value in kwargs.items():
        print(f"  {key}: {value}")
    return kwargs

print("\n--- **kwargs (Variable Keyword Arguments) ---")
user1 = create_user(name="Bina", age=31, city="Narnaund")
print(f"User 1: {user1}")

user2 = create_user(name="Raj", email="raj@example.com", role="Developer", experience=5)
print(f"User 2: {user2}")

# **kwargs is a dictionary
def print_kwargs(**kwargs):
    """Show what **kwargs actually is."""
    print(f"Type of kwargs: {type(kwargs)}")
    print(f"Kwargs: {kwargs}")

print("\n--- What is **kwargs? ---")
print_kwargs(language="Python", framework="Django", database="PostgreSQL")

# Combining regular args, *args, and **kwargs
def full_function(required1, required2, *args, default="default_value", **kwargs):
    """
    Demonstrate all parameter types together.
    
    Order MUST be:
    1. Required positional arguments
    2. *args
    3. Default/keyword arguments
    4. **kwargs
    """
    print(f"Required 1: {required1}")
    print(f"Required 2: {required2}")
    print(f"Default: {default}")
    print(f"Extra positional (*args): {args}")
    print(f"Extra keyword (**kwargs): {kwargs}")

print("\n--- Combining All Parameter Types ---")
full_function(
    "First",
    "Second",
    "Extra1", "Extra2", "Extra3",
    default="Custom",
    key1="value1",
    key2="value2"
)

# Practical example: Flexible logger
def log(level, message, *tags, **metadata):
    """
    Flexible logging function.
    
    Args:
        level: Log level (INFO, WARNING, ERROR)
        message: Log message
        *tags: Any number of tags
        **metadata: Any additional metadata
    """
    print(f"[{level}] {message}")
    
    if tags:
        print(f"  Tags: {', '.join(tags)}")
    
    if metadata:
        print("  Metadata:")
        for key, value in metadata.items():
            print(f"    {key}: {value}")

print("\n--- Practical Example: Logger ---")
log("INFO", "User logged in")

log("WARNING", "High memory usage", "performance", "memory")

log(
    "ERROR",
    "Database connection failed",
    "database", "critical",
    host="localhost",
    port=5432,
    retry_count=3
)

# Unpacking arguments
def greet_person(first_name, last_name, age):
    """Greet person with their details."""
    return f"Hello {first_name} {last_name}, age {age}"

print("\n--- Unpacking Arguments ---")
# Unpack list/tuple with *
person_data = ["Bina", "Pithadiya", 31]
greeting = greet_person(*person_data)  # * unpacks the list
print(greeting)

# Unpack dictionary with **
person_dict = {"first_name": "Raj", "last_name": "Kumar", "age": 28}
greeting2 = greet_person(**person_dict)  # ** unpacks the dictionary
print(greeting2)

# Practical: Building SQL-like query builder
def build_query(table, *columns, **conditions):
    """Build a simple SQL query."""
    # SELECT columns
    if columns:
        cols = ", ".join(columns)
    else:
        cols = "*"
    
    query = f"SELECT {cols} FROM {table}"
    
    # WHERE conditions
    if conditions:
        where_clauses = [f"{key} = '{value}'" for key, value in conditions.items()]
        query += " WHERE " + " AND ".join(where_clauses)
    
    return query

print("\n--- Practical: Query Builder ---")
query1 = build_query("users")
print(query1)

query2 = build_query("users", "name", "email", "age")
print(query2)

query3 = build_query("users", "name", "email", city="Narnaund", role="Developer")
print(query3)

query4 = build_query("products", "id", "name", "price", category="Electronics", stock=">0")
print(query4)

print("\n" + "=" * 60)