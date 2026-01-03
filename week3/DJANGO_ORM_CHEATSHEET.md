# Django ORM vs Laravel Eloquent

| Laravel Eloquent | Django ORM | Example |
|------------------|------------|---------|
| `Post::all()` | `Post.objects.all()` | Get all |
| `Post::find($id)` | `Post.objects.get(id=1)` | Find by ID |
| `Post::findOrFail($id)` | `get_object_or_404(Post, id=1)` | Find or 404 |
| `Post::where('status', 'published')` | `Post.objects.filter(status='published')` | Filter |
| `Post::whereNot('status', 'draft')` | `Post.objects.exclude(status='draft')` | Exclude |
| `Post::orderBy('created_at', 'desc')` | `Post.objects.order_by('-created_at')` | Order |
| `Post::take(5)` | `Post.objects.all()[:5]` | Limit |
| `Post::count()` | `Post.objects.count()` | Count |
| `Post::exists()` | `Post.objects.exists()` | Check exists |
| `Post::first()` | `Post.objects.first()` | First record |
| `$post->save()` | `post.save()` | Save |
| `$post->delete()` | `post.delete()` | Delete |
| `Post::create([...])` | `Post.objects.create(...)` | Create |
| `$post->update([...])` | `post.save()` after changing | Update |
| `with('author')` | `select_related('author')` | Eager load (1-to-1, ForeignKey) |
| `with('tags')` | `prefetch_related('tags')` | Eager load (Many-to-Many) |
| `whereHas('comments')` | `filter(comments__isnull=False)` | Has relationship |

## Field Lookups (Django specific)
```python
# Exact match
Post.objects.filter(title__exact='Hello')

# Case-insensitive
Post.objects.filter(title__iexact='hello')

# Contains
Post.objects.filter(title__contains='Django')

# Starts with / Ends with
Post.objects.filter(title__startswith='My')
Post.objects.filter(title__endswith='Post')

# Greater than / Less than
Post.objects.filter(views__gt=100)  # >
Post.objects.filter(views__gte=100) # >=
Post.objects.filter(views__lt=100)  # 
Post.objects.filter(views__lte=100) # <=

# In list
Post.objects.filter(status__in=['published', 'draft'])

# Date queries
Post.objects.filter(created_at__year=2026)
Post.objects.filter(created_at__month=1)
Post.objects.filter(created_at__day=9)

# Relationship queries
Post.objects.filter(author__username='bina')
Post.objects.filter(categories__slug='python')
```