import { makeStyles } from '@material-ui/core';
import { themeGradient } from 'config/theme/primaryTheme';

export const useStyles = makeStyles(() => ({
  metamaskButton: {},
  metamaskConnectedButton: {
    background: themeGradient
  }
}));
