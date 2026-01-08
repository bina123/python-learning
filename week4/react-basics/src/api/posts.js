// src/api/posts.js
import API_BASE_URL from "../config/api";

const API_URL = API_BASE_URL + '/api';

// Fetch all posts
export const fetchPosts = async () => {
    const response = await fetch(`${API_URL}/posts/`);
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data.results;
};

// Fetch single post
export const fetchPost = async (slug) => {
    const response = await fetch(`${API_URL}/posts/${slug}/`);
    if (!response.ok) {
        throw new Error('Failed to fetch post');
    }
    return response.json();
};

// Fetch categories
export const fetchCategories = async () => {
    const response = await fetch(`${API_URL}/categories/`);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data.results;
};

// Search posts
export const searchPosts = async (query) => {
    const response = await fetch(`${API_URL}/posts/search/?q=${query}`);
    if (!response.ok) {
        throw new Error('Search failed');
    }
    const data = await response.json();
    return data.results;
};