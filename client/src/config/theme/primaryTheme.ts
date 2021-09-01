import { createTheme, responsiveFontSizes } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';

const spacing = (n: number) => n * 16;

// Theme palette: https://coolors.co/03256c-2541b2-1768ac-06bee1-ffffff
export const primaryTheme = responsiveFontSizes(
  createTheme({
    spacing: spacing(1),
    typography: {
      fontFamily: 'Open Sans Condensed',
      fontSize: spacing(2)
    },
    palette: {
      primary: {
        main: '#007a86'
      },
      secondary: {
        main: blueGrey[900]
      }
    },
    overrides: {
      MuiButton: {
        root: {
          letterSpacing: '2px',
          padding: `${spacing(1)}px ${spacing(2)}px`,
          borderRadius: spacing(2),
          '@media(max-width: 599.95px)': {
            padding: `${spacing(1)}px`
          }
        }
      }
    }
  })
);
