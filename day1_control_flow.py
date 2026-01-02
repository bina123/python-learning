# Day 1: Control Flow - If/Else and Loops

print("=" * 50)
print("CONTROL FLOW IN PYTHON")
print("=" * 50)

# IF-ELSE (NO parentheses, NO braces, INDENTATION is KEY!)
print("\n--- If-Else Statements ---")

age = 25
if age >= 18:
    print(f"Age {age}: You are an adult")
else:
    print(f"Age {age}: You are a minor")

# Multiple conditions with elif
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"
print(f"\nScore {score} = Grade {grade}")

# Logical operators: and, or, not (not &&, ||, !)
print("\n--- Logical Operators ---")
age = 25
has_license = True

if age >= 18 and has_license:
    print("✓ Can drive")
else:
    print("✗ Cannot drive")

is_raining = False
has_umbrella = True

if is_raining and not has_umbrella:
    print("You'll get wet!")
elif is_raining and has_umbrella:
    print("You're prepared!")
else:
    print("Enjoy the weather!")

# FOR LOOPS - Very different from PHP!
print("\n--- For Loops with range() ---")

# range(5) = 0, 1, 2, 3, 4
for i in range(5):
    print(f"Loop iteration: {i}")

print("\nCounting from 1 to 5:")
for i in range(1, 6):  # Start at 1, stop before 6
    print(i, end=" ")  # Print on same line

print("\n\nEven numbers from 0 to 10:")
for i in range(0, 11, 2):  # Step by 2
    print(i, end=" ")

# WHILE LOOPS
print("\n\n--- While Loops ---")
count = 1
while count <= 5:
    print(f"Count: {count}")
    count += 1  # Remember: NO count++ in Python!

# Break and Continue
print("\n--- Break and Continue ---")
for i in range(10):
    if i == 3:
        continue  # Skip 3
    if i == 7:
        break  # Stop at 7
    print(i, end=" ")

print("\n")
print("=" * 50)