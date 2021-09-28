import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
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
