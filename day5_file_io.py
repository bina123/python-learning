# Day 5: File I/O - Reading and Writing Files

import os
import json
import csv

print("=" * 60)
print("FILE I/O IN PYTHON")
print("=" * 60)

# Create a practice directory
if not os.path.exists('day5_practice'):
    os.makedirs('day5_practice')
    print("✓ Created 'day5_practice' directory")

# Writing to files
print("\n--- Writing to Files ---")

# Method 1: Basic write (overwrites existing file)
# PHP: file_put_contents('file.txt', $content);
# Python:
with open('day5_practice/sample.txt', 'w') as file:
    file.write("Hello from Python!\n")
    file.write("This is Day 5 of learning.\n")
    file.write("File I/O is easy!\n")

print("✓ Written to sample.txt")

# The 'with' statement automatically closes the file
# In PHP you might use fopen/fclose, Python's 'with' is better!

# Method 2: Append to file (doesn't overwrite)
with open('day5_practice/sample.txt', 'a') as file:
    file.write("This line was appended.\n")
    file.write("And another one!\n")

print("✓ Appended to sample.txt")

# Reading from files
print("\n--- Reading from Files ---")

# Method 1: Read entire file as string
with open('day5_practice/sample.txt', 'r') as file:
    content = file.read()
    print("Full content:")
    print(content)

# Method 2: Read line by line
print("\n--- Reading Line by Line ---")
with open('day5_practice/sample.txt', 'r') as file:
    for line_number, line in enumerate(file, 1):
        print(f"Line {line_number}: {line.strip()}")

# Method 3: Read all lines into a list
with open('day5_practice/sample.txt', 'r') as file:
    lines = file.readlines()
    print(f"\nTotal lines: {len(lines)}")
    print(f"First line: {lines[0].strip()}")
    print(f"Last line: {lines[-1].strip()}")

# File modes
print("\n--- File Modes ---")
print("'r'  - Read (default)")
print("'w'  - Write (overwrites)")
print("'a'  - Append")
print("'r+' - Read and write")
print("'rb' - Read binary")
print("'wb' - Write binary")

# Working with paths
print("\n--- Working with Paths ---")
print(f"Current directory: {os.getcwd()}")
print(f"File exists? {os.path.exists('day5_practice/sample.txt')}")
print(f"Is file? {os.path.isfile('day5_practice/sample.txt')}")
print(f"Is directory? {os.path.isdir('day5_practice')}")

# List files in directory
files = os.listdir('day5_practice')
print(f"Files in day5_practice: {files}")

# Working with JSON (like PHP json_encode/decode)
print("\n" + "=" * 60)
print("JSON FILES")
print("=" * 60)

# Writing JSON
user_data = {
    "name": "Bina Pithadiya",
    "age": 31,
    "role": "Full-Stack AI Engineer",
    "skills": ["Python", "Django", "React", "ML"],
    "experience": {
        "php": 9,
        "python": "learning"
    },
    "active": True
}

# Save to JSON file
# PHP: file_put_contents('data.json', json_encode($data));
# Python:
with open('day5_practice/user.json', 'w') as file:
    json.dump(user_data, file, indent=4)  # indent=4 for pretty printing

print("✓ Written to user.json")

# Reading JSON
# PHP: $data = json_decode(file_get_contents('data.json'));
# Python:
with open('day5_practice/user.json', 'r') as file:
    loaded_data = json.load(file)

print("\nLoaded from JSON:")
print(f"Name: {loaded_data['name']}")
print(f"Skills: {', '.join(loaded_data['skills'])}")
print(f"Experience: {loaded_data['experience']}")

# JSON string conversion (like json_encode/decode without file)
json_string = json.dumps(user_data, indent=2)
print("\nJSON as string:")
print(json_string)

parsed_data = json.loads(json_string)
print(f"\nParsed back: {parsed_data['name']}")

# Working with CSV files
print("\n" + "=" * 60)
print("CSV FILES")
print("=" * 60)

