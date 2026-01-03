# blog/permissions.py

"""
Custom permissions for the blog app.
Like Laravel Gates and Policies.
"""

from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Custom permission: Only author can edit/delete.
    Like Laravel Policy: return $user->id === $post->user_id;
    
    - Read (GET): Anyone can read
    - Write (POST/PUT/DELETE): Only author can modify
    """
    
    message = 'You must be the author to modify this post.'
    
    def has_object_permission(self, request, view, obj):
        """
        Check permission on specific object.
        
        Args:
            request: HTTP request
            view: The view being accessed
            obj: The object (e.g., Post instance)
        """
        # Read permissions: allowed for all (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions: only author
        return obj.author == request.user


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Similar to IsAuthorOrReadOnly but uses 'owner' field.
    Generic permission for any model with 'owner' field.
    """
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Check if object has 'owner' attribute
        return hasattr(obj, 'owner') and obj.owner == request.user


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Admin can do anything, others can only read.
    Like Laravel: Gate::define('admin-only', fn($user) => $user->is_admin);
    """
    
    def has_permission(self, request, view):
        # Read: anyone
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write: only admins
        return request.user and request.user.is_staff


class IsCommentAuthorOrReadOnly(permissions.BasePermission):
    """
    Comment-specific permission.
    Only comment author or post author can modify comment.
    """
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Comment author can edit their own comment
        # Or post author can manage all comments on their post
        return (
            obj.author_email == request.user.email or
            obj.post.author == request.user
        )


class IsSelfOrReadOnly(permissions.BasePermission):
    """
    User can only edit their own profile.
    Like Laravel: $user->id === $profile->user_id
    """
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # User can only edit themselves
        return obj == request.user