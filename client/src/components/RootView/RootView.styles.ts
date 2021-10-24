import { makeStyles } from '@material-ui/core';
import { themeGradient } from 'config/theme/primaryTheme';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    background: themeGradient,
    display: 'flex',
    flexDirection: 'column'
  },
  mainSection: {
    paddingTop: theme.spacing(2),
    flex: 1,
    overflowY: 'auto'
  }
}));
