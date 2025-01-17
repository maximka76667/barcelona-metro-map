import "./App.css";
import "maplibre-gl/dist/maplibre-gl.css";
import MapComponent from "./components/MapComponent";
import { Suspense } from "react";

function App() {
  return (
    <div
      style={{
        overflow: "auto",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <Suspense fallback="<p>fetching stations...</p>">
        <MapComponent />
      </Suspense>
    </div>
  );
}

export default App;
