import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    background: `linear-gradient(200deg, #00555d88 0%, #18abc887 35%, #17ac7f88 100%), linear-gradient(160deg, #00555d88 0%, #18abc887 35%, #17ac7f88 100%)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  headerContainer: {},
  metamaskButton: {
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(2),
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
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
    marginBottom: theme.spacing(2)
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
