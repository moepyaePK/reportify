import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css'; // Import the custom CSS
// Importing images from the assets folder
import ReportifyLogo from '../assets/ReportifyLogo.png';
import ReportifyGraphic from '../assets/ReportifyLogo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    setErrorMessage('');
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Logged in as:', userCredential.user.email);
        window.location.href = './home';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMsg = error.message;
        setErrorMessage(`Error (${errorCode}): ${errorMsg}`);
      });
  };

  return (
    <div>
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
      <div className="container">
        <div className="card border-light-subtle shadow-sm">
          <div className="row g-0">
            <div className="col-12 col-md-6 text-bg-primary">
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="col-10 col-xl-8 py-3">
                  <img
                    className="img-fluid rounded mb-4"
                    loading="lazy"
                    src={ReportifyGraphic}
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
            <div className="col-12 col-md-6">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <h3>Log in</h3>
                <form onSubmit={handleLogin}>
                  <div className="row gy-3 gy-md-4 overflow-hidden">
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="password" className="form-label">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="remember_me" />
                        <label className="form-check-label text-secondary" htmlFor="remember_me">
                          Keep me logged in
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn bsb-btn-xl btn-danger" type="submit">
                          Log in now
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
                <hr className="mt-5 mb-4 border-secondary-subtle" />
                <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                  <a href="signup" className="link-secondary text-decoration-none">
                    Create new account
                  </a>
                  <a href="#!" className="link-secondary text-decoration-none">
                    Forgot password
                  </a>
                </div>
                <p className="mt-5 mb-4">Or sign in with</p>
                <div className="d-flex gap-3 flex-column flex-xl-row">
                  <button className="btn bsb-btn-xl btn-outline-danger">Google</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
