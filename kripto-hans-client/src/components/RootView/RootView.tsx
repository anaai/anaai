/* eslint-disable react/no-children-prop */
import { Redirect, Route, Switch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { GenerateScene } from 'components/GenerateScene/GenerateScene';
import { LandingScene } from 'components/LandingScene/LandingScene';
import { WalletConnector } from 'components/WalletConnector/WalletConnector';
import { useStyles } from './RootView.styles';

export const RootView: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.headerContainer}>
        <WalletConnector />
      </Box>

      <Switch>
        <Route exact path="/" component={LandingScene} />
        <Route exact path="/generate" component={GenerateScene} />
        <Route path="" render={() => <Redirect to="/" />} />
      </Switch>
    </Box>
  );
};
