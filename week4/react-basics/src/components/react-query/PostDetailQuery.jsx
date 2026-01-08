// src/components/react-query/PostDetailQuery.jsx

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPost, fetchPosts } from '../../api/posts';

function PostDetailQuery() {
    const [selectedSlug, setSelectedSlug] = useState(null);

    // Query for list of posts
    const { data: posts } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    // Query for single post (only runs when slug is selected)
    const {
        data: post,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['post', selectedSlug], // Include slug in key!
        queryFn: () => fetchPost(selectedSlug),
        enabled: !!selectedSlug, // Only run when slug exists
    });

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <h1>React Query - Query with Parameters</h1>

            <div
                style={{
                    padding: '1.5rem',
                    background: '#ecf0f1',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                }}
            >
                <h3>Key Concepts:</h3>
                <ul>
                    <li>✅ Dynamic query keys: ['post', slug]</li>
                    <li>✅ Enabled option (conditional fetching)</li>
                    <li>✅ Each slug has its own cache</li>
                    <li>✅ Parallel queries (posts + post)</li>
                </ul>
            </div>

            {/* Post Selector */}
            <div
                style={{
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginBottom: '2rem',
                }}
            >
                <h3>Select a Post:</h3>
                <div style={{ display: 'grid', gap: '0.5rem', marginTop: '1rem' }}>
                    {posts?.map((post) => (
                        <button
                            key={post.slug}
                            onClick={() => setSelectedSlug(post.slug)}
                            style={{
                                padding: '1rem',
                                background:
                                    selectedSlug === post.slug ? '#3498db' : '#f8f9fa',
                                color: selectedSlug === post.slug ? 'white' : '#2c3e50',
                                border: 'none',
                                borderRadius: '4px',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontWeight: selectedSlug === post.slug ? 'bold' : 'normal',
                                transition: 'all 0.2s',
                            }}
                        >
                            {post.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Selected Post Detail */}
            {selectedSlug && (
                <div
                    style={{
                        padding: '2rem',
                        background: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                >
                    {isLoading && (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    border: '4px solid #f3f3f3',
                                    borderTop: '4px solid #3498db',
                                    borderRadius: '50%',
                                    margin: '0 auto 1rem',
                                    animation: 'spin 1s linear infinite',
                                }}
                            />
                            <p>Loading post details...</p>
                        </div>
                    )}

                    {isError && (
                        <div
                            style={{
                                padding: '1rem',
                                background: '#f8d7da',
                                color: '#721c24',
                                borderRadius: '4px',
                            }}
                        >
                            Error: {error.message}
                        </div>
                    )}

                    {post && (
                        <article>
                            <h2 style={{ marginBottom: '1rem' }}>{post.title}</h2>

                            <div
                                style={{
                                    display: 'flex',
                                    gap: '2rem',
                                    marginBottom: '1rem',
                                    fontSize: '0.9rem',
                                    color: '#7f8c8d',
                                }}
                            >
                                <span>By {post.author_name}</span>
                                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                {post.category && <span>📁 {post.category.name}</span>}
                            </div>

                            <div
                                style={{
                                    padding: '1rem',
                                    background: '#f8f9fa',
                                    borderRadius: '4px',
                                    marginBottom: '1rem',
                                }}
                            >
                                <strong>Excerpt:</strong>
                                <p style={{ marginTop: '0.5rem' }}>{post.excerpt}</p>
                            </div>

                            <div
                                style={{
                                    marginTop: '2rem',
                                    padding: '1.5rem',
                                    background: '#e7f3ff',
                                    borderRadius: '4px',
                                    lineHeight: 1.6,
                                }}
                            >
                                {post.content}
                            </div>

                            {post.tags && post.tags.length > 0 && (
                                <div style={{ marginTop: '2rem' }}>
                                    <strong>Tags:</strong>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag.id}
                                                style={{
                                                    padding: '0.25rem 0.75rem',
                                                    background: '#3498db',
                                                    color: 'white',
                                                    borderRadius: '12px',
                                                    fontSize: '0.85rem',
                                                }}
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </article>
                    )}
                </div>
            )}

            {!selectedSlug && (
                <div
                    style={{
                        padding: '3rem',
                        textAlign: 'center',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        color: '#7f8c8d',
                    }}
                >
                    <p>👆 Select a post above to view its details</p>
                </div>
            )}

            {/* Cache Explanation */}
            <div
                style={{
                    padding: '1rem',
                    background: '#fff3cd',
                    borderRadius: '4px',
                    marginTop: '2rem',
                }}
            >
                <strong>🎯 Try This:</strong>
                <ol style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    <li>Click on a post</li>
                    <li>Click on another post</li>
                    <li>Go back to the first post</li>
                    <li>Notice how fast it loads (it's cached!)</li>
                </ol>
            </div>
        </div>
    );
}

export default PostDetailQuery;