import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  headerContentContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    margin: `${theme.spacing(0.5)}px auto`,
    maxWidth: theme.spacing(100)
  },
  logoContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  title: {
    fontWeight: 'bolder',
    letterSpacing: theme.spacing(0.5),
    cursor: 'pointer',
    userSelect: 'none'
  },
  headerActionsContainer: {
    '& > button': {
      marginLeft: theme.spacing(1)
    }
  }
}));
