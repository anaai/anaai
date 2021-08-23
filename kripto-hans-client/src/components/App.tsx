import { ReactElement } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

import 'components/App.scss';
import { primaryTheme } from 'config/theme/primaryTheme';
import { WalletProvider } from 'contexts/WalletContext/WalletContext';
import { RootView } from './RootView/RootView';

function App(): ReactElement {
  return (
    <ThemeProvider theme={primaryTheme}>
      <CssBaseline />

      <Router>
        <WalletProvider>
          <RootView />
        </WalletProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
