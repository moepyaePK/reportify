import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/user.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebaseconfig";
import ReportifyLogo from '../assets/ReportifyLogo.png'; // Make sure you have the image imported


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
    <div className="user-page">
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
        </div>
      </nav>

      {/* Profile Section */}
      <div className="container">
        <div className="card border-light-subtle shadow-sm">
          <div className="row g-0">
            <div className="col-12 col-md-6 text-bg-primary">
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="col-10 col-xl-8 py-3">
                  <img
                    className="img-fluid rounded mb-4"
                    loading="lazy"
                    src={ReportifyLogo}
                    width="245"
                    height="50"
                    alt="Reportify Graphic"
                  />
                  <hr className="border-primary-subtle mb-4" />
                  <h2 className="h1 mb-4">We make digital products that drive you to stand out.</h2>
                  <p className="lead m-0">
                    We write words, take photos, make videos, and interact with artificial intelligence.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 ">
              <div className="card-body p-3 p-md-4 p-xl-5 namecard">
                <h3>Welcome, {user ? user.email : 'Loading...'}</h3>
                <div className="options mt-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
