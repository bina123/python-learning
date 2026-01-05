import './App.css'
import { use, useState } from 'react';
import Profile from './Profile';
import Button from './components/Button';
import Card from './components/Card';
import UserCard from './components/UserCard';
import ProductCard from './components/ProductCard';
import TodoApp from './components/TodoApp';
import UseEffectDemo from './components/UseEffectDemo';
import TimerDemo from './components/TimerDemo';
import PostList from './components/PostList';
import FilteredPosts from './components/FilteredPosts';
import DebouncedSearch from './components/DebouncedSearch';

function App() {

  const [showProfile, setShowProfile] = useState(false);

  return (
    // <Card title="Profile Form/Counter">
    //   <div className="container">
    //     <button onClick={() => setShowProfile(!showProfile)}
    //     >
    //       {showProfile ? 'Show Counter' : 'Show Profile Form'}
    //     </button>

    //     <div style={{ marginTop: '2rem' }}>
    //       {showProfile ? <Profile /> : <Counter />}
    //     </div>

    //   </div>
    // </Card>

    <div className="container">

      <h1>React + Django Integration</h1>
      <PostList />
      {/* <FilteredPosts /> */}
      {/* <DebouncedSearch /> */}
      {/* <TodoApp />
      <UseEffectDemo />
      <TimerDemo /> */}
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  }

  const decrement = () => {
    setCount(count - 1);
  }

  const reset = () => {
    setCount(0);
  }

  return (
    <div className='counterDiv'>
      <h1>React Counter</h1>

      <Card title="Counter Example">
        <div style={{ fontSize: '3rem', margin: '2rem 0', textAlign: 'center', color: '#7f8c8d' }}>
          Count: {count}
        </div>

        <div style={{ display: 'flex', gap: '1 rem', justifyContent: 'center' }}>
          <Button variant='danger' onClick={decrement}>Decrement</Button>
          <Button onClick={reset}>Reset</Button>
          <Button variant='success' onClick={increment}>Increment</Button>
        </div>
      </Card>

      <Card title="Info">
        <p>This demonstrates reusable components!</p>
        <p>The Button and Card components can be used anywhere.</p>
        <p style={{ marginTop: '2 rem', textAlign: 'left' }}>
          The count is {count < 0 ? "Negative" : count > 0 ? 'Positive' : 'Zero'}
        </p>
      </Card>

      <Card title="userInfo">
        <UserCards />
      </Card>

      <ProductCards />
    </div >
  )
}

function UserCards() {
  const users = [
    {
      name: 'Bina',
      role: 'Full-Stack Developer',
      avatar: '👨‍💻',
      bio: '9 years PHP/Laravel, learning React + Django'
    },
    {
      name: 'Alice',
      role: 'UI Designer',
      avatar: '🎨',
      bio: 'Passionate about user experience'
    },
    {
      name: 'Bob',
      role: 'Backend Developer',
      avatar: '⚙️',
      bio: 'Python & Django specialist'
    }
  ];
  return (
    <>
      <h1>Team Members</h1>
      {users.map((user, index) => (
        <UserCard
          key={index}
          name={user.name}
          role={user.role}
          avatar={user.avatar}
          bio={user.bio} />
      ))}
    </>
  )
}

function ProductCards() {
  const [cart, setCart] = useState([]);

  const products = [
    {
      id: 1,
      name: 'Python Crash Course Book',
      price: 39.99,
      image: 'https://via.placeholder.com/300x200/3498db/ffffff?text=Python+Book',
      inStock: true
    },
    {
      id: 2,
      name: 'React Masterclass Course',
      price: 99.99,
      image: 'https://via.placeholder.com/300x200/61dafb/ffffff?text=React+Course',
      inStock: true
    },
    {
      id: 3,
      name: 'Django for Professionals',
      price: 49.99,
      image: 'https://via.placeholder.com/300x200/092e20/ffffff?text=Django+Book',
      inStock: false
    }
  ];

  const handleBuy = (productName, price) => {
    setCart([...cart, { name: productName, price }]);
    alert(`Added ${productName} to cart!`);
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className='container'>
      <h1>Product Store</h1>
      {/* Cart Summary */}
      <div style={{
        background: '#ecf0f1',
        padding: '1rem',
        borderRadius: '4px',
        marginBottom: '2rem'
      }}>
        <h3>Cart: {cart.length} items</h3>
        <p>Total: ${cartTotal.toFixed(2)}</p>
      </div>

      {/* Product Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem'
      }}>
        {products.map(product => (
          <ProductCard key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            inStock={product.inStock}
            onBuy={handleBuy} />
        ))}
      </div>
    </div >
  );
}
export default App
