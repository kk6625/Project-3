import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/auth/register', { username, password });
      alert('User registered successfully!');
    } catch (error) {
      setError('User already exists!');
    }
  };

  return (
    <div className="form-group">
      <h2>Register</h2>
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
      <button onClick={handleRegister} className="btn btn-secondary">
        Register
      </button>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default RegisterForm;
