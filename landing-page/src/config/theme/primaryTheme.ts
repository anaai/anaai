import { createTheme, responsiveFontSizes } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';

export const themeGradient = `linear-gradient(200deg, #4099a7 0%, #44bac1 35%, #48bca8 100%), linear-gradient(160deg, #4099a7 0%, #44bac1 35%, #48bca8 100%)`;

const spacing = (n: number) => n * 13;

const defaultTypographyStyles = {
  color: '#fff',
  textShadow: '0 3px 3px #0005'
};
// Theme palette: https://coolors.co/03256c-2541b2-1768ac-06bee1-ffffff
export const primaryTheme = responsiveFontSizes(
  createTheme({
    spacing: spacing(1),
    typography: {
      fontFamily: 'Open Sans Condensed',
      fontSize: spacing(2),
      body1: defaultTypographyStyles,
      body2: defaultTypographyStyles,
      h1: defaultTypographyStyles,
      h2: defaultTypographyStyles,
      h3: defaultTypographyStyles,
      h4: defaultTypographyStyles,
      h5: defaultTypographyStyles,
      h6: defaultTypographyStyles
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
          borderRadius: spacing(0),
          '@media(max-width: 599.95px)': {
            padding: `${spacing(1)}px`
          }
        }
      }
    }
  })
);
