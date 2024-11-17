import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Make sure you have this file for global styles
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS globally

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your App component inside React.StrictMode for development.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, you can log it or send it to an analytics endpoint.
reportWebVitals();
