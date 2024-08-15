import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import MUIThemeProvider from './providers/MUIThemeProvider.js';
import './main.css';
import { SnackbarProvider } from 'notistack';
import { themeSnackbar } from './theme/ThemeSnackbar.js';
import { Zoom } from '@mui/material';
import ReactQueryClientProvider from './providers/ReactQueryClientProvider.jsx';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import store from './store/index.js';
import { env } from './utils/env.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MUIThemeProvider>
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={5}
          TransitionComponent={Zoom}
          Components={themeSnackbar}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <ReactQueryClientProvider>
            <App />
            {env.NODE_ENV === 'local' && <ReactQueryDevtools initialIsOpen={false} />}
          </ReactQueryClientProvider>
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  </MUIThemeProvider>,
);
