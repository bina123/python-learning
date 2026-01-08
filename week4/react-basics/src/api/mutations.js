// src/api/mutations.js
import API_BASE_URL from "../config/api";

const API_URL = API_BASE_URL + '/api';

async function getAuthHeaders() {
    const token = localStorage.getItem('access_token');

    if (!token) {
        throw new Error('You must be logged in to perform this action');
    }

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
}

// Create a new post
export const createPost = async (postData) => {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_URL}/posts/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error('Permission denied. Are you logged in?');
        }
        const error = await response.json();
        throw new Error(error.detail || 'Failed to create post');
    }

    return response.json();
};

// Update a post
export const updatePost = async ({ slug, postData }) => {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_URL}/posts/${slug}/`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error('Permission denied. You can only edit your own posts.');
        }
        const error = await response.json();
        throw new Error(error.detail || 'Failed to update post');
    }

    return response.json();
};

// Delete a post
export const deletePost = async (slug) => {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_URL}/posts/${slug}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': headers.Authorization,
        },
    });

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error('Permission denied. You can only delete your own posts.');
        }
        throw new Error('Failed to delete post');
    }

    return { success: true };
};