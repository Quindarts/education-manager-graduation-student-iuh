import { PaletteOptions } from '@mui/material/styles';

export const color = {
  white: '#ffffff',
  indigo: '#0C50B5',
  dark_indigo: '#08387f',
  gray: '#878a99',
  gray_light: '#f3f3f9',
  gray_dark: '#343a40',
  gray_100: '#f3f6f9',
  gray_200: '#eff2f7',
  gray_300: '#e9ebec',
  gray_400: '#ced4da',
  gray_500: '#adb5bd',
  gray_600: '#878a99',
  gray_700: '#495057',
  gray_800: '#343a40',
  gray_900: '#212529',
  green: '#07C2A9',
  dark_green: '#09735C',
  light_green: '#dbecf0',
  blue: '#3577f1',
  light_blue: '#299cdb',
  dark_blue: '#2385ba',
  light_sky: '#abb9e8',
  purple: '#6559cc',
  pink: '#f672a7',
  red: '#f06548',
  dark_red: '#cc563d',
  orange: '#f1963b',
  yellow: '#f7b84b',
  dark_yellow: '#c6933c',
  teal: '#02a8b5',
  cyan: '#299cdb',
  shadow: '0 1px 2px rgb(56 65 74 / 15%)',
  shadow_hover: '0 5px 10px rgb(30 32 37 / 12%)',
};
const palette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: color.indigo,
    light: color.light_blue,
    dark: color.dark_indigo,
  },
  grey: {
    100: color.gray_100,
    200: color.gray_200,
    300: color.gray_300,
    400: color.gray_400,
    500: color.gray_500,
    600: color.gray_600,
    700: color.gray_700,
    800: color.gray_800,
    900: color.gray_900,
  },
  text: {
    primary: color.gray_700,
    secondary: color.gray_600,
    disabled: color.gray_100,
  },
  warning: {
    main: color.yellow,
    light: color.yellow,
    dark: color.dark_yellow,
  },
  action: {
    active: color.gray_100,
    hoverOpacity: 0.2,
    focus: color.gray_100,
    hover: color.gray_100,
    selected: color.gray_100,
  },
  error: {
    main: color.dark_red,
    light: color.red,
    dark: color.dark_red,
  },
  success: {
    main: color.green,
    light: color.light_green,
    dark: color.dark_green,
  },
  info: {
    main: color.blue,
    light: color.light_blue,
    dark: color.dark_blue,
  },
  divider: color.gray,
  background: {
    default: color.gray_light,
    paper: color.white,
  }
  //background
};

export default palette;
