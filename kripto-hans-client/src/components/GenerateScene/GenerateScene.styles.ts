import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));
