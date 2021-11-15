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
    justifyContent: 'center',
    maxWidth: theme.spacing(100),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    },
    '& > span': {
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut
      }),
      [theme.breakpoints.down('xs')]: {
        transform: 'rotate(90deg)'
      }
    }
  },
  socialbutton: {
    color: '#fff',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  icon: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    marginRight: theme.spacing(0.5)
  }
}));
