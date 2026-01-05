import { useState, useEffect } from 'react'

function DebouncedSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500); // Wait 500ms after user stops typing

        return () => clearTimeout(timer); // Cleanup
    }, [searchQuery]);

    useEffect(() => {
        if (!debouncedQuery) {
            setPosts([]);
            return;
        }

        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/posts/?search=${debouncedQuery}`
                );
                const data = await response.json();
                setPosts(data.results);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [debouncedQuery]);

    return (
        <div>
            <h2>Debounced Search</h2>

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

            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#7f8c8d' }}>
                {loading ? 'Searching...' : `Found ${posts.length} results`}
            </p>

            <div style={{ marginTop: '1rem' }}>
                {posts.map(post => (
                    <div key={post.id} style={{ marginBottom: '1rem' }}>
                        <strong>{post.title}</strong>
                        <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                            {post.excerpt}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DebouncedSearch;