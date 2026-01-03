# blog/serializers.py

"""
Serializers are like Laravel API Resources.
They convert Django models to JSON and vice versa.
"""

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Post, Comment

# Simple Serializer (not tied to model)
class HelloSerializer(serializers.Serializer):
    """Simple serializer example."""
    name = serializers.CharField(max_length=100)
    message = serializers.CharField()
    created_at = serializers.DateTimeField(read_only=True)


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    """
    User serializer.
    Like Laravel: UserResource
    """
    
    # Add computed field
    posts_count = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'posts_count']
        # Exclude password for security!
    
    def get_posts_count(self, obj):
        """Get number of posts by this user."""
        return obj.posts.filter(status='published').count()


# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    """
    Category serializer.
    Like Laravel: CategoryResource
    """
    
    # Add computed field - post count
    posts_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'created_at', 'posts_count']
        read_only_fields = ['created_at']
    
    def get_posts_count(self, obj):
        """Count posts in this category."""
        return obj.posts.filter(status='published').count()


# Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
    """
    Comment serializer.
    Like Laravel: CommentResource
    """
    
    # Show post title instead of just ID
    post_title = serializers.CharField(source='post.title', read_only=True)
    
    class Meta:
        model = Comment
        fields = [
            'id', 
            'post', 
            'post_title',
            'author_name', 
            'author_email', 
            'content',
            'is_approved',
            'created_at'
        ]
        read_only_fields = ['created_at', 'is_approved']
    
    # Validation (like Laravel validation rules)
    def validate_content(self, value):
        """Validate comment content."""
        if len(value) < 10:
            raise serializers.ValidationError('Comment must be at least 10 characters')
        
        # Check for spam
        spam_words = ['viagra', 'casino', 'lottery']
        if any(word in value.lower() for word in spam_words):
            raise serializers.ValidationError('Comment appears to be spam')
        
        return value


# Post List Serializer (minimal fields for list view)
class PostListSerializer(serializers.ModelSerializer):
    """
    Minimal post serializer for list views.
    Like Laravel: PostCollection with minimal fields
    """
    
    author = serializers.StringRelatedField()  # Show username instead of ID
    categories = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'slug',
            'excerpt',
            'author',
            'categories',
            'status',
            'views',
            'created_at',
        ]


# Post Detail Serializer (all fields)
class PostDetailSerializer(serializers.ModelSerializer):
    """
    Full post serializer for detail views.
    Like Laravel: new PostResource($post)
    """
    
    # Nested serializers
    author = UserSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    
    # Add category IDs for write operations
    category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        many=True,
        write_only=True,
        source='categories'
    )
    
    # Computed fields
    comments_count = serializers.SerializerMethodField()
    reading_time = serializers.SerializerMethodField()
    
    # Include recent comments
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'slug',
            'content',
            'excerpt',
            'author',
            'categories',
            'category_ids',
            'status',
            'views',
            'comments_count',
            'reading_time',
            'comments',
            'created_at',
            'updated_at',
            'published_at',
        ]
        read_only_fields = ['created_at', 'updated_at', 'views']
    
    def get_comments_count(self, obj):
        """Count approved comments."""
        return obj.comments.filter(is_approved=True).count()
    
    def get_reading_time(self, obj):
        """Estimate reading time in minutes."""
        words = len(obj.content.split())
        minutes = words // 200  # Average reading speed
        return max(1, minutes)  # Minimum 1 minute
    
    # Validation
    def validate_slug(self, value):
        """Ensure slug is unique."""
        # Get current instance (for updates)
        instance = getattr(self, 'instance', None)
        
        # Check if slug exists
        qs = Post.objects.filter(slug=value)
        if instance:
            qs = qs.exclude(pk=instance.pk)
        
        if qs.exists():
            raise serializers.ValidationError('This slug is already taken')
        
        return value
    
    def validate(self, data):
        """
        Validate multiple fields together.
        Like Laravel: validate() with multiple rules
        """
        title = data.get('title', '')
        content = data.get('content', '')
        
        if title and content:
            if len(content) < len(title):
                raise serializers.ValidationError({
                    'content': 'Content must be longer than title'
                })
        
        return data


# Post Create/Update Serializer
class PostWriteSerializer(serializers.ModelSerializer):
    """
    Serializer for creating/updating posts.
    Like Laravel: StorePostRequest
    """
    
    category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        many=True,
        source='categories'
    )
    
    class Meta:
        model = Post
        fields = [
            'title',
            'slug',
            'content',
            'excerpt',
            'category_ids',
            'status',
        ]
    
    def create(self, validated_data):
        """Create post with author."""
        # Extract categories
        categories = validated_data.pop('categories', [])
        
        # Get author from context (set in view)
        author = self.context['request'].user
        
        # Create post
        post = Post.objects.create(author=author, **validated_data)
        
        # Set categories
        post.categories.set(categories)
        
        return post
    
    def update(self, instance, validated_data):
        """Update post."""
        # Extract categories
        categories = validated_data.pop('categories', None)
        
        # Update fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update categories if provided
        if categories is not None:
            instance.categories.set(categories)
        
        return instance


# Statistics Serializer (custom data)
class StatsSerializer(serializers.Serializer):
    """
    Custom serializer for statistics.
    Not tied to a model.
    """
    total_posts = serializers.IntegerField()
    total_published = serializers.IntegerField()
    total_drafts = serializers.IntegerField()
    total_categories = serializers.IntegerField()
    total_comments = serializers.IntegerField()
    total_views = serializers.IntegerField()
    most_viewed_post = serializers.DictField()
    recent_posts = PostListSerializer(many=True)