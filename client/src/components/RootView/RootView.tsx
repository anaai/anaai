/* eslint-disable react/no-children-prop */
import { Redirect, Route, Switch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { GenerateScene } from 'components/GenerateScene/GenerateScene';
import { LandingScene } from 'components/LandingScene/LandingScene';
import { useStyles } from './RootView.styles';
import { useWallet } from 'contexts/WalletContext/WalletContext';
import { TransformationsScene } from 'components/TransformationsScene/TransformationsScene';
import { TransformationDetailsScene } from 'components/TransformationDetailsScene/TransformationDetailsScene';
import { MyArtScene } from 'components/MyArtScene/MyArtScene';
import { Header } from 'components/Header/Header';

export const RootView: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  const {
    state: { accounts }
  } = useWallet();

  const isWalletConnected = accounts[0];

  return (
    <Box className={classes.root}>
      <Header />

      <Switch>
        {isWalletConnected && (
          <Route exact path="/generate/:transformationName" component={GenerateScene} />
        )}
        {isWalletConnected && <Route exact path="/my-art" component={MyArtScene} />}
        {isWalletConnected && (
          <Route exact path="/transformations" component={TransformationsScene} />
        )}
        {isWalletConnected && (
          <Route
            exact
            path="/transformations/:transformationName"
            component={TransformationDetailsScene}
          />
        )}
        <Route exact path="/" component={LandingScene} />
        <Route path="" render={() => <Redirect to="/" />} />
      </Switch>
    </Box>
  );
};
