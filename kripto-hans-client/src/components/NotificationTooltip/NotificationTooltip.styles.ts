import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  tooltipRoot: {
    textAlign: 'center',
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[4]
  },
  infoTooltipRoot: {
    backgroundColor: '#fdff87',
    color: '#000'
  },
  infoTooltipArrow: {
    color: '#fdff87'
  },
  successTooltipRoot: {
    backgroundColor: '#7cffae',
    color: '#000'
  },
  successTooltipArrow: {
    color: '#7cffae'
  },
  tooltipText: {
    marginBottom: theme.spacing(0.5)
  }
}));
