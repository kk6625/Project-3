import React, { useState } from 'react';
import EditProfile from './EditProfile';

function HomePage({ user, setIsLoggedIn }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="homepage">
      <h1>Welcome, {user}!</h1>
      <div
        className="profile-icon"
        onMouseEnter={() => setIsEditing(true)}
        onMouseLeave={() => setIsEditing(false)}
      >
        <img src="profile-icon.png" alt="Profile" />
        {isEditing && <EditProfile user={user} handleLogout={handleLogout} />}
      </div>
    </div>
  );
}

export default HomePage;
