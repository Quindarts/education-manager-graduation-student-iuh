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
    fontSize: 14,
    h1: {
      fontSize: 34,
    },
    h2: {
      fontSize: 26,
    },
    h3: {
      fontSize: 18,
    },
    h4: {
      fontSize: 16,
    },
    h5: {
      fontSize: 14,
    },
    h6: {
      fontSize: 13,
    },
    body1: {
      fontSize: 12,
    },
    body2: {
      fontSize: 11,
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
