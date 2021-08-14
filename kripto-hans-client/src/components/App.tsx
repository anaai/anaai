import { CssBaseline } from '@material-ui/core';
import 'components/App.scss';

import { ReactElement } from 'react';
import { LandingScene } from './LandingScene/LandingScene';

function App(): ReactElement {
  return (
    <>
      <CssBaseline />
      <LandingScene />
    </>
  );
}

export default App;
