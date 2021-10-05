import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ctaButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',

    opacity: 0,
    transform: 'translate(0, -2rem)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeOut
    })
  },
  show: {
    opacity: 1,
    transform: 'translate(0)'
  },
  homeButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  generateButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  transformationsButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  myArtButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  activeButton: {
    backgroundColor: grey[200],
    color: grey[900],
    '&:hover': {
      backgroundColor: grey[50]
    }
  }
}));
