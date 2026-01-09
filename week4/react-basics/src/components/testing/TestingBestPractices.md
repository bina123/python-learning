# Testing Best Practices

## What to Test

✅ **DO Test:**
- User interactions (clicks, typing, form submission)
- Conditional rendering (show/hide elements)
- Component props and state changes
- API calls and data fetching
- Error handling
- Edge cases and boundary conditions

❌ **DON'T Test:**
- Implementation details (internal state, function names)
- Third-party libraries
- Styles and CSS (unless critical to functionality)
- Simple getters/setters with no logic

## Testing Patterns

### 1. Arrange-Act-Assert (AAA)
```javascript
it('increments counter', () => {
  // Arrange: Set up the test
  render(<Counter />);
  
  // Act: Perform the action
  fireEvent.click(screen.getByText('Increment'));
  
  // Assert: Check the result
  expect(screen.getByTestId('count')).toHaveTextContent('1');
});
```

### 2. Use Data-TestId for Dynamic Content
```jsx
// Good: Stable identifier
<div data-testid="user-profile">{user.name}</div>

// Bad: Fragile text-based query
<div>Welcome, {user.name}</div>
```

### 3. Test User Behavior, Not Implementation
```javascript
// Good: Tests what user sees
expect(screen.getByRole('button')).toHaveTextContent('Submit');

// Bad: Tests internal state
expect(component.state.isSubmitting).toBe(false);
```

### 4. Mock External Dependencies
```javascript
// Mock API calls
global.fetch = vi.fn(() => 
  Promise.resolve({
    ok: true,
    json: async () => ({ data: 'test' })
  })
);
```

### 5. Use Async Utilities
```javascript
// Wait for element to appear
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});

// Find element (auto-waits)
const element = await screen.findByText('Loaded');
```

## Common Queries

### By Role (Preferred)
```javascript
screen.getByRole('button', { name: /submit/i })
screen.getByRole('heading', { level: 1 })
screen.getByRole('textbox', { name: /email/i })
```

### By Label Text
```javascript
screen.getByLabelText('Email')
screen.getByLabelText(/password/i)
```

### By Text
```javascript
screen.getByText('Hello World')
screen.getByText(/welcome/i)
```

### By Test ID (Last Resort)
```javascript
screen.getByTestId('user-profile')
```

## Query Priority
1. `getByRole` - Best for accessibility
2. `getByLabelText` - Good for forms
3. `getByPlaceholderText` - For inputs
4. `getByText` - For non-interactive elements
5. `getByTestId` - Last resort only

## Async Testing
```javascript
// Wait for element
await waitFor(() => {
  expect(screen.getByText('Done')).toBeInTheDocument();
});

// Find (built-in wait)
const element = await screen.findByText('Loaded');

// User events (automatic waiting)
await user.click(button);
await user.type(input, 'text');
```

## Mocking

### Mock Functions
```javascript
const mockFn = vi.fn();
mockFn.mockReturnValue(42);
expect(mockFn).toHaveBeenCalledWith('arg');
```

### Mock API
```javascript
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => ({ data: [] })
  })
);
```

### Mock Modules
```javascript
vi.mock('./api', () => ({
  fetchData: vi.fn(() => Promise.resolve([])),
}));
```

## Coverage Goals
- **80%+ overall coverage** - Good
- **90%+ coverage** - Excellent
- **100% coverage** - Not always necessary

Focus on:
- Critical business logic
- Complex components
- Error handling
- Edge cases

## Running Tests
```bash
npm test              # Run all tests
npm run test:ui       # Visual test runner
npm run test:coverage # Coverage report
```
