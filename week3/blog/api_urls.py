# blog/api_urls.py

"""
API URLs for the blog app.
Like Laravel's routes/api.php
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import api_views

# Router for ViewSets (auto-generates URLs)
# Like Laravel's Route::apiResource()
router = DefaultRouter()
router.register(r'posts', api_views.PostViewSet, basename='post')
router.register(r'comments', api_views.CommentViewSet, basename='comment')

# URL patterns
urlpatterns = [
    # Simple function-based view
    path('hello/', api_views.hello_api, name='hello-api'),
    
    # Categories (class-based views)
    path('categories/', api_views.CategoryListCreateAPIView.as_view(), name='category-list'),
    path('categories/<slug:slug>/', api_views.CategoryDetailAPIView.as_view(), name='category-detail'),
    
    # Custom endpoints
    path('stats/', api_views.StatsAPIView.as_view(), name='stats'),
    path('search/', api_views.search_api, name='search'),
    
    # Include router URLs (posts and comments)
    # This generates:
    # - /api/posts/
    # - /api/posts/{slug}/
    # - /api/posts/{slug}/publish/
    # - /api/posts/{slug}/comments/
    # - /api/posts/popular/
    # - /api/comments/
    # - /api/comments/{id}/
    path('', include(router.urls)),
]