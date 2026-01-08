import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts } from "../../api/posts";
import { createPost, updatePost, deletePost } from "../../api/mutations";

function MutationsDemo() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: ''
    });

    const [editingSlug, setEditingSlug] = useState(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsLoggedIn(!!token);
    }, []);

    const queryClient = useQueryClient();

    const { data: posts, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts
    });

    const createMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            setFormData({ title: '', content: '', excerpt: '' });
            alert('✅ Post created successfully!');
        },
        onError: (error) => {
            alert(`❌ Error: ${error.message}`);
        }
    });

    const updateMutation = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            setEditingSlug(null);
            setFormData({ title: '', content: '', excerpt: '' });
            alert('✅ Post updated successfully!');
        },
        onError: (error) => {
            alert(`❌ Error: ${error.message}`);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            alert('✅ Post deleted successfully!');
        },
        onError: (error) => {
            alert(`❌ Error: ${error.message}`);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingSlug) {
            updateMutation.mutate({
                slug: editingSlug,
                postData: formData,
            });
        } else {
            createMutation.mutate(formData);
        }
    };

    const handleEdit = (post) => {
        setEditingSlug(post.slug);
        setFormData({
            title: post.title,
            content: post.content,
            excerpt: post.excerpt,
        });
    };

    const handleCancelEdit = () => {
        setEditingSlug(null);
        setFormData({ title: '', content: '', excerpt: '' });
    };

    const isMutating =
        createMutation.isPending ||
        updateMutation.isPending ||
        deleteMutation.isPending;

    return (
        <div style={{ maxWidth: '1000px', margin: '2rem auto' }}>
            <h1>React Query - Mutations</h1>

            {/* Login Warning */}
            {!isLoggedIn && (
                <div
                    style={{
                        padding: '1.5rem',
                        background: '#fff3cd',
                        border: '2px solid #ffc107',
                        borderRadius: '8px',
                        marginBottom: '2rem',
                    }}
                >
                    <strong>⚠️ Not Logged In</strong>
                    <p style={{ marginTop: '0.5rem' }}>
                        You need to login to create, edit, or delete posts.
                        Go to <a href="/login">Login Page</a> first!
                    </p>
                </div>
            )}

            <div
                style={{
                    padding: '1.5rem',
                    background: '#ecf0f1',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                }}
            >
                <h3>Mutations = CREATE, UPDATE, DELETE</h3>
                <ul>
                    <li>✅ useMutation for data changes</li>
                    <li>✅ Automatic cache invalidation</li>
                    <li>✅ Optimistic updates possible</li>
                    <li>✅ Loading/error states built-in</li>
                    <li>✅ onSuccess/onError callbacks</li>
                </ul>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Form */}
                <div>
                    <div
                        style={{
                            padding: '2rem',
                            background: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                    >
                        <h2>{editingSlug ? '✏️ Edit Post' : '➕ Create Post'}</h2>

                        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label
                                    style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '1rem',
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label
                                    style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Excerpt *
                                </label>
                                <textarea
                                    value={formData.excerpt}
                                    onChange={(e) =>
                                        setFormData({ ...formData, excerpt: e.target.value })
                                    }
                                    required
                                    rows="2"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '1rem',
                                        fontFamily: 'inherit',
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label
                                    style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Content *
                                </label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) =>
                                        setFormData({ ...formData, content: e.target.value })
                                    }
                                    required
                                    rows="6"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '1rem',
                                        fontFamily: 'inherit',
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    type="submit"
                                    disabled={isMutating}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        background: isMutating
                                            ? '#95a5a6'
                                            : editingSlug
                                                ? '#f39c12'
                                                : '#27ae60',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: isMutating ? 'not-allowed' : 'pointer',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {isMutating
                                        ? 'Saving...'
                                        : editingSlug
                                            ? 'Update Post'
                                            : 'Create Post'}
                                </button>

                                {editingSlug && (
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        style={{
                                            padding: '0.75rem 1rem',
                                            background: '#95a5a6',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Posts List */}
                <div>
                    <div
                        style={{
                            padding: '2rem',
                            background: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                    >
                        <h2>📝 Your Posts</h2>

                        {isLoading && <p>Loading posts...</p>}

                        {posts && posts.length === 0 && (
                            <p style={{ textAlign: 'center', color: '#7f8c8d', padding: '2rem' }}>
                                No posts yet. Create your first post!
                            </p>
                        )}

                        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                            {posts?.map((post) => (
                                <div
                                    key={post.slug}
                                    style={{
                                        padding: '1rem',
                                        background: '#f8f9fa',
                                        borderRadius: '4px',
                                        border:
                                            editingSlug === post.slug
                                                ? '2px solid #f39c12'
                                                : '1px solid #dee2e6',
                                    }}
                                >
                                    <h4 style={{ marginBottom: '0.5rem' }}>{post.title}</h4>
                                    <p
                                        style={{
                                            fontSize: '0.85rem',
                                            color: '#7f8c8d',
                                            marginBottom: '1rem',
                                        }}
                                    >
                                        {post.excerpt}
                                    </p>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => handleEdit(post)}
                                            disabled={isMutating}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                background: '#3498db',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: isMutating ? 'not-allowed' : 'pointer',
                                                fontSize: '0.85rem',
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (
                                                    window.confirm(
                                                        'Are you sure you want to delete this post?'
                                                    )
                                                ) {
                                                    deleteMutation.mutate(post.slug);
                                                }
                                            }}
                                            disabled={isMutating}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                background: '#e74c3c',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: isMutating ? 'not-allowed' : 'pointer',
                                                fontSize: '0.85rem',
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Note */}
            <div
                style={{
                    padding: '1rem',
                    background: '#fff3cd',
                    borderRadius: '4px',
                    marginTop: '2rem',
                }}
            >
                <strong>📝 Note:</strong> You need to be logged in to create/edit/delete
                posts. Make sure your Django backend is running and you have authentication
                set up!
            </div>
        </div>
    );
}

export default MutationsDemo;