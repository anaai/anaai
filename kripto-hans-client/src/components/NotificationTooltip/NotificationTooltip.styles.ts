import { makeStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  tooltipRoot: {
    textAlign: 'center',
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[4]
  },
  infoTooltipRoot: {
    backgroundColor: purple['300']
  },
  infoTooltipArrow: {
    color: purple['300']
  },
  tooltipText: {
    marginBottom: theme.spacing(0.5)
  }
}));
