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
  }
}));
