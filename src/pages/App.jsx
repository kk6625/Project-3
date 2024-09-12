import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import './styles.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // Optionally, fetch user details from backend
    }
  }, []);

  return (
    <div className="container">
      {!isLoggedIn ? (
        <LoginForm setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
      ) : (
        <HomePage user={user} setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
