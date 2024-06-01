'use client';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter-font',
});

export const theme = createTheme({
  typography: {
    fontFamily: 'var(--inter-font), Arial, sans-serif',
  },
});

type Props = {
  children: React.ReactNode;
};

export function Theme({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
