import { useState } from "react";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

function PostsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const debouncedQuery = useDebounce(searchQuery, 500);

    const { data: categories } = useFetch(API_ENDPOINTS.categories);

    const params = new URLSearchParams();
    if (selectedCategory) params.append('category', selectedCategory);
    if (searchQuery) params.append('search', debouncedQuery);
    const postUrl = `${API_ENDPOINTS.posts}?${params}`;

    const { data: posts, loading, error } = useFetch(postUrl);

    return (
        <div>
            <h1>All posts</h1>
            {/* Filters */}
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }} >
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="search posts.."
                    style={{
                        flex: 1,
                        padding: '0.5rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                        padding: '0.5rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}>
                    <option value="">Please select category</option>
                    {categories && categories.map((cat) => (
                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {loading && <p>Loading posts....</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {/*Posts Grid*/}
            <div style={{
                display: 'grid',
                gap: '1.5rem'
            }}>
                {posts && posts.map((post) => (
                    <Link
                        key={post.id}
                        to={`/posts/${post.slug}`} style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}>
                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                            }}
                        >
                            <h3>{post.title}</h3>
                            <p style={{ color: '#7f8c8d', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                By {post.author} | {post.views} views
                            </p>
                            <p style={{ marginTop: '1rem' }}>{post.excerpt}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {posts && posts.length === 0 && (
                <p style={{ textAlign: 'center', color: '#7f8c8d', marginTop: '2rem' }}>
                    No posts found
                </p>
            )}
        </div >
    )
}

export default PostsPage;
