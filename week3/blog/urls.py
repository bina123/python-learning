# blog/urls.py

from django.urls import path
from . import views

# This is like Laravel's Route::prefix('blog')->group()
app_name = 'blog'  # Namespace (used in templates)

urlpatterns = [
    # Function-based views
    # Like: Route::get('/', [HomeController::class, 'index'])
    path('', views.home, name='home'),
    
    # Like: Route::get('/posts', [PostController::class, 'index'])
    path('posts/', views.post_list, name='post_list'),
    
    # Like: Route::get('/posts/{slug}', [PostController::class, 'show'])
    path('posts/<slug:slug>/', views.post_detail, name='post_detail'),
    
    # Like: Route::get('/category/{slug}', [CategoryController::class, 'show'])
    path('category/<slug:slug>/', views.category_posts, name='category_posts'),
    
    # NEW: Form URLs
    path('contact/', views.contact, name='contact'),
    path('create/', views.post_create, name='post_create'),
    path('posts/<slug:slug>/edit/', views.post_edit, name='post_edit'),
    path('posts/<slug:slug>/delete/', views.post_delete, name='post_delete'),
    path('posts/<slug:slug>/comment/', views.add_comment, name='add_comment'),
    
    # Class-based views
    path('cbv/posts/', views.PostListView.as_view(), name='post_list_cbv'),
    path('cbv/posts/<slug:slug>/', views.PostDetailView.as_view(), name='post_detail_cbv'),
    
    # API endpoint
    path('api/posts/<slug:slug>/', views.post_api, name='post_api'),
]