# Writing CSV
# Like PHP fputcsv
users_csv = [
    ["Name", "Age", "City", "Role"],
    ["Bina", 31, "Narnaund", "Developer"],
    ["Raj", 28, "Mumbai", "Designer"],
    ["Priya", 25, "Delhi", "Manager"],
    ["Amit", 30, "Bangalore", "Developer"]
]

with open('day5_practice/users.csv', 'w', newline='') as file:
    csv_writer = csv.writer(file)
    csv_writer.writerows(users_csv)

print("✓ Written to users.csv")

# Reading CSV
print("\n--- Reading CSV ---")
with open('day5_practice/users.csv', 'r') as file:
    csv_reader = csv.reader(file)
    for row in csv_reader:
        print(row)

# Reading CSV as dictionaries (better!)
print("\n--- Reading CSV as Dictionaries ---")
with open('day5_practice/users.csv', 'r') as file:
    csv_dict_reader = csv.DictReader(file)
    for row in csv_dict_reader:
        print(f"{row['Name']:10} | Age: {row['Age']:2} | {row['City']:10} | {row['Role']}")

# Writing CSV from dictionaries
print("\n--- Writing CSV from Dictionaries ---")
employees = [
    {"name": "Alice", "department": "Engineering", "salary": 75000},
    {"name": "Bob", "department": "Sales", "salary": 65000},
    {"name": "Charlie", "department": "Marketing", "salary": 70000}
]

with open('day5_practice/employees.csv', 'w', newline='') as file:
    fieldnames = ["name", "department", "salary"]
    csv_writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    csv_writer.writeheader()  # Write column names
    csv_writer.writerows(employees)

print("✓ Written to employees.csv")

# Practical example: Log file
print("\n" + "=" * 60)
print("PRACTICAL: LOG FILE")
print("=" * 60)

from datetime import datetime

def write_log(message, level="INFO"):
    """Write a log message to file."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_entry = f"[{timestamp}] [{level}] {message}\n"
    
    with open('day5_practice/app.log', 'a') as file:
        file.write(log_entry)
    
    print(f"Logged: {log_entry.strip()}")

# Write some logs
write_log("Application started")
write_log("User logged in", "INFO")
write_log("Database connected", "INFO")
write_log("Low memory warning", "WARNING")
write_log("Failed to save file", "ERROR")

# Read and display logs
print("\n--- Reading Log File ---")
with open('day5_practice/app.log', 'r') as file:
    logs = file.readlines()
    print(f"Total log entries: {len(logs)}\n")
    for log in logs[-5:]:  # Show last 5 entries
        print(log.strip())

# Practical example: Configuration file
print("\n" + "=" * 60)
print("PRACTICAL: CONFIGURATION FILE")
print("=" * 60)

config = {
    "database": {
        "host": "localhost",
        "port": 5432,
        "name": "myapp_db",
        "user": "bina"
    },
    "app": {
        "debug": True,
        "max_upload_size": 10485760,  # 10MB
        "allowed_extensions": [".jpg", ".png", ".pdf"]
    },
    "email": {
        "smtp_host": "smtp.gmail.com",
        "smtp_port": 587,
        "from_email": "noreply@myapp.com"
    }
}

# Save config
with open('day5_practice/config.json', 'w') as file:
    json.dump(config, file, indent=4)

print("✓ Configuration saved")

# Load and use config
with open('day5_practice/config.json', 'r') as file:
    app_config = json.load(file)

print("\nDatabase configuration:")
print(f"  Host: {app_config['database']['host']}")
print(f"  Port: {app_config['database']['port']}")
print(f"  Database: {app_config['database']['name']}")

print("\nApp configuration:")
print(f"  Debug mode: {app_config['app']['debug']}")
print(f"  Max upload: {app_config['app']['max_upload_size'] / 1024 / 1024}MB")

print("\n" + "=" * 60)