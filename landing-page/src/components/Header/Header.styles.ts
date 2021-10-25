import { makeStyles } from '@material-ui/core';
import { themeGradient } from 'config/theme/primaryTheme';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    boxShadow: theme.shadows[2],
    zIndex: 2
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
  },
  goToAppButton: {
    marginLeft: theme.spacing(1)
  }
}));
