import { ReactElement } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import 'components/App.scss';
import { primaryTheme } from 'config/theme/primaryTheme';
import { WalletProvider } from 'contexts/WalletContext';
import { RootView } from './RootView/RootView';

function App(): ReactElement {
  return (
    <ThemeProvider theme={primaryTheme}>
      <CssBaseline />

      <WalletProvider>
        <RootView />
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;
