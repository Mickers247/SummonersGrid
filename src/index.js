// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import the App component
import Header from './Header';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <App /> {/* Render the App component */}
  </React.StrictMode>,
  document.getElementById('root') // Attach it to the root element in index.html
);
