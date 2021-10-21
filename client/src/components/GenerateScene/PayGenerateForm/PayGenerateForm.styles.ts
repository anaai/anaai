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
  urlInfoMessage: {
    color: '#fff',
    opacity: 0
  },
  urlInfoMessageVisible: {
    opacity: 1
  },
  transformationFieldset: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1),
    paddingTop: 0,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    maxWidth: theme.spacing(40),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    margin: 'auto'
  },
  transformationsRadioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%'
  },
  transformationFormControlLabel: {
    width: theme.spacing(16)
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
