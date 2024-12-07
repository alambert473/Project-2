import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterNav from './routernav'; // Import your routing component
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterNav /> 
  </React.StrictMode>
);

reportWebVitals();