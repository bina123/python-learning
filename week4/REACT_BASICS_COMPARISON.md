# React Basics vs Django Templates

## Displaying a List

### Django Templates
```django
{% for user in users %}
  <div class="user-card">
    <h3>{{ user.name }}</h3>
    <p>{{ user.role }}</p>
  </div>
{% endfor %}
```

### React
```jsx
{users.map((user, index) => (
  <div key={index} className="user-card">
    <h3>{user.name}</h3>
    <p>{user.role}</p>
  </div>
))}
```

**Similar!** But React uses `.map()` instead of `{% for %}`

---

## Conditional Rendering

### Django Templates
```django
{% if user.is_active %}
  <span>Active</span>
{% else %}
  <span>Inactive</span>
{% endif %}
```

### React
```jsx
{user.isActive ? (
  <span>Active</span>
) : (
  <span>Inactive</span>
)}

// Or
{user.isActive && <span>Active</span>}
```

---

## Variables

### Django Templates
```django
<h1>Hello {{ name }}!</h1>
<p>Age: {{ age }}</p>
```

### React
```jsx
<h1>Hello {name}!</h1>
<p>Age: {age}</p>
```

**Almost identical!** Just single braces `{}` instead of double `{{}}`

---

## Components (Reusable Pieces)

### Django Templates
```django
{# partials/button.html #}
<button class="{{ variant }}">{{ text }}</button>

{# main template #}
{% include 'partials/button.html' with variant='primary' text='Click me' %}
```

### React
```jsx
// Button.jsx
function Button({ variant, text }) {
  return <button className={variant}>{text}</button>;
}

// App.jsx
<Button variant="primary" text="Click me" />
```

**React is cleaner!** Props feel more natural than `{% include %}`

---

## Key Differences

| Feature | Django Templates | React |
|---------|------------------|-------|
| **Loops** | `{% for %}` | `.map()` |
| **Conditionals** | `{% if %}` | `{condition ? A : B}` |
| **Variables** | `{{ var }}` | `{var}` |
| **Components** | `{% include %}` | `<Component />` |
| **State** | Server-side | Client-side |
| **Updates** | Page reload | Automatic re-render |