import React from 'react';
import { ThemeProvider } from '@mui/material';
import theme from '../theme/theme';

type Props = {
  children: React.ReactNode;
};

export default function MUIThemeProvider({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
