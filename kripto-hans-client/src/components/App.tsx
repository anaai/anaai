import 'normalize.css';
import { ReactElement } from 'react';
import './App.scss';
import { LandingScene } from './LandingScene/LandingScene';

function App(): ReactElement {
  return (
    <section className="app-container">
      <LandingScene />
    </section>
  );
}

export default App;
