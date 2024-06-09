import { createTheme } from '@mui/material';
import components from './variables/components';
import palette from './variables/palette';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1400,
    },
  },

  palette,
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    fontSize: 12,
    h1: {
      fontSize: 26,
    },
    h2: {
      fontSize: 24,
    },
    h3: {
      fontSize: 20,
    },
    h4: {
      fontSize: 18,
    },
    h5: {
      fontSize: 17,
    },
    h6: {
      fontSize: 16,
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 12,
    },
  },

  spacing: 2,
  shape: {
    borderRadius: 4,
  },
  components,
  unstable_sxConfig: {},
  mixins: {},
});

export default theme;
