import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  tranformationCard: {
    borderRadius: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, .15)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    margin: theme.spacing(5),
    color: '#fff',
    textShadow: '1px 1px #0005',
    cursor: 'pointer',
    userSelect: 'none',
    overflow: 'hidden',
    maxWidth: theme.spacing(100),
    boxShadow: theme.shadows[1],
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut
    }),
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .20)'
    }
  },
  transformationInfoContainer: {
    flex: 1,
    maxWidth: '50%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2)
  },
  transformationTitle: {
    marginBottom: theme.spacing(1)
  },
  transformationDescription: {
    marginBottom: theme.spacing(2),
    flex: 1
  },
  transformationStats: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  transformationStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    textAlign: 'center'
  },
  transformationStatValue: {
    marginBottom: theme.spacing(1)
  },
  transformationImagesContainer: {
    flex: 1,
    maxWidth: '50%',
    '& > div': {
      height: '100%!important'
    }
  },
  tranformationImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}));
