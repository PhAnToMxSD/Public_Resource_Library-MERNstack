import { Auth } from "./components/Auth";
import { ResourceRender } from "./components/ResourceRender";

function App() {
  const styler = {
    color: "#2CD367",
    filter: "drop-shadow(0px 0px 8px green)",
     fontFamily: '"Bitcount Grid Double", system-ui',
    fontSize: "40px",
    fontWeight: 400,
    fontStyle: "normal",
    marginBottom: "30px",
  };

  const stylere = {
    color: "#2CD367",
    filter: "drop-shadow(0px 0px 8px green)",
    fontFamily: '"Datatype", monospace',
    fontWeight: 400,
    fontSize: "90px",
    fontStyle: "normal",
  };

  return (
    <div className="text-center flex flex-col justify-center items-center gap-4">
      <h1 style={stylere}>Gas_Station </h1>
      <h2 style={styler}>A Public Resource E-Library - by PhAnToMxSD</h2>
      <Auth />
      <hr
        style={{
          border: "none",
          height: "14px",
          backgroundColor: "#2CD367",
          margin: "20px 0",
          width: "100vw",
        }}
      />
      <ResourceRender />
    </div>
  );
}

export default App;
