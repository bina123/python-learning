# Authentication & Authorization Guide

## Authentication Flow

### 1. Register New User
```bash
POST /api/auth/register/
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepass123",
  "password_confirm": "securepass123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 5,
    "username": "johndoe",
    "email": "john@example.com"
  },
  "tokens": {
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

### 2. Login
```bash
POST /api/auth/login/
{
  "username": "johndoe",
  "password": "securepass123"
}
```

**Response:** Same as register

### 3. Use Access Token

Add to request headers:
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

### 4. Refresh Token (when access expires)
```bash
POST /api/auth/token/refresh/
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",  // New access token
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."  // New refresh token
}
```

### 5. Logout
```bash
POST /api/auth/logout/
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

## Token Lifecycle

- **Access Token**: Expires in 1 hour
- **Refresh Token**: Expires in 7 days
- When access expires, use refresh to get new access
- When refresh expires, user must login again

## Permissions

### Permission Classes

| Permission | Description |
|------------|-------------|
| `AllowAny` | Anyone can access |
| `IsAuthenticated` | Must be logged in |
| `IsAdminUser` | Must be admin/staff |
| `IsAuthenticatedOrReadOnly` | Read: anyone, Write: authenticated |
| `IsAuthorOrReadOnly` | Only author can edit/delete |
| `IsAdminOrReadOnly` | Only admin can edit/delete |

### Endpoint Permissions

| Endpoint | GET | POST | PUT/PATCH | DELETE |
|----------|-----|------|-----------|--------|
| `/api/posts/` | Anyone | Auth | Author | Author |
| `/api/posts/{slug}/` | Anyone | N/A | Author | Author |
| `/api/categories/` | Anyone | Admin | Admin | Admin |
| `/api/comments/` | Anyone | Auth | Auth | Auth |
| `/api/auth/profile/` | Auth | N/A | Self | N/A |

## Error Responses

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 403 Forbidden
```json
{
  "detail": "You do not have permission to perform this action."
}
```

### 401 Invalid Token
```json
{
  "detail": "Given token not valid for any token type",
  "code": "token_not_valid"
}
```

## Frontend Integration Example

### JavaScript/Fetch
```javascript
// 1. Login
const login = async (username, password) => {
  const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  const data = await response.json();
  
  // Save tokens
  localStorage.setItem('access_token', data.tokens.access);
  localStorage.setItem('refresh_token', data.tokens.refresh);
  
  return data;
};

// 2. Make authenticated request
const getProfile = async () => {
  const token = localStorage.getItem('access_token');
  
  const response = await fetch('http://127.0.0.1:8000/api/auth/profile/', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return await response.json();
};

// 3. Refresh token
const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh_token');
  
  const response = await fetch('http://127.0.0.1:8000/api/auth/token/refresh/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh })
  });
  
  const data = await response.json();
  
  // Update tokens
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);
  
  return data;
};

// 4. Logout
const logout = async () => {
  const refresh = localStorage.getItem('refresh_token');
  
  await fetch('http://127.0.0.1:8000/api/auth/logout/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh })
  });
  
  // Clear tokens
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
```

### React Example
```jsx
import { useState, useEffect } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const [user, setUser] = useState(null);
  
  const login = async (username, password) => {
    const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    setToken(data.tokens.access);
    localStorage.setItem('access_token', data.tokens.access);
    localStorage.setItem('refresh_token', data.tokens.refresh);
  };
  
  useEffect(() => {
    if (token) {
      // Fetch user profile
      fetch('http://127.0.0.1:8000/api/auth/profile/', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setUser(data));
    }
  }, [token]);
  
  return (
    <div>
      {user ? (
        <div>Welcome, {user.username}!</div>
      ) : (
        <div>Please login</div>
      )}
    </div>
  );
}
```