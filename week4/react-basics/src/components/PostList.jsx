import { useState, useEffect } from "react";
import DebouncedSearch from "./DebouncedSearch";
import FilteredPosts from "./FilteredPosts";

function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchPosts = async () => {
            try {
                setLoading(true);

                const response = await fetch('http://127.0.0.1:8000/api/posts/');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPosts(data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);

            }
        }

        fetchPosts();

        // fetch('http://127.0.0.1:8000/api/posts/')
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         setPosts(data.results);
        //         setLoading(false);
        //     })
        //     .catch(error => {
        //         setError(error.message);
        //         setLoading(false);
        //     })
    }, []);

    if (loading) {
        return <div>Loading posts... ⏳</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Blog Posts</h2>
            <FilteredPosts />
            <DebouncedSearch />
            {posts.length == - 0 ? (
                <p>No posts found.</p>
            ) :
                (
                    <div>
                        {posts.map(post => (
                            <div key={post.id}
                                style={{
                                    background: 'white',
                                    padding: '1rem',
                                    marginBottom: '1rem',
                                    borderRadius: '4px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}>
                                <h3>{post.title}</h3>
                                <p style={{ color: '#7f8c8d' }}>
                                    By {post.author} | {post.views} views
                                </p>
                                <p>{post.excerpt}</p>
                                <div>
                                    {post.categories.map(cat => (
                                        <span key={cat} style={{
                                            display: 'inline-block',
                                            padding: '0.25rem 0.5rem',
                                            background: '#3498db',
                                            color: 'white',
                                            borderRadius: '4px',
                                            fontSize: '0.85rem',
                                            marginRight: '0.5rem'
                                        }}>
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
}

export default PostList;