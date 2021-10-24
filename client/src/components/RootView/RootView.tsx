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
    state: { accounts, chainIdHex }
  } = useWallet();

  const isWalletConnected = accounts[0];
  const isCorrectChainId = chainIdHex === process.env.REACT_APP_CHAIN_ID_HEX;
  const shouldAllowEntry = isWalletConnected && isCorrectChainId;

  return (
    <Box className={classes.root}>
      <Header />

      <Switch>
        {shouldAllowEntry && (
          <Route exact path="/generate/:transformationName" component={GenerateScene} />
        )}
        {shouldAllowEntry && <Route exact path="/my-art" component={MyArtScene} />}
        {shouldAllowEntry && (
          <Route exact path="/transformations" component={TransformationsScene} />
        )}
        {shouldAllowEntry && (
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
