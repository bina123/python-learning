# blog/dashboard_views.py

"""
Dashboard views using Django templates.
Like Laravel admin panel.
"""

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Count, Sum
from .models import Post, Category, Comment
from .forms import PostForm

@login_required
def dashboard_home(request):
    """
    Dashboard home page.
    Like Laravel: DashboardController@index
    """
    # Get statistics
    total_posts = Post.objects.filter(author=request.user).count()
    published_posts = Post.objects.filter(author=request.user, status='published').count()
    draft_posts = Post.objects.filter(author=request.user, status='draft').count()
    total_views = Post.objects.filter(author=request.user).aggregate(Sum('views'))['views__sum'] or 0
    
    # Recent posts
    recent_posts = Post.objects.filter(author=request.user).order_by('-created_at')[:5]
    
    # Recent comments on user's posts
    recent_comments = Comment.objects.filter(
        post__author=request.user,
        is_approved=True
    ).order_by('-created_at')[:5]
    
    context = {
        'total_posts': total_posts,
        'published_posts': published_posts,
        'draft_posts': draft_posts,
        'total_views': total_views,
        'recent_posts': recent_posts,
        'recent_comments': recent_comments,
    }
    
    return render(request, 'dashboard/home.html', context)


@login_required
def dashboard_posts(request):
    """
    List all user's posts.
    Like Laravel: PostController@index with auth
    """
    posts = Post.objects.filter(author=request.user).order_by('-created_at')
    
    # Filter by status if provided
    status_filter = request.GET.get('status')
    if status_filter:
        posts = posts.filter(status=status_filter)
    
    context = {
        'posts': posts,
        'status_filter': status_filter,
    }
    
    return render(request, 'dashboard/posts.html', context)


@login_required
def dashboard_post_create(request):
    """
    Create new post (template version).
    Like Laravel: PostController@store
    """
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            form.save_m2m()  # Save many-to-many relationships
            
            messages.success(request, f'Post "{post.title}" created successfully!')
            return redirect('dashboard:posts')
    else:
        form = PostForm()
    
    return render(request, 'dashboard/post_form.html', {
        'form': form,
        'action': 'Create',
    })


@login_required
def dashboard_post_edit(request, slug):
    """
    Edit existing post.
    Like Laravel: PostController@update
    """
    post = get_object_or_404(Post, slug=slug, author=request.user)
    
    if request.method == 'POST':
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            form.save()
            messages.success(request, f'Post "{post.title}" updated successfully!')
            return redirect('dashboard:posts')
    else:
        form = PostForm(instance=post)
    
    return render(request, 'dashboard/post_form.html', {
        'form': form,
        'post': post,
        'action': 'Edit',
    })


@login_required
def dashboard_post_delete(request, slug):
    """
    Delete post.
    Like Laravel: PostController@destroy
    """
    post = get_object_or_404(Post, slug=slug, author=request.user)
    
    if request.method == 'POST':
        title = post.title
        post.delete()
        messages.success(request, f'Post "{title}" deleted successfully!')
        return redirect('dashboard:posts')
    
    return render(request, 'dashboard/post_delete.html', {'post': post})


@login_required
def dashboard_comments(request):
    """
    Manage comments on user's posts.
    """
    comments = Comment.objects.filter(
        post__author=request.user
    ).order_by('-created_at')
    
    context = {
        'comments': comments,
    }
    
    return render(request, 'dashboard/comments.html', context)


@login_required
def dashboard_comment_approve(request, pk):
    """Approve a comment."""
    comment = get_object_or_404(Comment, pk=pk, post__author=request.user)
    comment.is_approved = True
    comment.save()
    messages.success(request, 'Comment approved!')
    return redirect('dashboard:comments')


@login_required
def dashboard_comment_delete(request, pk):
    """Delete a comment."""
    comment = get_object_or_404(Comment, pk=pk, post__author=request.user)
    comment.delete()
    messages.success(request, 'Comment deleted!')
    return redirect('dashboard:comments')