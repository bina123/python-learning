# DRF Authentication vs Laravel Sanctum/Passport

## Comparison Table

| Feature | Laravel Sanctum | DRF + JWT |
|---------|----------------|-----------|
| **Token Type** | Plain text tokens | JWT (JSON Web Tokens) |
| **Token Storage** | Database | No storage (stateless) |
| **Token Format** | Random string | Encoded JSON |
| **Expiration** | Manual | Automatic |
| **Refresh** | Issue new token | Refresh token flow |
| **Revocation** | Delete from DB | Blacklist (optional) |
| **SPA Support** | Cookie-based | Token-based |
| **Mobile Support** | Token-based | Token-based |
| **Stateful** | Yes | No (stateless) |

## Code Comparison

### Registration

**Laravel:**
```php
// app/Http/Controllers/AuthController.php
public function register(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:8|confirmed',
    ]);
    
    $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']),
    ]);
    
    $token = $user->createToken('auth_token')->plainTextToken;
    
    return response()->json([
        'user' => $user,
        'token' => $token,
    ]);
}
```

**Django:**
```python
# blog/auth_views.py
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        })
```

### Login

**Laravel:**
```php
public function login(Request $request)
{
    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
    
    $user = User::where('email', $request->email)->firstOrFail();
    $token = $user->createToken('auth_token')->plainTextToken;
    
    return response()->json(['token' => $token]);
}
```

**Django:**
```python
class LoginView(APIView):
    def post(self, request):
        user = authenticate(
            username=request.data['username'],
            password=request.data['password']
        )
        
        if not user:
            return Response({'error': 'Invalid credentials'}, 401)
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        })
```

### Protected Routes

**Laravel:**
```php
// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [UserController::class, 'profile']);
    Route::apiResource('posts', PostController::class);
});

// PostController.php
public function store(Request $request)
{
    $post = $request->user()->posts()->create($validated);
    return new PostResource($post);
}
```

**Django:**
```python
# blog/api_views.py
class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
```

### Permissions

**Laravel:**
```php
// app/Policies/PostPolicy.php
class PostPolicy
{
    public function update(User $user, Post $post)
    {
        return $user->id === $post->user_id;
    }
}

// PostController.php
public function update(Request $request, Post $post)
{
    $this->authorize('update', $post);
    $post->update($validated);
}
```

**Django:**
```python
# blog/permissions.py
class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user

# blog/api_views.py
class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthorOrReadOnly]
```

## Key Differences

### JWT vs API Tokens

**JWT (DRF):**
- Self-contained (contains user info)
- No database lookup needed
- Stateless
- Cannot revoke individual tokens easily
- Shorter expiration recommended

**API Tokens (Laravel Sanctum):**
- Stored in database
- Requires database lookup
- Stateful
- Easy to revoke (delete from DB)
- Can be long-lived

### Best Practices

**DRF + JWT:**
1. Short access token lifetime (15-60 min)
2. Longer refresh token lifetime (7 days)
3. Use HTTPS in production
4. Implement token blacklisting
5. Store refresh token securely

**Laravel Sanctum:**
1. Use SPA authentication for same-domain
2. Use API tokens for mobile/third-party
3. Implement token expiration
4. Revoke tokens on logout
5. Use abilities for fine-grained permissions