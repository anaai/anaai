import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: theme.spacing(40),
    maxWidth: '100vw',
    height: theme.spacing(30),
    maxHeight: '30vh',
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  generatedImagePaper: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut
    })
  },
  generatedImagePaperImageReady: {
    opacity: 1
  },
  generatedImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '100%',
    width: '100%',
    objectFit: 'contain'
  },
  payGeneratingLoadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
    color: '#fff'
  },
  loadingSpinner: {
    zIndex: 1
  }
}));
