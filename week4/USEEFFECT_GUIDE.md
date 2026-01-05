# useEffect Best Practices

## 1. Always Specify Dependencies
```jsx
// ❌ Bad - runs on every render
useEffect(() => {
  fetchData();
});

// ✅ Good - runs once on mount
useEffect(() => {
  fetchData();
}, []);

// ✅ Good - runs when id changes
useEffect(() => {
  fetchData(id);
}, [id]);
```

## 2. Cleanup Side Effects
```jsx
// ✅ Always cleanup timers, subscriptions, listeners
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  
  return () => clearInterval(timer);
}, []);
```

## 3. Avoid Race Conditions
```jsx
// ❌ Bad - can cause race conditions
useEffect(() => {
  fetch(url).then(setPosts);
}, [url]);

// ✅ Good - use cleanup to cancel
useEffect(() => {
  let cancelled = false;
  
  fetch(url).then(data => {
    if (!cancelled) setPosts(data);
  });
  
  return () => { cancelled = true; };
}, [url]);
```

## 4. Don't Put Functions in Dependencies
```jsx
// ❌ Bad - function recreated every render
useEffect(() => {
  fetchData();
}, [fetchData]);

// ✅ Good - use useCallback or move inside effect
useEffect(() => {
  const fetchData = () => {
    // fetch logic
  };
  fetchData();
}, [dependency]);
```

## 5. Multiple Effects for Different Concerns
```jsx
// ❌ Bad - one effect doing too much
useEffect(() => {
  fetchPosts();
  subscribeToWebSocket();
  updateDocumentTitle();
}, []);

// ✅ Good - separate effects
useEffect(() => {
  fetchPosts();
}, []);

useEffect(() => {
  const ws = subscribeToWebSocket();
  return () => ws.close();
}, []);

useEffect(() => {
  document.title = title;
}, [title]);
```

## Common Patterns

### Fetch Data on Mount
```jsx
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData);
}, []);
```

### Re-fetch When Dependency Changes
```jsx
useEffect(() => {
  fetch(`/api/posts/${id}`)
    .then(res => res.json())
    .then(setPost);
}, [id]);
```

### Debounced Search
```jsx
useEffect(() => {
  const timer = setTimeout(() => {
    search(query);
  }, 500);
  
  return () => clearTimeout(timer);
}, [query]);
```

### WebSocket Connection
```jsx
useEffect(() => {
  const ws = new WebSocket(url);
  ws.onmessage = handleMessage;
  
  return () => ws.close();
}, [url]);
```

### Local Storage Sync
```jsx
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);
```