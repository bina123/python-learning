# blog/forms.py

from django import forms
from django.core.exceptions import ValidationError
from .models import Post, Comment, Category

# Simple Form (not tied to model)
# Like Laravel Form Request with manual fields
class ContactForm(forms.Form):
    """Contact form example."""
    
    name = forms.CharField(
        max_length=100,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Your name'
        })
    )
    
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'your@email.com'
        })
    )
    
    subject = forms.CharField(
        max_length=200,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Subject'
        })
    )
    
    message = forms.CharField(
        required=True,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'placeholder': 'Your message...',
            'rows': 5
        })
    )
    
    # Custom validation (like Laravel validation rules)
    def clean_name(self):
        """Validate name field."""
        name = self.cleaned_data.get('name')
        
        if len(name) < 3:
            raise ValidationError('Name must be at least 3 characters')
        
        if name.isdigit():
            raise ValidationError('Name cannot be only numbers')
        
        return name.title()  # Capitalize
    
    def clean_email(self):
        """Validate email field."""
        email = self.cleaned_data.get('email')
        
        # Check if email domain is allowed
        forbidden_domains = ['tempmail.com', 'throwaway.email']
        domain = email.split('@')[1] if '@' in email else ''
        
        if domain in forbidden_domains:
            raise ValidationError('This email domain is not allowed')
        
        return email.lower()


# ModelForm (tied to database model)
# Like Laravel with Eloquent + FormRequest combined
class CommentForm(forms.ModelForm):
    """
    Form for creating comments.
    Like Laravel: FormRequest + Eloquent Model
    """
    
    class Meta:
        model = Comment
        fields = ['author_name', 'author_email', 'content']
        
        # Customize widgets (HTML input types)
        widgets = {
            'author_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Your name'
            }),
            'author_email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'your@email.com'
            }),
            'content': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Write your comment...',
                'rows': 4
            }),
        }
        
        # Customize labels
        labels = {
            'author_name': 'Name',
            'author_email': 'Email',
            'content': 'Comment',
        }
        
        # Help text
        help_texts = {
            'author_email': 'Your email will not be published',
        }
    
    # Custom validation
    def clean_content(self):
        """Validate comment content."""
        content = self.cleaned_data.get('content')
        
        if len(content) < 10:
            raise ValidationError('Comment must be at least 10 characters')
        
        # Check for spam words
        spam_words = ['viagra', 'casino', 'lottery']
        if any(word in content.lower() for word in spam_words):
            raise ValidationError('Your comment appears to be spam')
        
        return content


class PostForm(forms.ModelForm):
    """
    Form for creating/editing posts.
    Like Laravel: PostRequest with validation rules
    """
    
    class Meta:
        model = Post
        fields = ['title', 'slug', 'content', 'excerpt', 'categories', 'status']
        
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Post title'
            }),
            'slug': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'post-slug'
            }),
            'content': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 10,
                'placeholder': 'Write your post content...'
            }),
            'excerpt': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Short excerpt...'
            }),
            'categories': forms.CheckboxSelectMultiple(),
            'status': forms.Select(attrs={
                'class': 'form-control'
            }),
        }
    
    def clean_slug(self):
        """Validate slug is unique."""
        slug = self.cleaned_data.get('slug')
        
        # Check if slug exists (excluding current post if editing)
        qs = Post.objects.filter(slug=slug)
        if self.instance and self.instance.pk:
            qs = qs.exclude(pk=self.instance.pk)
        
        if qs.exists():
            raise ValidationError('This slug is already taken')
        
        return slug
    
    def clean(self):
        """
        Validate multiple fields together.
        Like Laravel: validate() method with multiple rules
        """
        cleaned_data = super().clean()
        
        title = cleaned_data.get('title')
        content = cleaned_data.get('content')
        
        # Ensure content is longer than title
        if title and content:
            if len(content) < len(title):
                raise ValidationError('Content must be longer than title')
        
        return cleaned_data


# Form with file upload
class PostImageForm(forms.Form):
    """Form for uploading post images."""
    
    image = forms.ImageField(
        required=True,
        help_text='Max size: 5MB',
        widget=forms.FileInput(attrs={
            'class': 'form-control',
            'accept': 'image/*'
        })
    )
    
    caption = forms.CharField(
        max_length=200,
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Image caption (optional)'
        })
    )
    
    def clean_image(self):
        """Validate image size and type."""
        image = self.cleaned_data.get('image')
        
        if image:
            # Check file size (5MB max)
            if image.size > 5 * 1024 * 1024:
                raise ValidationError('Image size must be less than 5MB')
            
            # Check file type
            allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
            if image.content_type not in allowed_types:
                raise ValidationError('Only JPEG, PNG, GIF, and WebP images are allowed')
        
        return image


# Search Form
class SearchForm(forms.Form):
    """Search form."""
    
    query = forms.CharField(
        max_length=200,
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Search posts...',
            'type': 'search'
        })
    )
    
    category = forms.ModelChoiceField(
        queryset=Category.objects.all(),
        required=False,
        empty_label='All Categories',
        widget=forms.Select(attrs={
            'class': 'form-control'
        })
    )
    
    status = forms.ChoiceField(
        choices=[('', 'All'), ('published', 'Published'), ('draft', 'Draft')],
        required=False,
        widget=forms.Select(attrs={
            'class': 'form-control'
        })
    )