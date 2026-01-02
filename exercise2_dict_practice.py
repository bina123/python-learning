# Exercise 2: User Profile Manager

# Create a dictionary for a user profile with:
# - username
# - email  
# - age
# - skills (list of strings)
# - is_active (boolean)
user_profile = {
    "username": "Bina Pithadiya",
    "email": "binapithadiya@gmail.com",
    "age": 31,
    "skills": ["PHP","Laravel","React"],
    "is_active": True
}

# YOUR CODE HERE - Create the dictionary

# TASKS:
# 1. Print user information in a formatted way
# 2. Add a new skill to the skills list
# 3. Update the age
# 4. Check if user has "Python" in skills
# 5. Print all skills with numbering

# YOUR CODE HERE

print(f"Username: {user_profile['username']}")
print(f"Email: {user_profile['email']}")
print(f"age: {user_profile['age']}")
print(f"Skills: {', '.join(user_profile['skills'])}")
print(f"Active: {'Yes' if user_profile['is_active'] else 'No'}")

user_profile["skills"].append("Python")
print(f"Updated with skills {user_profile}")

old_age = user_profile["age"]
user_profile["age"] = 32
print(f"Age updated: {old_age} → {user_profile['age']}")

if "Python" in user_profile["skills"]:
    print("✓ User has Python skill")
    
for i, skill in enumerate(user_profile["skills"], start=1):
    print(f"{i}. {skill}")