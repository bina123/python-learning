// src/components/PostsPage.jsx
import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';

function PostsPage() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedQuery = useDebounce(searchQuery, 500);
    // ✅ Use custom hook for categories
    const { data: categories } = useFetch('http://127.0.0.1:8000/api/categories/');

    // Debounce search query
    useEffect(() => {
        if (debouncedQuery) {
            console.log('Searching for:', debouncedQuery);
        }
    }, [debouncedQuery]);

    // Build URL with filters
    const params = new URLSearchParams();
    if (selectedCategory) params.append('category', selectedCategory);
    if (debouncedQuery) params.append('search', debouncedQuery);
    const postsUrl = `http://127.0.0.1:8000/api/posts/?${params}`;

    // ✅ Use custom hook for posts
    const { data: posts, loading, error } = useFetch(postsUrl);

    return (
        <div>
            <h1>Blog Posts</h1>

            {/* Filters */}
            <div style={{ marginBottom: '2rem' }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ marginRight: '1rem', padding: '0.5rem' }}
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ padding: '0.5rem' }}
                >
                    <option value="">All Categories</option>
                    {categories && categories.map((cat) => (
                        <option key={cat.id} value={cat.slug}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Loading/Error/Data */}
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            <div>
                {posts && posts.map((post) => (
                    <div key={post.id} style={{ marginBottom: '1rem', padding: '1rem', background: 'white' }}>
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostsPage;