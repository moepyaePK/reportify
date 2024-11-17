import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {  onAuthStateChanged } from 'firebase/auth';
import {auth} from "../firebaseconfig"




const User = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/'); // Redirect to login page
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/'); // Redirect to login after logout
      })
      .catch((error) => console.error('Error logging out:', error));
  };

  return (
    <div className="container">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Reportify</span>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </nav>

      <div className="profile">
        <div className="avatar"></div>
        <div className="user-id">{user ? user.email : 'Loading...'}</div>
        <div className="options">
          <div className="option">
            <button
              className="icon"
              onClick={() => navigate('/posthistory')}
            >
              🔄 Post History
            </button>
          </div>
          <div className="option logout" onClick={handleLogout}>
            <span className="icon">🔓</span> Log Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
