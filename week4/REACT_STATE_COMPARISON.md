# React State vs Django Session/Database

## Todo App Comparison

### Django Approach (Traditional)
```python
# views.py
@login_required
def todo_list(request):
    if request.method == 'POST':
        form = TodoForm(request.POST)
        if form.is_valid():
            todo = form.save(commit=False)
            todo.user = request.user
            todo.save()
            return redirect('todo_list')  # Page reload!
    
    todos = Todo.objects.filter(user=request.user)
    form = TodoForm()
    return render(request, 'todos.html', {
        'todos': todos,
        'form': form
    })
```

**Every action = Page reload** ❌

---

### React Approach (Modern)
```jsx
function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    
    const addTodo = () => {
        setTodos([...todos, { text: input }]);
        setInput('');
        // No page reload! ✅
    };
    
    return (
        <>
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={addTodo}>Add</button>
            {todos.map(todo => <div>{todo.text}</div>)}
        </>
    );
}
```

**Instant updates, no reload** ✅

---

## Data Persistence

### Django
- Data in database (permanent)
- Requires server request for every operation
- Slower but more secure

### React
- Data in component state (temporary)
- OR localStorage (semi-permanent, client-side)
- Fast but less secure
- Need API calls to persist to server

### Best Practice: Hybrid
```jsx
// React handles UI state (fast)
const [todos, setTodos] = useState([]);

// Save to Django API (persistent)
const saveTodo = async (todo) => {
    // Update local state immediately (optimistic update)
    setTodos([...todos, todo]);
    
    // Save to backend
    await fetch('/api/todos/', {
        method: 'POST',
        body: JSON.stringify(todo)
    });
};
```

**Result:** Fast UI + Persistent data! ✅