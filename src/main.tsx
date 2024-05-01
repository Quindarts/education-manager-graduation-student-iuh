import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import MUIThemeProvider from './providers/MUIThemeProvider.js';
import './main.css';
import { SnackbarProvider } from 'notistack';
import { themeSnackbar } from './theme/ThemeSnackbar.js';
import { Zoom } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MUIThemeProvider>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={5}
          TransitionComponent={Zoom}
          Components={themeSnackbar}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </MUIThemeProvider>
  </React.StrictMode>,
);
