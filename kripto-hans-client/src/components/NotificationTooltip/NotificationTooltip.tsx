import { ReactElement, useEffect, useRef, useState } from 'react';
import { Tooltip, Typography } from '@material-ui/core';
import { createSetSnackMessageAction, useWallet } from 'contexts/WalletContext';
import { useStyles } from './NotificationTooltip.styles';
import { NOTIFICATION_CLOSE_DELAY, SnackMessage } from 'config/snacks/snacks';

export const NotificationTooltip: React.FC<{ children: ReactElement }> = ({ children }) => {
  const {
    state: { snackMessage },
    dispatch
  } = useWallet();

  const [persistedMessage, setPersistedMessage] = useState<SnackMessage>(null);

  const tooltipCloseTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (snackMessage) {
      setPersistedMessage(snackMessage);

      clearTimeout(tooltipCloseTimeout.current as NodeJS.Timeout);
      tooltipCloseTimeout.current = setTimeout(() => {
        dispatch(createSetSnackMessageAction(null));
      }, NOTIFICATION_CLOSE_DELAY);
    }
  }, [snackMessage, dispatch]);

  const classes = useStyles();

  return (
    // TODO: Implement console error fix once it is ready in: https://github.com/mui-org/material-ui/issues/13394#issuecomment-900083405
    <Tooltip
      arrow
      classes={{
        tooltip: `${classes.tooltipRoot} ${
          persistedMessage?.type === 'info' ? classes.infoTooltipRoot : ''
        } ${persistedMessage?.type === 'success' ? classes.successTooltipRoot : ''}`,
        arrow: `${persistedMessage?.type === 'info' ? classes.infoTooltipArrow : ''}
        ${persistedMessage?.type === 'success' ? classes.successTooltipArrow : ''}
        `
      }}
      open={Boolean(snackMessage)}
      title={
        <Typography className={classes.tooltipText} variant="subtitle2">
          {persistedMessage?.message}
        </Typography>
      }
    >
      {children}
    </Tooltip>
  );
};
