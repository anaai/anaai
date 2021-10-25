import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: 'min-content'
  },
  rootContentContainer: {},
  imageContainer: {
    flex: 1,
    height: theme.spacing(60),
    minWidth: theme.spacing(60),
    maxWidth: theme.spacing(60),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
    '& > span': {
      width: '100%',
      flexShrink: 0,
      flex: 1,
      display: 'flex!important',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: theme.spacing(5)
    }
  },
  tokenName: {
    flex: 0,
    marginBottom: theme.spacing(1)
  },
  tokenLink: {
    '&:hover': {
      textDecoration: 'none'
    }
  },
  image: {
    flex: 1,
    objectFit: 'cover'
  }
}));
