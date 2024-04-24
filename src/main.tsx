import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import MUIThemeProvider from './providers/MUIThemeProvider.js';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MUIThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MUIThemeProvider>
  </React.StrictMode>,
);
