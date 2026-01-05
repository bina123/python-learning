# Routing Comparison

## Laravel Routes
```php
// routes/web.php
Route::get('/', [HomeController::class, 'index']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{slug}', [PostController::class, 'show']);
```

## Django URLs
```python
# urls.py
urlpatterns = [
    path('', views.home, name='home'),
    path('posts/', views.post_list, name='posts'),
    path('posts/<slug:slug>/', views.post_detail, name='post-detail'),
]
```

## React Router
```jsx
// App.jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/posts" element={<PostsPage />} />
  <Route path="/posts/:slug" element={<PostDetailPage />} />
</Routes>
```

## Key Differences

| Feature | Laravel/Django | React Router |
|---------|----------------|--------------|
| **Type** | Server-side | Client-side |
| **Reload** | Full page | No reload |
| **SEO** | Excellent | Needs SSR |
| **Speed** | Slower | Instant |
| **Backend** | Required | Optional |

## Best Practice: Hybrid

Use both for best results:
- Django: API routes (`/api/*`)
- React Router: Frontend routes (`/*`)