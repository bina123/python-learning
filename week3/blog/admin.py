# blog/admin.py

from django.contrib import admin
from .models import Category, Post, Comment

# Simple registration
# admin.site.register(Category)

# Advanced registration with customization
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'status', 'created_at', 'views']
    list_filter = ['status', 'created_at', 'categories']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'created_at'
    ordering = ['-created_at']
    filter_horizontal = ['categories']
    
    # Custom actions
    actions = ['make_published', 'make_draft']
    
    def make_published(self, request, queryset):
        queryset.update(status='published')
        self.message_user(request, f'{queryset.count()} posts published')
    make_published.short_description = 'Mark selected as published'
    
    def make_draft(self, request, queryset):
        queryset.update(status='draft')
        self.message_user(request, f'{queryset.count()} posts marked as draft')
    make_draft.short_description = 'Mark selected as draft'

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'post', 'created_at', 'is_approved']
    list_filter = ['is_approved', 'created_at']
    search_fields = ['author_name', 'content']
    actions = ['approve_comments']
    
    def approve_comments(self, request, queryset):
        queryset.update(is_approved=True)
        self.message_user(request, f'{queryset.count()} comments approved')
    approve_comments.short_description = 'Approve selected comments'