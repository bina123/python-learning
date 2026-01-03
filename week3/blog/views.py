# blog/views.py

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404
from django.views import View
from django.views.generic import ListView, DetailView
from .models import Post, Category, Comment

# Function-based views (FBV) - Simple approach

def home(request):
    """
    Home page view.
    Like Laravel: public function home(Request $request)
    """
    # Get latest 5 published posts
    latest_posts = Post.objects.filter(status='published').order_by('-created_at')[:5]
    
    # Count statistics
    total_posts = Post.objects.filter(status='published').count()
    total_categories = Category.objects.count()
    
    # Context is like Laravel's compact() or with()
    context = {
        'latest_posts': latest_posts,
        'total_posts': total_posts,
        'total_categories': total_categories,
    }
    
    # render() is like Laravel's view()
    return render(request, 'blog/home.html', context)

def post_list(request):
    """
    List all published posts.
    Like Laravel: Post::where('status', 'published')->get()
    """
    posts = Post.objects.filter(status='published').order_by('-created_at')
    categories = Category.objects.all()
    
    # Filter by category if provided
    category_slug = request.GET.get('category')  # Like Laravel's request()->query('category')
    if category_slug:
        posts = posts.filter(categories__slug=category_slug)
    
    context = {
        'posts': posts,
        'categories': categories,
        'selected_category': category_slug,
    }
    
    return render(request, 'blog/post_list.html', context)

def post_detail(request, slug):
    """
    Show single post.
    Like Laravel: Post::where('slug', $slug)->firstOrFail()
    
    Args:
        slug: URL parameter (like Laravel route parameter)
    """
    # Get post or return 404 (like Laravel's findOrFail)
    post = get_object_or_404(Post, slug=slug, status='published')
    
    # Increment views
    post.views += 1
    post.save()
    
    # Get comments for this post
    comments = post.comments.filter(is_approved=True).order_by('-created_at')
    
    # Get related posts (same categories)
    related_posts = Post.objects.filter(
        categories__in=post.categories.all(),
        status='published'
    ).exclude(id=post.id).distinct()[:3]
    
    context = {
        'post': post,
        'comments': comments,
        'related_posts': related_posts,
    }
    
    return render(request, 'blog/post_detail.html', context)

def category_posts(request, slug):
    """Show all posts in a category."""
    category = get_object_or_404(Category, slug=slug)
    posts = category.posts.filter(status='published').order_by('-created_at')
    
    context = {
        'category': category,
        'posts': posts,
    }
    
    return render(request, 'blog/category_posts.html', context)


# Class-based views (CBV) - More advanced, like Laravel Resource Controllers

class PostListView(ListView):
    """
    List view using class-based view.
    Like Laravel Resource Controller's index() method
    """
    model = Post
    template_name = 'blog/post_list_cbv.html'
    context_object_name = 'posts'  # Variable name in template
    paginate_by = 10  # Pagination (like Laravel's paginate(10))
    
    def get_queryset(self):
        """Filter queryset (like Laravel query scope)"""
        return Post.objects.filter(status='published').order_by('-created_at')
    
    def get_context_data(self, **kwargs):
        """Add extra context (like Laravel's with())"""
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        return context

class PostDetailView(DetailView):
    """
    Detail view using class-based view.
    Like Laravel Resource Controller's show() method
    """
    model = Post
    template_name = 'blog/post_detail_cbv.html'
    context_object_name = 'post'
    slug_field = 'slug'  # Field to use for lookup
    
    def get_queryset(self):
        """Only show published posts"""
        return Post.objects.filter(status='published')
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        # Get comments
        context['comments'] = self.object.comments.filter(
            is_approved=True
        ).order_by('-created_at')
        
        # Get related posts
        context['related_posts'] = Post.objects.filter(
            categories__in=self.object.categories.all(),
            status='published'
        ).exclude(id=self.object.id).distinct()[:3]
        
        return context


# API-style view (returning JSON)
from django.http import JsonResponse

def post_api(request, slug):
    """
    Return post as JSON.
    Like Laravel's response()->json()
    """
    post = get_object_or_404(Post, slug=slug, status='published')
    
    data = {
        'id': post.id,
        'title': post.title,
        'slug': post.slug,
        'content': post.content,
        'author': post.author.username,
        'created_at': post.created_at.isoformat(),
        'views': post.views,
        'categories': [cat.name for cat in post.categories.all()],
    }
    
    return JsonResponse(data)