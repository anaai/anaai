import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  description: {
    marginBottom: theme.spacing(4),
    maxWidth: theme.spacing(60),
    width: '100%',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  }
}));
