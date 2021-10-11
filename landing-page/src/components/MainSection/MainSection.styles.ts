import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainSectionContentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  heroSectionContainer: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '90vh',
    margin: `${theme.spacing(0.5)}px auto`,
    maxWidth: theme.spacing(100),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  heroTextContainer: {
    flex: 1,
    padding: theme.spacing(2)
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
    margin: theme.spacing(2),
    flex: 1,
    boxShadow: theme.shadows[1],
    [theme.breakpoints.down('md')]: {
      width: '80%',
      minHeight: theme.spacing(20)
    }
  },
  ourVisionContainer: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(30)
  },
  ourVisionText: {
    margin: `${theme.spacing(0.5)}px auto`,
    maxWidth: theme.spacing(100),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));
