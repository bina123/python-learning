import './App.css'
import { useState } from 'react';
import Profile from './Profile';
import Button from './components/Button';
import Card from './components/Card';
import UserCard from './components/UserCard';

function App() {

  const [showProfile, setShowProfile] = useState(false);

  return (
    <Card title="Profile Form/Counter">
      <div className="container">
        <button onClick={() => setShowProfile(!showProfile)}
        >
          {showProfile ? 'Show Counter' : 'Show Profile Form'}
        </button>

        <div style={{ marginTop: '2rem' }}>
          {showProfile ? <Profile /> : <Counter />}
        </div>

      </div>
    </Card>
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
export default App
