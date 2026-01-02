# Exercise 3: Grade Calculator (Pythonic version)

print("=== Grade Calculator ===\n")

# Get test scores (better: use a list)
scores = []
for i in range(1, 4):
    score = float(input(f"Enter score {i}: "))
    scores.append(score)

# Calculate average
average_score = sum(scores) / len(scores)

# Determine grade (using a more elegant approach)
if average_score >= 90:
    grade = "A"
elif average_score >= 80:
    grade = "B"
elif average_score >= 70:
    grade = "C"
elif average_score >= 60:
    grade = "D"
else:
    grade = "F"

# Display results
print("\n" + "=" * 40)
print("Results:")
print("=" * 40)
for i, score in enumerate(scores, 1):
    print(f"Score {i}: {score:.2f}")
print(f"\nAverage: {average_score:.2f}")
print(f"Grade: {grade}")
print("=" * 40)