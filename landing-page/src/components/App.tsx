import { ReactElement } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import 'components/App.scss';
import { primaryTheme } from 'config/theme/primaryTheme';
import { RootView } from './RootView/RootView';

function App(): ReactElement {
  return (
    <ThemeProvider theme={primaryTheme}>
      <CssBaseline />

      <RootView />
    </ThemeProvider>
  );
}

export default App;
