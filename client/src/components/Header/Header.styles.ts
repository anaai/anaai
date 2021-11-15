import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'center'
  },
  appBar: {},
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
  },
  menuButton: {
    color: '#fff',
    marginLeft: theme.spacing(1),
    border: `2px solid ${theme.palette.secondary.main}`,
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
