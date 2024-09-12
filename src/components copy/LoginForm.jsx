import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ setIsLoggedIn, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.username);
      setIsLoggedIn(true);
      setError('');
    } catch (error) {
      setError('Incorrect login information!');
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/auth/register', { username, password });
      const response = await axios.post('http://localhost:5000/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.username);
      setIsLoggedIn(true);
      setError('');
    } catch (error) {
      setError('User already exists or registration failed!');
    }
  };

  const handleTestLogin = () => {
    // Bypasses login and registration, simulates a successful login
    localStorage.setItem('token', 'test-token');
    setUser('testuser');
    setIsLoggedIn(true);
    setError('');
  };

  return (
    <div className="form-group">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <input
        type="text"
        placeholder="Username"
        className="form-control"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="form-buttons">
        <button onClick={isRegistering ? handleRegister : handleLogin} className="btn btn-primary">
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <button onClick={() => setIsRegistering(!isRegistering)} className="btn btn-secondary">
          {isRegistering ? 'Switch to Login' : 'Switch to Register'}
        </button>
        <button onClick={handleTestLogin} className="btn btn-info">
          Test Login
        </button>
      </div>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default LoginForm;
