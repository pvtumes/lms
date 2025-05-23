import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/Home.css'; // Import Home page styles
import './styles/Login.css'; // Import Login page styles
import './styles/SignUp.css'; // Import SignUp page styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);