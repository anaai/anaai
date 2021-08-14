import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    background: `linear-gradient(200deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 35%, ${theme.palette.secondary.light} 100%)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  heroTitle: {
    color: '#fff',
    userSelect: 'none'
  },
  ctaButtonsContainer: {},
  generateButton: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    marginRight: theme.spacing(1),
    borderRadius: theme.spacing(2)
  },
  acquireButton: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    marginLeft: theme.spacing(1),
    borderRadius: theme.spacing(2),
    color: '#fff',
    backgroundColor: '#26b76e',
    '&:hover': {
      backgroundColor: '#14663D'
    }
  }
}));
