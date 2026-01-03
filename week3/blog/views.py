# blog/views.py

from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, Http404
from django.views import View
from django.views.generic import ListView, DetailView
from .models import Post, Category, Comment
from django.contrib import messages
from django.urls import reverse
from .forms import CommentForm, ContactForm, PostForm

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

def contact(request):
    """
    Contact form view.
    Like Laravel: ContactController@store
    """
    if request.method == 'POST':
        # Form submitted (like Laravel's if ($request->isMethod('post')))
        form = ContactForm(request.POST)
        
        if form.is_valid():
            # Form is valid (like Laravel's $request->validate())
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            
            # Process form (send email, save to DB, etc.)
            # For now, just show success message
            messages.success(
                request, 
                f'Thank you {name}! Your message has been sent.'
            )
            
            # Redirect (like Laravel's redirect()->route())
            return redirect('blog:contact')
    else:
        # GET request - show empty form
        form = ContactForm()
    
    return render(request, 'blog/contact.html', {'form': form})


def post_create(request):
    """
    Create new post.
    Like Laravel: PostController@store
    """
    # Check if user is authenticated (we'll add proper auth later)
    if not request.user.is_authenticated:
        messages.error(request, 'Please login to create posts')
        return redirect('blog:home')
    
    if request.method == 'POST':
        form = PostForm(request.POST)
        
        if form.is_valid():
            # Save form but don't commit yet (like Laravel's make())
            post = form.save(commit=False)
            
            # Set author to current user
            post.author = request.user
            
            # Now save to database
            post.save()
            
            # Save many-to-many relationships (categories)
            form.save_m2m()
            
            messages.success(request, f'Post "{post.title}" created successfully!')
            return redirect('blog:post_detail', slug=post.slug)
    else:
        form = PostForm()
    
    return render(request, 'blog/post_create.html', {'form': form})


def post_edit(request, slug):
    """
    Edit existing post.
    Like Laravel: PostController@update
    """
    post = get_object_or_404(Post, slug=slug)
    
    # Check if user owns this post
    if post.author != request.user:
        messages.error(request, 'You can only edit your own posts')
        return redirect('blog:post_detail', slug=slug)
    
    if request.method == 'POST':
        # Pass instance to update existing post
        form = PostForm(request.POST, instance=post)
        
        if form.is_valid():
            form.save()
            messages.success(request, f'Post "{post.title}" updated successfully!')
            return redirect('blog:post_detail', slug=post.slug)
    else:
        # Pre-fill form with existing data
        form = PostForm(instance=post)
    
    context = {
        'form': form,
        'post': post,
        'editing': True
    }
    return render(request, 'blog/post_create.html', context)


def post_delete(request, slug):
    """
    Delete post.
    Like Laravel: PostController@destroy
    """
    post = get_object_or_404(Post, slug=slug)
    
    # Check if user owns this post
    if post.author != request.user:
        messages.error(request, 'You can only delete your own posts')
        return redirect('blog:post_detail', slug=slug)
    
    if request.method == 'POST':
        title = post.title
        post.delete()
        messages.success(request, f'Post "{title}" deleted successfully!')
        return redirect('blog:post_list')
    
    return render(request, 'blog/post_delete.html', {'post': post})


def add_comment(request, slug):
    """
    Add comment to post.
    Like Laravel: CommentController@store
    """
    post = get_object_or_404(Post, slug=slug, status='published')
    
    if request.method == 'POST':
        form = CommentForm(request.POST)
        
        if form.is_valid():
            # Create comment but don't save yet
            comment = form.save(commit=False)
            
            # Set the post
            comment.post = post
            
            # Comments need approval by default
            comment.is_approved = False
            
            # Save to database
            comment.save()
            
            messages.success(
                request, 
                'Your comment has been submitted and is awaiting approval!'
            )
            return redirect('blog:post_detail', slug=slug)
    else:
        form = CommentForm()
    
    context = {
        'form': form,
        'post': post
    }
    return render(request, 'blog/add_comment.html', context)