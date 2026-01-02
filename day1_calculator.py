# Day 1: Simple Calculator - Your First Interactive Program!

print("=" * 50)
print("     SIMPLE CALCULATOR")
print("=" * 50)

print("\nOperations:")
print("1. Addition (+)")
print("2. Subtraction (-)")
print("3. Multiplication (*)")
print("4. Division (/)")
print("5. Power (^)")
print("6. Modulo (%)")

# Get user input
choice = input("\nEnter your choice (1-6): ")

# Get numbers from user
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

# Perform calculation
result = None
operation = ""

if choice == '1':
    result = num1 + num2
    operation = "+"
elif choice == '2':
    result = num1 - num2
    operation = "-"
elif choice == '3':
    result = num1 * num2
    operation = "*"
elif choice == '4':
    if num2 != 0:
        result = num1 / num2
        operation = "/"
    else:
        print("\n❌ Error: Cannot divide by zero!")
elif choice == '5':
    result = num1 ** num2
    operation = "^"
elif choice == '6':
    if num2 != 0:
        result = num1 % num2
        operation = "%"
    else:
        print("\n❌ Error: Cannot perform modulo with zero!")
else:
    print("\n❌ Invalid choice!")

# Display result
if result is not None:
    print("\n" + "=" * 50)
    print(f"   {num1} {operation} {num2} = {result}")
    print("=" * 50)

print("\nThank you for using the calculator!")