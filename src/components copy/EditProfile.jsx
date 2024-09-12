import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditProfile({ user, handleLogout }) {
  const [username, setUsername] = useState(user);
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Reset state when the user changes
    setUsername(user);
  }, [user]);

  const handleSave = async () => {
    if (!username || !password) {
      setError('Username and password are required!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated!');
        return;
      }

      await axios.put(`http://localhost:5000/auth/user/${user}`, 
        { username, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      setError('');
    } catch (error) {
      setError('Error updating profile!');
    }
  };

  return (
    <div className="profile-edit">
      {isEditing ? (
        <>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="New Username"
            className="form-control mb-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="form-control mb-2"
          />
          <button onClick={handleSave} className="btn btn-success">
            Save
          </button>
          {error && <p className="text-danger">{error}</p>}
        </>
      ) : (
        <>
          <p>Username: {username}</p>
          <p>Password: ******</p>
          <button onClick={() => setIsEditing(true)} className="btn btn-warning">
            Edit
          </button>
        </>
      )}
      <button onClick={handleLogout} className="btn btn-danger mt-2">
        Logout
      </button>
    </div>
  );
}

export default EditProfile;
