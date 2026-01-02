# Exercise 1: List Operations

# Create a list of numbers from 1 to 10
numbers = list(range(1, 11))

# YOUR TASKS:
# 1. Print all even numbers
# 2. Print all numbers greater than 5
# 3. Calculate the sum of all numbers
# 4. Find the maximum and minimum
# 5. Create a new list with each number squared

print("Original numbers:", numbers)

# YOUR CODE HERE
total_sum = 0

even_numbers = [x for x in numbers if x % 2 == 0]
odd_numbers = [x for x in numbers if x%2 != 0]
number_greater = [x for x in numbers if x >5]

print(f"Even numbers {even_numbers}")
print(f"Odd numbers {odd_numbers}")
print(f"Numbers greater than 5: {number_greater}")
    
total_sum = sum(number for number in numbers)
print(f"Total sum of all numbers {total_sum}")

minimum_number = min(numbers)
print(f"Minimam number {minimum_number}")

maximum_number = max(numbers)
print(f"Maximum number {maximum_number}")

squared_list = [number**2 for number in numbers]
print(f"Squares: {squared_list}")
