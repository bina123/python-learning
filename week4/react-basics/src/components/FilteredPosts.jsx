import { useState, useEffect } from "react";

function FilteredPosts() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/categories/')
            .then(res => res.json())
            .then(data => {
                // ✅ FIX: Check if data has results array
                if (Array.isArray(data)) {
                    setCategories(data);
                } else if (data.results) {
                    setCategories(data.results);  // Extract results array
                } else {
                    console.error('Unexpected data format:', data);
                    setCategories([]);
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                setCategories([]);
            });
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const params = new URLSearchParams();
            if (selectedCategory) params.append('category', selectedCategory);
            if (searchQuery) params.append('search', searchQuery);
            const url = `http://127.0.0.1:8000/api/posts/?${params}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setPosts(data.results);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, [selectedCategory, searchQuery]);

    return (
        <div>
            <h2>Filtered Posts</h2>

            {/* Filters */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
            }}>
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        flex: 1,
                        minWidth: '200px',
                        padding: '0.5rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}
                />

                {/* Category Filter */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                        padding: '0.5rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.slug}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Loading State */}
            {loading && <p>Loading... ⏳</p>}

            {/* Posts */}
            <div>
                {posts.length === 0 && !loading ? (
                    <p>No posts found.</p>
                ) : (
                    posts.map(post => (
                        <div
                            key={post.id}
                            style={{
                                background: 'white',
                                padding: '1.5rem',
                                marginBottom: '1rem',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            <h3>{post.title}</h3>
                            <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                                {post.author} | {post.views} views
                            </p>
                            <p>{post.excerpt}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default FilteredPosts;