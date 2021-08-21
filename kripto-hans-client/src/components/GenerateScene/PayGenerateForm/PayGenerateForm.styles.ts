import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
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
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    display: 'flex'
  },
  payGenerateButton: {
    marginRight: theme.spacing(0.5)
  },
  backButton: {
    marginLeft: theme.spacing(0.5)
  }
}));
