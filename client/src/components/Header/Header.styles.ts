import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'center'
  },
  appBar: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5)
  },
  logo: {
    letterSpacing: theme.spacing(1),
    fontWeight: 'bold',
    marginRight: theme.spacing(1)
  },
  ctaButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1,
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
    color: '#fff',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    border: `2px solid ${theme.palette.secondary.main}`
  },
  generateButton: {
    color: '#fff',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    border: `2px solid ${theme.palette.secondary.main}`
  },
  transformationsButton: {
    color: '#fff',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    border: `2px solid ${theme.palette.secondary.main}`
  },
  myArtButton: {
    color: '#fff',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    border: `2px solid ${theme.palette.secondary.main}`
  },
  activeButton: {
    border: `2px solid ${grey[200]}`
  }
}));
