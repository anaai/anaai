import 'normalize.css';
import 'shared/styles/Reset.scss';
import 'shared/styles/Global.scss';
import 'components/App.scss';

import { ReactElement } from 'react';
import { LandingScene } from './LandingScene/LandingScene';

function App(): ReactElement {
  return (
    <section className="app-container">
      <LandingScene />
    </section>
  );
}

export default App;
