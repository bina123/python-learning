# blog/dashboard_urls.py

from django.urls import path
from . import dashboard_views

app_name = 'dashboard'

urlpatterns = [
    path('', dashboard_views.dashboard_home, name='home'),
    path('posts/', dashboard_views.dashboard_posts, name='posts'),
    path('posts/create/', dashboard_views.dashboard_post_create, name='post_create'),
    path('posts/<slug:slug>/edit/', dashboard_views.dashboard_post_edit, name='post_edit'),
    path('posts/<slug:slug>/delete/', dashboard_views.dashboard_post_delete, name='post_delete'),
    path('comments/', dashboard_views.dashboard_comments, name='comments'),
    path('comments/<int:pk>/approve/', dashboard_views.dashboard_comment_approve, name='comment_approve'),
    path('comments/<int:pk>/delete/', dashboard_views.dashboard_comment_delete, name='comment_delete'),
]