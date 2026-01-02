# Day 8: Regular Expressions and Datetime

import re
from datetime import datetime, timedelta

print("=" * 60)
print("REGULAR EXPRESSIONS")
print("=" * 60)

# Basic pattern matching
print("\n--- Basic Patterns ---")

text = "My email is bina@example.com and my phone is +91-9876543210"

# Find email
email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
email = re.search(email_pattern, text)
if email:
    print(f"Email found: {email.group()}")

# Find phone
phone_pattern = r'\+\d{2}-\d{10}'
phone = re.search(phone_pattern, text)
if phone:
    print(f"Phone found: {phone.group()}")

# Find all matches
print("\n--- Find All Matches ---")

text = "Contact: john@email.com, jane@email.com, bob@email.com"
emails = re.findall(email_pattern, text)
print(f"All emails: {emails}")

# Replace patterns
print("\n--- Replace Patterns ---")

text = "Price: $100, $200, $300"
# Remove dollar signs
clean = re.sub(r'\$', '', text)
print(f"Cleaned: {clean}")

# Validation
print("\n--- Validation ---")

def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

emails = ['valid@email.com', 'invalid@', 'also.valid@test.co.uk', 'bad@']
for email in emails:
    status = "✓" if validate_email(email) else "✗"
    print(f"{status} {email}")

# DATETIME
print("\n" + "=" * 60)
print("DATETIME OPERATIONS")
print("=" * 60)

# Current date and time
now = datetime.now()
print(f"\nCurrent datetime: {now}")
print(f"Date: {now.date()}")
print(f"Time: {now.time()}")
print(f"Year: {now.year}")
print(f"Month: {now.month}")
print(f"Day: {now.day}")

# Formatting dates
print("\n--- Formatting Dates ---")
print(f"ISO format: {now.isoformat()}")
print(f"Custom: {now.strftime('%B %d, %Y')}")
print(f"Custom: {now.strftime('%d/%m/%Y %H:%M:%S')}")

# Parsing dates
print("\n--- Parsing Dates ---")
date_string = "2026-01-02 10:30:00"
parsed = datetime.strptime(date_string, "%Y-%m-%d %H:%M:%S")
print(f"Parsed: {parsed}")

# Date arithmetic
print("\n--- Date Arithmetic ---")
tomorrow = now + timedelta(days=1)
week_ago = now - timedelta(weeks=1)
print(f"Tomorrow: {tomorrow.date()}")
print(f"Week ago: {week_ago.date()}")

# Calculate age
birthday = datetime(1993, 3, 24)
age = (now - birthday).days // 365
print(f"\nIf born on {birthday.date()}, age is: {age}")

print("\n" + "=" * 60)