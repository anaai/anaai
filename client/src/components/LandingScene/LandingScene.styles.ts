import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  heroContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(6)
  },
  heroTitle: {
    color: '#fff',
    userSelect: 'none',
    letterSpacing: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    zIndex: 1,
    textShadow: '0 3px 3px #0005',
    fontWeight: 'bold'
  },
  heroSubtitle: {
    color: '#fff',
    userSelect: 'none',
    letterSpacing: theme.spacing(1.5),
    paddingLeft: theme.spacing(2),
    zIndex: 1,
    textShadow: '0 3px 3px #0005',
    marginBottom: theme.spacing(2),
    textAlign: 'center'
  },
  ctaButtonsContainer: {
    display: 'flex'
  },
  generateButton: {
    marginRight: theme.spacing(1)
  },
  acquireButton: {
    marginLeft: theme.spacing(1)
  }
}));
