import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: '100%'
  },
  transformationInfoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    margin: `0 ${theme.spacing(5)}px`,
    maxWidth: theme.spacing(100),
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'initial'
    }
  },
  transformationTitle: {
    marginBottom: theme.spacing(2)
  },
  transformationDescription: {
    marginBottom: theme.spacing(2),
    flex: 1
  },
  transformationStats: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1)
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
  transformationDetailsActionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2)
  },
  generateNowButton: { marginRight: theme.spacing(2) },
  exploreOtherTransformations: {},
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
  examplesTitle: {
    marginBottom: theme.spacing(2)
  },
  galleryContainer: {
    margin: `0 ${theme.spacing(5)}px ${theme.spacing(2)}px`,
    maxWidth: `calc(100% - ${theme.spacing(10)}px)`,
    width: theme.spacing(100)
  },
  galleryContainerInner: {},
  imageList: {},
  galleryImageContainer: {
    '& > div': {
      borderRadius: theme.spacing(0.2),
      boxShadow: theme.shadows[1]
    },
    '& > div > div': {
      height: '100%!important'
    }
  }
}));
