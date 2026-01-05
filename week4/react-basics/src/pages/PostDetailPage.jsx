import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { API_ENDPOINTS } from '../config/api';

function PostDetailsPage() {
    const { slug } = useParams();

    const { data: post, loading, error } = useFetch(API_ENDPOINTS.postDetail(slug));

    if (loading) {
        return <div>Loading post...</div>
    }

    if (error) {
        return (
            <div>
                <p style={{ color: 'red' }}>Error: {error}</p>
                <Link to="/posts">← Back to posts</Link>
            </div>
        );
    }

    if (!post) {
        return (
            <div>
                <p>Post not found</p>
                <Link to="/posts">← Back to posts</Link>
            </div>
        );
    }

    return (
        <div>
            <Link to="/posts" style={{ color: '#3498db', textDecoration: 'none' }}>
                ← Back to posts
            </Link>

            <article style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '8px',
                marginTop: '1rem'
            }}>
                <h1>{post.title}</h1>

                <div style={{
                    color: '#7f8c8d',
                    fontSize: '0.9rem',
                    marginTop: '0.5rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid #ecf0f1'
                }}>
                    <span>By {post.author?.username || post.author}</span>
                    <span style={{ margin: '0 1rem' }}>|</span>
                    <span>{post.views} views</span>
                    <span style={{ margin: '0 1rem' }}>|</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>

                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                    <div style={{ margin: '1rem 0' }}>
                        {post.categories.map((cat, index) => (
                            <span
                                key={index}
                                style={{
                                    display: 'inline-block',
                                    padding: '0.25rem 0.75rem',
                                    background: '#3498db',
                                    color: 'white',
                                    borderRadius: '12px',
                                    fontSize: '0.85rem',
                                    marginRight: '0.5rem'
                                }}
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                )}

                {/* Content */}
                <div style={{
                    color: '#7f8c8d',
                    marginTop: '2rem',
                    lineHeight: '1.8',
                    fontSize: '1.1rem'
                }}>
                    {post.content}
                </div>

                {/* Comments Section */}
                {post.comments && post.comments.length > 0 && (
                    <div style={{
                        marginTop: '3rem',
                        paddingTop: '2rem',
                        borderTop: '2px solid #ecf0f1'
                    }}>
                        <h2>Comments ({post.comments.length})</h2>
                        {post.comments.map((comment) => (
                            <div
                                key={comment.id}
                                style={{
                                    background: '#f8f9fa',
                                    padding: '1rem',
                                    borderRadius: '4px',
                                    marginTop: '1rem'
                                }}
                            >
                                <strong>{comment.author_name}</strong>
                                <p style={{ marginTop: '0.5rem' }}>{comment.content}</p>
                                <small style={{ color: '#7f8c8d' }}>
                                    {new Date(comment.created_at).toLocaleDateString()}
                                </small>
                            </div>
                        ))}
                    </div>
                )}
            </article>
        </div>
    );

}

export default PostDetailsPage;