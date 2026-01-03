# Django Forms vs Laravel Form Validation

## Basic Form Handling

### Laravel
```php
// Laravel FormRequest
class StorePostRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => 'required|max:200',
            'content' => 'required|min:10',
            'email' => 'required|email',
        ];
    }
    
    public function messages()
    {
        return [
            'title.required' => 'Please enter a title',
        ];
    }
}

// Controller
public function store(StorePostRequest $request)
{
    $validated = $request->validated();
    Post::create($validated);
}
```

### Django
```python
# Django Form
class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content']
    
    def clean_title(self):
        title = self.cleaned_data.get('title')
        if len(title) > 200:
            raise ValidationError('Title too long')
        return title
    
    def clean_content(self):
        content = self.cleaned_data.get('content')
        if len(content) < 10:
            raise ValidationError('Content too short')
        return content

# View
def post_create(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            form.save()
```

## Common Validations

| Laravel | Django | Purpose |
|---------|--------|---------|
| `required` | `required=True` | Field required |
| `email` | `EmailField` | Email validation |
| `max:200` | `max_length=200` | Max length |
| `min:10` | Custom `clean_field()` | Min length |
| `unique:posts,slug` | `unique=True` in model | Unique field |
| `in:draft,published` | `choices=[...]` | In list |
| `confirmed` | Custom validation | Password confirm |
| `image` | `ImageField` | Image file |
| `mimes:jpg,png` | Custom `clean_field()` | File types |

## Form Rendering

### Laravel Blade
```blade
<form method="POST">
    @csrf
    <input type="text" name="title" value="{{ old('title') }}">
    @error('title')
        <div>{{ $message }}</div>
    @enderror
</form>
```

### Django Template
```django
<form method="post">
    {% csrf_token %}
    {{ form.title }}
    {% if form.title.errors %}
        <div>{{ form.title.errors }}</div>
    {% endif %}
</form>
```

## Auto-Rendering

### Laravel
```blade
<!-- No built-in auto-render -->
```

### Django
```django
<form method="post">
    {% csrf_token %}
    {{ form.as_p }}           {# As paragraphs #}
    {{ form.as_table }}       {# As table #}
    {{ form.as_ul }}          {# As list #}
    <button>Submit</button>
</form>
```

## Flash Messages

### Laravel
```php
return redirect()->back()->with('success', 'Post created!');

// Blade
@if(session('success'))
    <div>{{ session('success') }}</div>
@endif
```

### Django
```python
from django.contrib import messages

messages.success(request, 'Post created!')
return redirect('blog:home')

# Template
{% if messages %}
    {% for message in messages %}
        <div>{{ message }}</div>
    {% endfor %}
{% endif %}
```