# blog/models.py

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# This is like Laravel Eloquent Model!
class Category(models.Model):
    """Blog category."""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']
    
    def __str__(self):
        """Like Laravel's __toString()"""
        return self.name

class Post(models.Model):
    """Blog post model."""
    
    # Status choices (like Laravel enum)
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]
    
    # Fields (like Laravel migrations!)
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    excerpt = models.TextField(max_length=500, blank=True)
    
    # ForeignKey = belongsTo in Laravel
    author = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='posts'
    )
    
    # ManyToMany = belongsToMany in Laravel
    categories = models.ManyToManyField(Category, related_name='posts')
    
    status = models.CharField(
        max_length=10, 
        choices=STATUS_CHOICES, 
        default='draft'
    )
    
    # Timestamps (like Laravel's timestamps!)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)
    
    # Views count
    views = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
        ]
    
    def __str__(self):
        return self.title
    
    def publish(self):
        """Publish the post."""
        self.status = 'published'
        self.published_at = timezone.now()
        self.save()
    
    @property
    def is_published(self):
        """Check if post is published."""
        return self.status == 'published'

class Comment(models.Model):
    """Blog comment."""
    
    # ForeignKey to Post
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    
    author_name = models.CharField(max_length=100)
    author_email = models.EmailField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f'Comment by {self.author_name} on {self.post.title}'