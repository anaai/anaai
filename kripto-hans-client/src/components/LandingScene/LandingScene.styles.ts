import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    background: `linear-gradient(200deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 35%, ${theme.palette.secondary.light} 100%)`
  },
  heroTitle: {
    color: '#fff'
  }
}));
