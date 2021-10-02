import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  tranformationCard: {
    borderRadius: theme.spacing(0.2),
    backgroundColor: 'rgba(255, 255, 255, .15)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    margin: theme.spacing(5),
    color: '#fff',
    textShadow: '1px 1px #0005',
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
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse'
    }
  },
  transformationInfoContainer: {
    flex: 1,
    maxWidth: '50%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'initial'
    }
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
  transformationStatValue: {},
  transformationImagesContainer: {
    flex: 1,
    maxWidth: '50%',
    '& > div': {
      height: '100%!important'
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'initial',
      '& > div': {
        height: '400px!important'
      }
    }
  },
  tranformationImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  galleryContainer: {
    margin: theme.spacing(5),
    maxWidth: `calc(100% - ${theme.spacing(10)}px)`,
    width: theme.spacing(100)
  },
  galleryContainerInner: {},
  imageList: {}
}));
