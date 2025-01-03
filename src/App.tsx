import "./App.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { Map } from "react-map-gl/maplibre";
import { Canvas } from "react-three-map/maplibre";
import Scene from "./components/Scene";
import { initialCoords } from "./lib/consts";
import { useQuery } from "@apollo/client";
import { GET_STATIONS } from "./lib/queries";

function App() {
  const { lon: initialLon, lat: initialLat } = initialCoords;
  const { loading, error, data } = useQuery(GET_STATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

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
