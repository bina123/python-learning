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

// Day 22
import PerformanceDemo from './components/PerformanceDemo';
import './App.css';
import UseMemoDemo from './components/UseMemoDemo';
import UseCallbackDemo from './components/UseCallbackDemo';
import LazyLoadDemo from './components/LazyLoadDemo';


// Day 23
import UseAsyncDemo from './components/UseAsyncDemo';
import UseLocalStorageDemo from './components/UseLocalStorageDemo';
import UseMediaQueryDemo from './components/UseMediaQueryDemo';
import UseOnScreenDemo from './components/UseOnScreenDemo';
import UsePreviousDemo from './components/UsePreviousDemo';
import UseAsyncTest from './components/UseAsyncTest';


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

            {/* Day 23: Performance */}
            <Route path='examples/performance-demo' element={<PerformanceDemo />} />
            <Route path='examples/usememodemo' element={<UseMemoDemo />} />
            <Route path='examples/usecallback' element={<UseCallbackDemo />} />
            <Route path="examples/lazy-load" element={<LazyLoadDemo />} />

            {/* Day 23: Advanced Hooks */}
            <Route path="examples/use-async" element={<UseAsyncDemo />} />
            <Route path="examples/use-localstorage" element={<UseLocalStorageDemo />} />
            <Route path="examples/use-mediaquery" element={<UseMediaQueryDemo />} />
            <Route path="examples/use-onscreen" element={<UseOnScreenDemo />} />
            <Route path="examples/use-previous" element={<UsePreviousDemo />} />
            <Route path="examples/use-async-test" element={<UseAsyncTest />} />

            {/* 404 catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;