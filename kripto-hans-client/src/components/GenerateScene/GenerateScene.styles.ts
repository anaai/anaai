import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  urlForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageUrlInput: {
    fontSize: theme.spacing(2),
    fontFamily: 'inherit',
    height: theme.spacing(4),
    width: `calc(100vw - ${theme.spacing(4)}px)`,
    maxWidth: theme.spacing(60),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: theme.spacing(2),
    border: `${theme.spacing(0.2)}px solid ${theme.palette.primary.main}`,
    '&:focus-visible': {
      outline: 'none'
    },
    '&:focus': {
      border: `${theme.spacing(0.2)}px solid ${theme.palette.secondary.main}`
    }
  },
  urlErrorMessage: {
    color: '#fff',
    opacity: 0
  },
  urlErrorMessageVisible: {
    opacity: 1
  },
  ctaButtonsContainer: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    display: 'flex'
  },
  payGenerateButton: {
    marginRight: theme.spacing(0.5)
  },
  backButton: {
    marginLeft: theme.spacing(0.5)
  }
}));
