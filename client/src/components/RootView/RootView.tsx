/* eslint-disable react/no-children-prop */
import { Redirect, Route, Switch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { GenerateScene } from 'components/GenerateScene/GenerateScene';
import { LandingScene } from 'components/LandingScene/LandingScene';
import { WalletConnector } from 'components/WalletConnector/WalletConnector';
import { useStyles } from './RootView.styles';
import { ExploreScene } from 'components/ExploreScene/ExploreScene';
import { useWallet } from 'contexts/WalletContext/WalletContext';
import { TransformationsScene } from 'components/TransformationsScene/TransformationsScene';

export const RootView: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  const {
    state: { accounts }
  } = useWallet();

  const isWalletConnected = accounts[0];

  return (
    <Box className={classes.root}>
      <Box className={classes.headerContainer}>
        <WalletConnector />
      </Box>

      <Switch>
        {isWalletConnected && <Route path="/generate" component={GenerateScene} />}
        {isWalletConnected && <Route path="/explore" component={ExploreScene} />}
        <Route path="/transformations" component={TransformationsScene} />

        <Route exact path="/" component={LandingScene} />
        <Route path="" render={() => <Redirect to="/" />} />
      </Switch>
    </Box>
  );
};
