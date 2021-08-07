import "normalize.css";
import "./App.scss";
import { ImageUploader } from "./imageUploader/ImageUploader";

function App() {
  return (
    <section className="app-container">
      <h1>Krypto Hans</h1>

      <ImageUploader />
    </section>
  );
}

export default App;
