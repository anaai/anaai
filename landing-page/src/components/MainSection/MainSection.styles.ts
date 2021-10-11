import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  mainSectionContentContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    margin: `${theme.spacing(0.5)}px auto`,
    maxWidth: theme.spacing(100)
  },
  heroSectionContainer: {
    display: 'flex'
  },
  heroTextContainer: {
    flex: 1
  },
  heroTitle: {
    color: '#fff',
    userSelect: 'none',
    letterSpacing: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    zIndex: 1,
    textShadow: '0 3px 3px #0005',
    fontWeight: 'bold',
    textAlign: 'center'
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
  heroDescription: {},
  heroImageContainer: {
    flex: 1
  }
}));
