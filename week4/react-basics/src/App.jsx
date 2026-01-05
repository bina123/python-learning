// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';
import PostDetailPage from './pages/PostDetailPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePostPage from './pages/CreatePostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Day 21 components
import TodoReducer from './components/TodoReducer';
import ShoppingCart from './components/ShoppingCart';
import './App.css';

function App() {
  return (
    <AuthProvider>

      <BrowserRouter>
        <Routes>
          {/* Layout wrapper for all routes */}
          <Route path="/" element={<Layout />}>
            {/* Nested routes */}
            <Route index element={<HomePage />} />
            <Route path="posts" element={<PostsPage />} />
            <Route path="posts/:slug" element={<PostDetailPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="about" element={<AboutPage />} />


            {/* Day 21: useReducer examples */}
            <Route path="examples/todo-reducer" element={<TodoReducer />} />
            <Route path="examples/shopping-cart" element={<ShoppingCart />} />

            {/* 404 catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;