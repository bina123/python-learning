// src/components/react-query/InfiniteQueryDemo.jsx

import { useInfiniteQuery } from '@tanstack/react-query';
import API_BASE_URL from '../../config/api';

const fetchPostsPage = async ({ pageParam = 1 }) => {
    const response = await fetch(
        API_BASE_URL + `/api/posts/?page=${pageParam}`
    );
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
};

function InfiniteQueryDemo() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ['posts', 'infinite'],
        queryFn: fetchPostsPage,
        getNextPageParam: (lastPage) => {
            // If there's a next page, return the page number
            if (lastPage.next) {
                const url = new URL(lastPage.next);
                return url.searchParams.get('page');
            }
            return undefined;
        },
        initialPageParam: 1,
    });

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <h1>React Query - Infinite Queries</h1>

            <div
                style={{
                    padding: '1.5rem',
                    background: '#ecf0f1',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                }}
            >
                <h3>Infinite Scroll / Load More:</h3>
                <ul>
                    <li>✅ useInfiniteQuery for pagination</li>
                    <li>✅ Automatic page management</li>
                    <li>✅ Load more button or infinite scroll</li>
                    <li>✅ Perfect for feeds and lists</li>
                </ul>
            </div>

            {isLoading && (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>Loading posts...</p>
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

            {data && (
                <>
                    {/* Posts from all pages */}
                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                        {data.pages.map((page, i) => (
                            <div key={i}>
                                {page.results.map((post) => (
                                    <div
                                        key={post.id}
                                        style={{
                                            padding: '1.5rem',
                                            background: 'white',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                            marginBottom: '1rem',
                                        }}
                                    >
                                        <h3 style={{ marginBottom: '0.5rem' }}>{post.title}</h3>
                                        <p style={{ color: '#7f8c8d', marginBottom: '1rem' }}>
                                            {post.excerpt}
                                        </p>
                                        <div style={{ fontSize: '0.85rem', color: '#95a5a6' }}>
                                            By {post.author_name} •{' '}
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div style={{ textAlign: 'center' }}>
                        {hasNextPage ? (
                            <button
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                                style={{
                                    padding: '1rem 2rem',
                                    background: isFetchingNextPage ? '#95a5a6' : '#3498db',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: isFetchingNextPage ? 'not-allowed' : 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}
                            >
                                {isFetchingNextPage ? 'Loading more...' : 'Load More Posts'}
                            </button>
                        ) : (
                            <p style={{ color: '#7f8c8d', padding: '2rem' }}>
                                🎉 No more posts to load!
                            </p>
                        )}
                    </div>
                </>
            )}

            {/* Stats */}
            {data && (
                <div
                    style={{
                        padding: '1rem',
                        background: '#e7f3ff',
                        borderRadius: '4px',
                        marginTop: '2rem',
                        textAlign: 'center',
                    }}
                >
                    <strong>📊 Stats:</strong>
                    <p style={{ marginTop: '0.5rem' }}>
                        Loaded {data.pages.length} page(s) •{' '}
                        {data.pages.reduce(
                            (total, page) => total + page.results.length,
                            0
                        )}{' '}
                        total posts
                    </p>
                </div>
            )}
        </div>
    );
}

export default InfiniteQueryDemo;