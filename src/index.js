import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App.js"
import './assets/Index.css'

document.title = "Admin | transfert ONYO-BT"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

