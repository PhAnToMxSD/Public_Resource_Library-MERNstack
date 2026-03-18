import { Auth } from "./components/Auth";
import { ResourceRender } from "./components/ResourceRender";

function App() {
  return (
    <div className="app-shell">
      <div className="page-container">
        <header className="hero-panel">
          <p className="hero-kicker">Public Resource Hub</p>
          <h1 className="hero-title">Gas_Station</h1>
          <p className="hero-subtitle">
            A collaborative e-library where the community shares high-value resources.
          </p>
          <Auth />
        </header>
        <ResourceRender />
      </div>
    </div>
  );
}

export default App;
