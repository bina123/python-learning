// src/config/api.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
    posts: `${API_BASE_URL}/api/posts/`,
    postDetail: (slug) => `${API_BASE_URL}/api/posts/${slug}/`,
    categories: `${API_BASE_URL}/api/categories/`,
    comments: `${API_BASE_URL}/api/comments/`,
    login: `${API_BASE_URL}/api/auth/login/`,
    register: `${API_BASE_URL}/api/auth/register/`,
    profile: `${API_BASE_URL}/api/auth/profile/`,
    changePassword: `${API_BASE_URL}/api/auth/change-password/`,
    search: (query) => `${API_BASE_URL}/api/search/?q=${query}`,
};

export default API_BASE_URL;