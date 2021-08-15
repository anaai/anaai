import { ReactElement } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import 'components/App.scss';
import { primaryTheme } from 'config/theme/primaryTheme';
import { LandingScene } from './LandingScene/LandingScene';

function App(): ReactElement {
  return (
    <ThemeProvider theme={primaryTheme}>
      <CssBaseline />
      <LandingScene />
    </ThemeProvider>
  );
}

export default App;
