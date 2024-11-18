import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/user.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebaseconfig";
import ReportifyLogo from '../assets/ReportifyLogo.png';

const User = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/'); // Redirect to login page if not logged in
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
      {/* Navbar */}
      <nav className="navbar" style={{ backgroundColor: '#b80a21' }}>
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="preview.html">
            <img
              src={ReportifyLogo}
              alt="Reportify Logo"
              width="80"
              height="40"
              className="d-inline-block me-2"
            />
            <span className="text-white">Reportify</span>
          </a>
          {/* Back button */}
          <button
            type="button"
            className="btn btn-danger ms-auto"
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            Back
          </button>
        </div>
      </nav>

      {/* Profile Section */}
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
