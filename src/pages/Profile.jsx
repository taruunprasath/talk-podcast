import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import "../styles/profile.css";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  
  if (!user) {
    return (
      <p style={{
        fontSize: 40,
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        Loading...
      </p>
    );
  }

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="welcome-container">
          <h1 className="welcome-message">Welcome, {user.name}!</h1>
          <p className="welcome-subtext">We're glad to have you here. Dive into our latest episodes and enjoy your podcast journey!</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
