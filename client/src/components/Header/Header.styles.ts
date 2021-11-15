import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'center'
  },
  appBar: {
    backgroundColor: '#fff'
  },
  toolbar: {
    minHeight: 'auto'
  },
  logoContainer: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    marginRight: theme.spacing(1),
    height: theme.spacing(3),
    width: theme.spacing(8)
  },
  spacerBox: {
    flex: 1
  },
  ctaButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    opacity: 0,
    visibility: 'hidden',
    transform: 'translate(0, -2rem)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeOut
    })
  },
  generateButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  transformationsButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  myArtButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  activeButton: {},
  menuButton: {
    marginLeft: theme.spacing(1),
    opacity: 0,
    visibility: 'hidden',
    transform: 'translate(0, -2rem)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeOut
    })
  },
  menuItem: {},
  show: {
    opacity: 1,
    visibility: 'visible',
    transform: 'translate(0)'
  },
  dropdownMenuPaper: {
    backgroundColor: theme.palette.secondary.main
  }
}));
