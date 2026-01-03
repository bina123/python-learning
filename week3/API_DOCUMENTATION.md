# Blog API Documentation

Base URL: `http://127.0.0.1:8000/api/`

## Authentication

Currently using session authentication. Login at `/api-auth/login/`

## Endpoints

### Posts

#### List Posts
```
GET /api/posts/
```

**Query Parameters:**
- `category` - Filter by category slug
- `search` - Search in title/content
- `author` - Filter by author username
- `page` - Page number (default: 1)

**Response:**
```json
{
  "count": 10,
  "next": "http://127.0.0.1:8000/api/posts/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "My First Post",
      "slug": "my-first-post",
      "excerpt": "This is a post...",
      "author": "admin",
      "categories": ["Python", "Django"],
      "status": "published",
      "views": 42,
      "created_at": "2026-01-09T10:00:00Z"
    }
  ]
}
```

#### Get Single Post
```
GET /api/posts/{slug}/
```

**Response:**
```json
{
  "id": 1,
  "title": "My First Post",
  "slug": "my-first-post",
  "content": "Full post content...",
  "excerpt": "Short excerpt...",
  "author": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "posts_count": 5
  },
  "categories": [...],
  "status": "published",
  "views": 42,
  "comments_count": 3,
  "reading_time": 5,
  "comments": [...],
  "created_at": "2026-01-09T10:00:00Z",
  "updated_at": "2026-01-09T12:00:00Z"
}
```

#### Create Post
```
POST /api/posts/
```

**Body:**
```json
{
  "title": "New Post",
  "slug": "new-post",
  "content": "Post content here...",
  "excerpt": "Short summary",
  "category_ids": [1, 2],
  "status": "draft"
}
```

#### Update Post
```
PUT /api/posts/{slug}/
PATCH /api/posts/{slug}/  (partial update)
```

#### Delete Post
```
DELETE /api/posts/{slug}/
```

#### Popular Posts
```
GET /api/posts/popular/
```

#### Post Comments
```
GET /api/posts/{slug}/comments/
```

#### Publish Post
```
POST /api/posts/{slug}/publish/
```

### Categories

#### List Categories
```
GET /api/categories/
```

#### Get Category
```
GET /api/categories/{slug}/
```

#### Create Category
```
POST /api/categories/
```

**Body:**
```json
{
  "name": "Python",
  "slug": "python"
}
```

### Comments

#### List Comments
```
GET /api/comments/
```

#### Create Comment
```
POST /api/comments/
```

**Body:**
```json
{
  "post": 1,
  "author_name": "John Doe",
  "author_email": "john@example.com",
  "content": "Great post!"
}
```

### Statistics

#### Get Stats
```
GET /api/stats/
```

**Response:**
```json
{
  "total_posts": 15,
  "total_published": 12,
  "total_drafts": 3,
  "total_categories": 5,
  "total_comments": 48,
  "total_views": 1250,
  "most_viewed_post": {
    "title": "Django Tutorial",
    "views": 250
  },
  "recent_posts": [...]
}
```

### Search

#### Search Posts
```
GET /api/search/?q={query}
```

**Response:**
```json
{
  "query": "django",
  "count": 5,
  "results": [...]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "field_name": ["Error message"]
}
```

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

## Rate Limiting

Currently no rate limiting. Will be added in production.