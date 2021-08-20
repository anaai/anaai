import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    background: `linear-gradient(200deg, #00555d88 0%, #18abc887 35%, #17ac7f88 100%), linear-gradient(160deg, #00555d88 0%, #18abc887 35%, #17ac7f88 100%)`,
    display: 'flex',
    flexDirection: 'column'
  },
  headerContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));
