import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth} from '../firebaseconfig';






const SignUpPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setSuccessMessage(`Sign-up successful! Welcome, ${user.email}`);
        console.log("User created successfully:", user);
        // Redirect or perform further actions as needed
        setTimeout(() => (window.location.href = "./home"), 2000);
      })
      .catch((error) => {
        setErrorMessage(`Error: ${error.message}`);
        console.error("Error during sign-up:", error);
      });
  };

  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: "#b80a21" }}>
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="preview.html">
            <img
              src="ReportifyLogo.png"
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
            <div className="col-12 col-md-6" style={{ backgroundColor: "#b80a21", color: "white" }}>
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="col-10 col-xl-8 py-3">
                  <img
                    className="img-fluid rounded mb-4"
                    loading="lazy"
                    src="ReportifyLogo.png"
                    width="245"
                    height="80"
                    alt="Reportify Logo"
                  />
                  <hr className="border-primary-subtle mb-4" />
                  <h2 className="h1 mb-4" style={{ color: "white" }}>
                    Welcome to our Reportify Website
                  </h2>
                  <p className="lead m-0" style={{ color: "white" }}>
                    Feel free to report incidents to make a better environment for surroundings.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="mb-5">
                  <h3>Create an Account</h3>
                </div>
                <form onSubmit={handleSignUp}>
                  <div className="row gy-3 gy-md-4 overflow-hidden">
                    <div className="col-12">
                      <label htmlFor="full_name" className="form-label">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="full_name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Name"
                        required
                      />
                    </div>
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
                      <label htmlFor="confirm_password" className="form-label">
                        Confirm Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirm_password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn bsb-btn-xl btn-danger" type="submit">
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
                {successMessage && <p className="text-success mt-3">{successMessage}</p>}
                <div className="d-flex justify-content-end mt-4">
                  <a href="login.html" className="link-secondary text-decoration-none">
                    Already have an account? Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
