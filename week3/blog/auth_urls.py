# blog/auth_urls.py

"""
Authentication URLs.
Like Laravel's routes/auth.php
"""

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import auth_views

urlpatterns = [
    # Registration & Login
    path('register/', auth_views.RegisterView.as_view(), name='register'),
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    
    # JWT Token endpoints
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    
    # Profile
    path('profile/', auth_views.ProfileView.as_view(), name='profile'),
    path('change-password/', auth_views.ChangePasswordView.as_view(), name='change-password'),
    
    # Test endpoint
    path('test-token/', auth_views.test_token, name='test-token'),
]