import { createTheme, responsiveFontSizes } from '@material-ui/core';

// Theme palette: https://coolors.co/03256c-2541b2-1768ac-06bee1-ffffff
export const primaryTheme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: 'Harmattan',
      fontSize: 32
    },
    palette: {
      primary: {
        main: '#1768ac'
      },
      secondary: {
        main: '#06BEE1'
      }
    }
  })
);
