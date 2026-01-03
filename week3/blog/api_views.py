# blog/api_views.py

"""
API Views using Django REST Framework.
Like Laravel API Controllers.
"""

from rest_framework import status, viewsets, generics, permissions
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.db.models import Count, Sum
from .permissions import IsAuthorOrReadOnly, IsAdminOrReadOnly

from .models import Category, Post, Comment
from .serializers import (
    CategorySerializer,
    PostListSerializer,
    PostDetailSerializer,
    PostWriteSerializer,
    CommentSerializer,
    StatsSerializer,
)


# Function-based API view (simple)
@api_view(['GET', 'POST'])
def hello_api(request):
    """
    Simple API endpoint.
    Like Laravel: Route::get('/api/hello', [ApiController::class, 'hello'])
    
    GET: Return greeting
    POST: Echo back data
    """
    if request.method == 'GET':
        return Response({
            'message': 'Hello from Django REST Framework!',
            'status': 'success',
            'user': str(request.user) if request.user.is_authenticated else 'Anonymous',
        })
    
    elif request.method == 'POST':
        # Echo back whatever was sent
        return Response({
            'message': 'Data received',
            'data': request.data,
        }, status=status.HTTP_201_CREATED)


# Class-based API view
class CategoryListCreateAPIView(generics.ListCreateAPIView):
    """
    List all categories or create new one.
    Like Laravel: CategoryController@index, CategoryController@store
    
    GET: List all categories
    POST: Create new category
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    
    def get_queryset(self):
        """Filter queryset (like Laravel query scopes)."""
        queryset = super().get_queryset()
        
        # Filter by search query if provided
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(name__icontains=search)
        
        return queryset.order_by('name')


class CategoryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a category.
    Like Laravel: CategoryController@show, @update, @destroy
    
    GET: Get single category
    PUT/PATCH: Update category
    DELETE: Delete category
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'  # Use slug instead of ID

    # ✅ ADD PERMISSION: Only admin can edit/delete
    permission_classes = [IsAdminOrReadOnly]

# ViewSet (combines list, create, retrieve, update, destroy)
class PostViewSet(viewsets.ModelViewSet):
    """
    CRUD for posts with permissions.
    """
    
    queryset = Post.objects.filter(status='published').select_related('author').prefetch_related('categories')
    lookup_field = 'slug'
    
    # ✅ ADD PERMISSION CLASSES
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    
    def get_serializer_class(self):
        """
        Use different serializers for different actions.
        Like Laravel: different Resources for list vs detail
        """
        if self.action == 'list':
            return PostListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return PostWriteSerializer
        return PostDetailSerializer
    
    def get_queryset(self):
        """
        Filter queryset based on query parameters.
        Like Laravel: apply query filters
        """
        queryset = super().get_queryset()
        
        # If user is authenticated, show their drafts too
        if self.request.user.is_authenticated:
            queryset = Post.objects.filter(
                author=self.request.user
            ) | queryset
            
        # Filter by category
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(categories__slug=category)
        
        # Search in title and content
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                title__icontains=search
            ) | queryset.filter(
                content__icontains=search
            )
        
        # Filter by author
        author = self.request.query_params.get('author', None)
        if author:
            queryset = queryset.filter(author__username=author)
        
        return queryset.distinct().order_by('-created_at')
    
    def perform_create(self, serializer):
        """
        Set author when creating post.
        Like Laravel: before save hook
        """
        serializer.save(author=self.request.user)
    
    # Custom action (like Laravel custom route)
    @action(detail=True, methods=['post'])
    def publish(self, request, slug=None, permission_classes=[permissions.IsAuthenticated, IsAuthorOrReadOnly]):
        """
        Custom endpoint to publish a post.
        POST /api/posts/{slug}/publish/
        """
        post = self.get_object()
        post.publish()
        
        serializer = self.get_serializer(post)
        return Response({
            'message': 'Post published successfully',
            'post': serializer.data
        })
        
    @action(detail=False, methods=['get'])
    def my_posts(self, request):
        """
        Get current user's posts.
        GET /api/posts/my_posts/
        """
        if not request.user.is_authenticated:
            return Response({
                'error': 'Authentication required'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        posts = Post.objects.filter(author=request.user).order_by('-created_at')
        serializer = PostListSerializer(posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def drafts(self, request):
        """
        Get current user's draft posts.
        GET /api/posts/drafts/
        """
        if not request.user.is_authenticated:
            return Response({
                'error': 'Authentication required'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        drafts = Post.objects.filter(
            author=request.user,
            status='draft'
        ).order_by('-created_at')
        
        serializer = PostListSerializer(drafts, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def comments(self, request, slug=None):
        """
        Get all comments for a post.
        GET /api/posts/{slug}/comments/
        """
        post = self.get_object()
        comments = post.comments.filter(is_approved=True).order_by('-created_at')
        
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def popular(self, request):
        """
        Get popular posts (most viewed).
        GET /api/posts/popular/
        """
        posts = self.get_queryset().order_by('-views')[:10]
        serializer = PostListSerializer(posts, many=True)
        return Response(serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    """
    CRUD for comments.
    """
    queryset = Comment.objects.all().select_related('post')
    serializer_class = CommentSerializer
    # ✅ ADD PERMISSION: Only admin can edit/delete
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        """Filter to show only approved comments."""
        queryset = super().get_queryset()
        
        # Show all comments if user is staff
        if self.request.user.is_staff:
            return queryset
        
        # Show only approved comments to others
        return queryset.filter(is_approved=True)
    
    def perform_create(self, serializer):
        """Comments start as unapproved."""
        serializer.save(is_approved=False)


# Custom API view for statistics
class StatsAPIView(APIView):
    """
    Get blog statistics.
    GET /api/stats/
    
    Like Laravel: custom controller method
    """
    
    def get(self, request):
        """Return various statistics."""
        # Calculate stats
        total_posts = Post.objects.count()
        total_published = Post.objects.filter(status='published').count()
        total_drafts = Post.objects.filter(status='draft').count()
        total_categories = Category.objects.count()
        total_comments = Comment.objects.filter(is_approved=True).count()
        total_views = Post.objects.aggregate(Sum('views'))['views__sum'] or 0
        
        # Most viewed post
        most_viewed = Post.objects.filter(status='published').order_by('-views').first()
        most_viewed_post = {
            'title': most_viewed.title if most_viewed else None,
            'views': most_viewed.views if most_viewed else 0,
        }
        
        # Recent posts
        recent_posts = Post.objects.filter(status='published').order_by('-created_at')[:5]
        
        # Build response data
        data = {
            'total_posts': total_posts,
            'total_published': total_published,
            'total_drafts': total_drafts,
            'total_categories': total_categories,
            'total_comments': total_comments,
            'total_views': total_views,
            'most_viewed_post': most_viewed_post,
            'recent_posts': PostListSerializer(recent_posts, many=True).data,
        }
        
        # Use serializer to validate structure
        serializer = StatsSerializer(data)
        
        return Response(serializer.data)


# Search API
@api_view(['GET'])
def search_api(request):
    """
    Search posts.
    GET /api/search/?q=django
    """
    query = request.query_params.get('q', '')
    
    if not query:
        return Response({
            'error': 'Please provide a search query (q parameter)'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Search in title and content
    posts = Post.objects.filter(
        status='published'
    ).filter(
        title__icontains=query
    ) | Post.objects.filter(
        status='published'
    ).filter(
        content__icontains=query
    )
    
    posts = posts.distinct()[:20]
    
    serializer = PostListSerializer(posts, many=True)
    
    return Response({
        'query': query,
        'count': posts.count(),
        'results': serializer.data
    })