import { makeStyles } from '@material-ui/core';
import { themeGradient } from 'config/theme/primaryTheme';

export const useStyles = makeStyles((theme) => ({
  metamaskButton: {
    marginLeft: theme.spacing(1),
    alignSelf: 'stretch',
    zIndex: 1
  },
  metamaskConnectedButton: {
    background: themeGradient,
    '& > span': {
      display: 'flex',
      flexWrap: 'wrap'
    }
  }
}));
