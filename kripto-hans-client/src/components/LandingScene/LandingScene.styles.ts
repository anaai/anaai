import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    background: `linear-gradient(200deg, #00555d77 0%, #18abc777 35%, #17ac7f77 100%), linear-gradient(160deg, #00555d77 0%, #18abc777 35%, #17ac7f77 100%)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  heroTitle: {
    color: '#fff',
    userSelect: 'none',
    letterSpacing: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    zIndex: 1,
    textShadow: '0 3px 3px #0005',
    fontWeight: 'bold'
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
    borderRadius: theme.spacing(2)
  }
}));
