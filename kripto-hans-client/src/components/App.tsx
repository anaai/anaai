import 'normalize.css';
import { ReactElement } from 'react';
import './App.scss';
import { ImageUploader } from './imageUploader/ImageUploader';
import { WalletConnector } from './WalletConnector/WalletConnector';

function App(): ReactElement {
  return (
    <section className="app-container">
      <h1>Krypto Hans</h1>

      <ImageUploader />

      <WalletConnector />
    </section>
  );
}

export default App;
