import { Auth } from "./components/Auth";
import { ResourceRender } from "./components/ResourceRender";

function App() {
  const styler = {
  color: "#2CD367",
  filter: "drop-shadow(0px 0px 8px green)",
  fontFamily: '"Datatype", monospace',
  fontSize: "40px",
  fontWeight: 400,
  fontStyle: "normal"
  }

  const stylere = {
  color: "#2CD367",
  filter: "drop-shadow(0px 0px 8px green)",
  fontFamily: '"Datatype", monospace',
  fontWeight: 400,
  fontSize: "90px",
  fontStyle: "normal"
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 style = {stylere}>GasStation </h1>
      <h2 style = {styler}>A Public Resource Library - by PhAnToMxSD</h2>
      <Auth />
      <ResourceRender />
    </div>
  );
}

export default App;
