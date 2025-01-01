import "./App.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { Map } from "react-map-gl/maplibre";
import { Canvas } from "react-three-map/maplibre";
import Scene from "./components/Scene";
import { initialCoords } from "./lib/consts";

function App() {
  const { lon: initialLon, lat: initialLat } = initialCoords;
  return (
    <div
      style={{
        overflow: "auto",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <Map
        antialias
        initialViewState={{
          longitude: initialLon,
          latitude: initialLat,
          zoom: 15,
          pitch: 40,
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      >
        <Canvas longitude={initialLon} latitude={initialLat}>
          <Scene />
        </Canvas>
      </Map>
    </div>
  );
}

// return (
//   <>
//     <Scene />
//   </>

// );

export default App;
