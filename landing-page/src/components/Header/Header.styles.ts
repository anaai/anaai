import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    zIndex: 2,
    backgroundColor: '#fff'
  },
  headerContentContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    maxWidth: theme.spacing(100)
  },
  logoContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  logo: {
    height: theme.spacing(3),
    width: theme.spacing(8),
    cursor: 'pointer'
  },
  title: {
    fontWeight: 'bolder',
    letterSpacing: theme.spacing(0.5),
    cursor: 'pointer',
    userSelect: 'none'
  },
  headerActionsContainer: {
    display: 'flex',
    '& > button': {
      marginLeft: theme.spacing(1)
    }
  },
  goToAppButton: {
    marginLeft: theme.spacing(1)
  },
  menuButton: {
    marginRight: theme.spacing(1),
    marginLeft: `${theme.spacing(2)}px!important`
  },
  menuItem: {},
  dropdownMenuPaper: {
    backgroundColor: theme.palette.secondary.main
  }
}));
