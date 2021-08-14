import { createTheme, responsiveFontSizes } from '@material-ui/core';

// Theme palette: https://coolors.co/03256c-2541b2-1768ac-06bee1-ffffff
export const primaryTheme = responsiveFontSizes(
  createTheme({
    spacing: 16,
    typography: {
      fontFamily: 'Open Sans Condensed',
      fontSize: 32
    },
    palette: {
      primary: {
        main: '#007a86'
      },
      secondary: {
        main: '#404444'
      }
    }
  })
);
