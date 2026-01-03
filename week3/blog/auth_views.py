# blog/auth_views.py

"""
Authentication endpoints.
Like Laravel: AuthController
"""

from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers


# Serializers for authentication
class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    Like Laravel: RegisterRequest
    """
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm']
    
    def validate_username(self, value):
        """Validate username is unique."""
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Username already exists')
        
        if len(value) < 3:
            raise serializers.ValidationError('Username must be at least 3 characters')
        
        return value
    
    def validate_email(self, value):
        """Validate email is unique."""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already exists')
        return value
    
    def validate(self, data):
        """Validate passwords match."""
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({
                'password_confirm': 'Passwords do not match'
            })
        return data
    
    def create(self, validated_data):
        """Create user with hashed password."""
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    """User profile serializer."""
    posts_count = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'posts_count', 'date_joined']
        read_only_fields = ['date_joined']
    
    def get_posts_count(self, obj):
        return obj.posts.filter(status='published').count()


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for changing password."""
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=8)
    new_password_confirm = serializers.CharField(required=True)
    
    def validate(self, data):
        if data['new_password'] != data['new_password_confirm']:
            raise serializers.ValidationError({
                'new_password_confirm': 'Passwords do not match'
            })
        return data


# Views
class RegisterView(generics.CreateAPIView):
    """
    User registration endpoint.
    POST /api/auth/register/
    
    Like Laravel: RegisterController@register
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'User registered successfully',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """
    User login endpoint.
    POST /api/auth/login/
    
    Like Laravel: LoginController@login
    """
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({
                'error': 'Please provide both username and password'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Authenticate user
        user = authenticate(username=username, password=password)
        
        if user is None:
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        if not user.is_active:
            return Response({
                'error': 'Account is disabled'
            }, status=status.HTTP_403_FORBIDDEN)
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'Login successful',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        })


class LogoutView(APIView):
    """
    User logout endpoint.
    POST /api/auth/logout/
    
    Like Laravel: LogoutController@logout
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()  # Blacklist the refresh token
            
            return Response({
                'message': 'Logout successful'
            }, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(generics.RetrieveUpdateAPIView):
    """
    Get/Update user profile.
    GET/PUT /api/auth/profile/
    
    Like Laravel: ProfileController@show, @update
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        # Return current user
        return self.request.user


class ChangePasswordView(APIView):
    """
    Change password endpoint.
    POST /api/auth/change-password/
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        user = request.user
        
        # Check old password
        if not user.check_password(serializer.data['old_password']):
            return Response({
                'old_password': 'Incorrect password'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Set new password
        user.set_password(serializer.data['new_password'])
        user.save()
        
        return Response({
            'message': 'Password changed successfully'
        })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def test_token(request):
    """
    Test if token is valid.
    GET /api/auth/test-token/
    """
    return Response({
        'message': 'Token is valid!',
        'user': {
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
        }
    })