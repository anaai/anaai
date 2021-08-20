import { makeStyles } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  tooltipRoot: {
    textAlign: 'center',
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[4]
  },
  infoTooltipRoot: {
    backgroundColor: deepPurple['400']
  },
  infoTooltipArrow: {
    color: deepPurple['400']
  },
  tooltipText: {
    marginBottom: theme.spacing(0.5)
  }
}));
