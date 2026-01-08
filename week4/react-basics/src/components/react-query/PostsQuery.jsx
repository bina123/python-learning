import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../api/posts';

function PostsQuery() {
    const {
        data: posts,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts
    });

    console.log('Component rendered');

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <h1>React Query - Basic Queries</h1>

            <div
                style={{
                    padding: '1.5rem',
                    background: '#ecf0f1',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                }}
            >
                <h3>Features in Action:</h3>
                <ul>
                    <li>✅ Automatic caching (try navigating away and back)</li>
                    <li>✅ Loading states handled</li>
                    <li>✅ Error handling built-in</li>
                    <li>✅ Background refetching</li>
                    <li>✅ Minimal re-renders</li>
                </ul>
            </div>

            {/* Status Info */}
            <div
                style={{
                    padding: '1rem',
                    background: 'white',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <StatusBadge label="Loading" active={isLoading} color="#3498db" />
                    <StatusBadge label="Fetching" active={isFetching} color="#f39c12" />
                    <StatusBadge label="Error" active={isError} color="#e74c3c" />
                    <StatusBadge
                        label="Success"
                        active={!isLoading && !isError}
                        color="#27ae60"
                    />
                </div>
            </div>

            {/* Actions */}
            <div style={{ marginBottom: '2rem' }}>
                <button
                    onClick={() => refetch()}
                    disabled={isFetching}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: isFetching ? '#95a5a6' : '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: isFetching ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                    }}
                >
                    {isFetching ? 'Refetching...' : '🔄 Refetch Posts'}
                </button>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#7f8c8d' }}>
                    Watch how fast it is! (Data is cached)
                </p>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div
                    style={{
                        padding: '3rem',
                        textAlign: 'center',
                        background: '#fff3cd',
                        borderRadius: '8px',
                    }}
                >
                    <div
                        style={{
                            width: '50px',
                            height: '50px',
                            border: '4px solid #f3f3f3',
                            borderTop: '4px solid #3498db',
                            borderRadius: '50%',
                            margin: '0 auto 1rem',
                            animation: 'spin 1s linear infinite',
                        }}
                    />
                    <p>Loading posts...</p>
                    <style>
                        {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
                    </style>
                </div>
            )}

            {/* Error State */}
            {isError && (
                <div
                    style={{
                        padding: '2rem',
                        background: '#f8d7da',
                        color: '#721c24',
                        borderRadius: '8px',
                        border: '1px solid #f5c6cb',
                    }}
                >
                    <h3>❌ Error Loading Posts</h3>
                    <p>{error.message}</p>
                    <button
                        onClick={() => refetch()}
                        style={{
                            marginTop: '1rem',
                            padding: '0.5rem 1rem',
                            background: '#721c24',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Success - Posts List */}
            {posts && (
                <div>
                    <h2>Posts ({posts.length})</h2>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                style={{
                                    padding: '1.5rem',
                                    background: 'white',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                }}
                            >
                                <h3 style={{ marginBottom: '0.5rem' }}>{post.title}</h3>
                                <p style={{ color: '#7f8c8d', marginBottom: '1rem' }}>
                                    {post.excerpt}
                                </p>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        fontSize: '0.85rem',
                                        color: '#95a5a6',
                                    }}
                                >
                                    <span>By {post.author_name}</span>
                                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* DevTools Tip */}
            <div
                style={{
                    padding: '1rem',
                    background: '#d4edda',
                    borderRadius: '4px',
                    marginTop: '2rem',
                }}
            >
                <strong>💡 React Query DevTools:</strong>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    Look for the React Query icon in the bottom-left corner. Click it to see
                    query status, cache, and more!
                </p>
            </div>
        </div>
    );
}

function StatusBadge({ label, active, color }) {
    return (
        <div
            style={{
                padding: '0.5rem 1rem',
                background: active ? color : '#ecf0f1',
                color: active ? 'white' : '#7f8c8d',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
            }}
        >
            {active && <span>●</span>}
            {label}
        </div>
    );
}

export default PostsQuery;