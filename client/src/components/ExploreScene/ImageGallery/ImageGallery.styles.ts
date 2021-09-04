import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  imageContainer: {
    flex: 1,
    height: theme.spacing(40),
    minWidth: theme.spacing(40),
    maxWidth: theme.spacing(60),
    '& > span': {
      width: '100%',
      height: '100%'
    }
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}));
