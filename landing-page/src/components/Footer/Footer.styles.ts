import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[1]
  },
  footerContentContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    margin: `${theme.spacing(0.5)}px auto`,
    maxWidth: theme.spacing(100)
  }
}));
