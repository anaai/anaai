import { makeStyles } from '@material-ui/core';
import transparentMacbookPng from 'assets/images/devices/macbook-transparent.png';

export const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto'
  },
  mainSectionContentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  heroSectionContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: `${theme.spacing(0.5)}px auto`,
    width: '100%',
    maxWidth: theme.spacing(100),
    flexDirection: 'column'
  },
  heroTextContainer: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(4)
  },
  heroTitle: {
    color: '#fff',
    userSelect: 'none',
    letterSpacing: theme.spacing(1),
    zIndex: 1,
    textShadow: '0 3px 3px #0005',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  heroSubtitle: {
    color: '#fff',
    userSelect: 'none',
    letterSpacing: theme.spacing(1.5),
    paddingLeft: theme.spacing(2),
    zIndex: 1,
    textShadow: '0 3px 3px #0005',
    marginBottom: theme.spacing(2),
    textAlign: 'center'
  },
  heroDescription: {
    textAlign: 'center'
  },
  heroImageContainer: {
    margin: theme.spacing(2),
    width: '100%',
    maxWidth: theme.spacing(90),
    position: 'relative'
  },
  macbookDeviceContainer: {
    position: 'relative',
    height: 0,
    overflow: 'hidden',
    backgroundImage: `url(${transparentMacbookPng})`,
    paddingTop: `${(545 / 920) * 100}%`,
    backgroundPosition: 'center',
    backgroundSize: '100%',
    zIndex: 2,
    pointerEvents: 'none'
  },
  macbookDeviceContentContainer: {
    position: 'absolute',
    top: `${(26 / 545) * 100}%`,
    left: `${(156 / 925) * 100}%`,
    width: `${(594 / 925) * 100}%`,
    height: `${(370 / 545) * 100}%`,
    zIndex: 1,
    '& > div': {
      height: '100%!important'
    }
  },
  ourVisionContainer: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  howItWorksContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: `${theme.spacing(0.5)}px auto`,
    width: '100%',
    maxWidth: theme.spacing(100)
  },
  limitedTransformationsLeadingParahraph: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  howItWorksContentContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  howItWorksVideoContainer: {
    flex: 1,
    display: 'flex',
    padding: theme.spacing(2)
  },
  howItWorksVideo: {
    flex: 1,
    width: '100%'
  },
  howItWorksTextContainer: {
    flex: 1,
    padding: theme.spacing(2)
  },
  howItWorksLeadingParahraph: {},
  howItWorksList: {},
  howItWorksListItem: {
    marginBottom: theme.spacing(1)
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(4)
  },
  ourVisionText: {
    margin: `${theme.spacing(0.5)}px auto`,
    maxWidth: theme.spacing(100),
    padding: theme.spacing(1),
    textAlign: 'center'
  },
  examplesContainer: {
    margin: `${theme.spacing(2)}px auto`,
    maxWidth: theme.spacing(100),
    width: '100%',
    padding: theme.spacing(2)
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
  },
  exampleContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    minHeight: theme.spacing(20),
    width: '100%'
  },
  whatToExpectContainer: {
    margin: `${theme.spacing(5)}px auto ${theme.spacing(15)}px`,
    width: '100%',
    maxWidth: theme.spacing(100)
  },
  whatToExpectLeadingParahraph: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  whatToExpectCardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  whatToExpectCard: {
    margin: theme.spacing(2),
    borderRadius: theme.spacing(0.2),
    backgroundColor: 'rgba(255, 255, 255, .15)',
    backdropFilter: 'blur(5px)',
    boxShadow: theme.shadows[1],
    flex: 1
  },
  whatToExpectCardImage: {
    width: '100%',
    height: theme.spacing(18),
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(20)
    }
  },
  whatToExpectCardTitle: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  whatToExpectCardDescription: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(1)
  }
}));
