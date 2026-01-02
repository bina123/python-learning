# Day 8: Working with APIs

import requests
import json
from datetime import datetime

print("=" * 60)
print("WORKING WITH EXTERNAL APIs")
print("=" * 60)

# Basic GET request
print("\n--- Basic GET Request ---")

# Free API - JSONPlaceholder (fake REST API for testing)
response = requests.get('https://jsonplaceholder.typicode.com/posts/1')

print(f"Status Code: {response.status_code}")
print(f"Response Type: {type(response.json())}")
print(f"Data: {response.json()}")

# GET request with parameters
print("\n--- GET with Parameters ---")

params = {
    'userId': 1
}
response = requests.get('https://jsonplaceholder.typicode.com/posts', params=params)
posts = response.json()

print(f"Found {len(posts)} posts for user 1")
for post in posts[:3]:  # Show first 3
    print(f"  - {post['title']}")

# POST request - Creating data
print("\n--- POST Request (Create) ---")

new_post = {
    'title': 'My Python Learning Journey',
    'body': 'Learning Python to become Full-Stack AI Engineer',
    'userId': 1
}

response = requests.post(
    'https://jsonplaceholder.typicode.com/posts',
    json=new_post
)

print(f"Status: {response.status_code}")
print(f"Created post ID: {response.json()['id']}")

# PUT request - Updating data
print("\n--- PUT Request (Update) ---")

updated_post = {
    'id': 1,
    'title': 'Updated Title',
    'body': 'Updated body content',
    'userId': 1
}

response = requests.put(
    'https://jsonplaceholder.typicode.com/posts/1',
    json=updated_post
)

print(f"Status: {response.status_code}")
print(f"Updated: {response.json()}")

# DELETE request
print("\n--- DELETE Request ---")

response = requests.delete('https://jsonplaceholder.typicode.com/posts/1')
print(f"Status: {response.status_code}")
print(f"Deleted successfully!" if response.status_code == 200 else "Failed")

# Error handling with APIs
print("\n--- Error Handling ---")

try:
    response = requests.get('https://jsonplaceholder.typicode.com/posts/999999')
    response.raise_for_status()  # Raises exception for 4xx/5xx status codes
    print(response.json())
except requests.exceptions.HTTPError as e:
    print(f"HTTP Error: {e}")
except requests.exceptions.ConnectionError:
    print("Connection Error: Check your internet")
except requests.exceptions.Timeout:
    print("Timeout: Request took too long")
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")

# Headers and Authentication
print("\n--- Headers and Authentication ---")

headers = {
    'User-Agent': 'Python Learning Bot',
    'Accept': 'application/json'
}

response = requests.get(
    'https://jsonplaceholder.typicode.com/posts/1',
    headers=headers
)

print(f"Request headers sent: {headers}")
print(f"Response headers: {dict(response.headers)}")

# Real-world example: Weather API
print("\n" + "=" * 60)
print("REAL EXAMPLE: GitHub API")
print("=" * 60)

def get_github_user(username):
    """Fetch GitHub user information."""
    try:
        response = requests.get(f'https://api.github.com/users/{username}')
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return None

# Test with real GitHub users
users = ['torvalds', 'gvanrossum', 'octocat']

for username in users:
    user_data = get_github_user(username)
    if user_data:
        print(f"\n{user_data['name']} (@{user_data['login']})")
        print(f"  Public Repos: {user_data['public_repos']}")
        print(f"  Followers: {user_data['followers']}")
        print(f"  Bio: {user_data.get('bio', 'No bio')}")

# Session for multiple requests
print("\n--- Using Session for Multiple Requests ---")

session = requests.Session()
session.headers.update({'User-Agent': 'Python Learning'})

# Multiple requests reuse connection
for i in range(1, 4):
    response = session.get(f'https://jsonplaceholder.typicode.com/posts/{i}')
    post = response.json()
    print(f"Post {i}: {post['title'][:50]}...")

session.close()

print("\n" + "=" * 60)