# Django REST Framework vs Laravel API

## Basic Structure

### Laravel
```php
// routes/api.php
Route::apiResource('posts', PostController::class);

// app/Http/Controllers/PostController.php
class PostController extends Controller
{
    public function index()
    {
        return PostResource::collection(Post::all());
    }
    
    public function store(Request $request)
    {
        $post = Post::create($request->validated());
        return new PostResource($post);
    }
}

// app/Http/Resources/PostResource.php
class PostResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'author' => $this->author->name,
        ];
    }
}
```

### Django REST Framework
```python
# blog/api_urls.py
router = DefaultRouter()
router.register(r'posts', PostViewSet)

# blog/api_views.py
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# blog/serializers.py
class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'author']
```

## Comparison Table

| Feature | Laravel | DRF |
|---------|---------|-----|
| **Resources** | API Resources | Serializers |
| **Controllers** | API Controllers | ViewSets/APIViews |
| **Routing** | Route::apiResource() | router.register() |
| **Validation** | FormRequest | Serializer validation |
| **Pagination** | ->paginate(10) | Built-in PAGE_SIZE |
| **Filtering** | Query scopes | get_queryset() |
| **Authentication** | Sanctum/Passport | Token/Session Auth |
| **Permissions** | Gates/Policies | Permission Classes |
| **Transforming** | toArray() | to_representation() |
| **Nested Resources** | with() | Nested Serializers |

## Key Concepts

### Serializers = API Resources
- Transform models to JSON
- Handle validation
- Nested relationships

### ViewSets = Resource Controllers
- Single class for CRUD
- Auto-generates URLs
- Custom actions with @action

### Permissions = Policies
```python
# DRF
class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user

# Laravel
Gate::define('update-post', function ($user, $post) {
    return $user->id === $post->user_id;
});
```

## Common Patterns

### Nested Serializers (Like Eager Loading)
```python
# DRF
class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()  # Nested
    categories = CategorySerializer(many=True)

# Laravel
class PostResource extends JsonResource
{
    return [
        'author' => new UserResource($this->author),
        'categories' => CategoryResource::collection($this->categories),
    ];
}
```

### Custom Actions (Like Custom Routes)
```python
# DRF
@action(detail=True, methods=['post'])
def publish(self, request, pk=None):
    post = self.get_object()
    post.publish()
    return Response({'status': 'published'})

# Laravel
Route::post('posts/{post}/publish', [PostController::class, 'publish']);
```