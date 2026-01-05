# Context API Patterns

## Pattern 1: Context + Custom Hook
```jsx
// ✅ Best Practice
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Usage
const { user, login, logout } = useAuth();
```

**Benefits:**
- Error checking built-in
- Cleaner imports
- Better DX (Developer Experience)

---

## Pattern 2: Multiple Contexts
```jsx
// Wrap app with multiple providers
<AuthProvider>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</AuthProvider>
```

**Or use composition:**
```jsx
const AppProviders = ({ children }) => (
  <AuthProvider>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </AuthProvider>
);
```

---

## Pattern 3: Context + useReducer

For complex state logic:
```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, initialState);
```

---

## When to Use Context

✅ **Use Context for:**
- Authentication state
- Theme preferences
- User settings
- Language/i18n
- Shopping cart

❌ **Don't Use Context for:**
- Frequently changing data (causes re-renders)
- Local component state
- Form state
- Data fetching (use React Query instead)

---

## Performance Optimization
```jsx
// Split contexts by update frequency
<AuthContext.Provider>  {/* Rarely changes */}
  <ThemeContext.Provider>  {/* Rarely changes */}
    <DataContext.Provider>  {/* Frequently changes */}
      <App />
    </DataContext.Provider>
  </ThemeContext.Provider>
</AuthContext.Provider>
```

---

## Context vs Redux vs Zustand

| Feature | Context | Redux | Zustand |
|---------|---------|-------|---------|
| **Setup** | Simple | Complex | Simple |
| **Performance** | Good | Excellent | Excellent |
| **DevTools** | No | Yes | Yes |
| **Learning Curve** | Easy | Hard | Easy |
| **Best For** | Auth, Theme | Large apps | Medium apps |

**Recommendation:** Start with Context, migrate to Zustand if needed.