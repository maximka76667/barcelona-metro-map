import "maplibre-gl/dist/maplibre-gl.css";
import { useQuery } from "@apollo/client";
import { initialCoords } from "../lib/consts";
import { GET_LINES } from "../lib/queries";
import { useMetroLinesStore } from "../store";
import { memo, useEffect } from "react";
import { Map } from "react-map-gl/maplibre";
import { Canvas } from "react-three-map";
import Scene from "./Scene";

const MapComponent = () => {
  const { lon: initialLon, lat: initialLat } = initialCoords;
  const { setLines } = useMetroLinesStore();

  const { data, loading, error } = useQuery(GET_LINES);

  useEffect(() => {
    if (data) {
      console.log(data.metroLines.edges);
      setLines(data.metroLines.edges);
    }
  }, [data, loading, setLines]);

  return loading || error ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <p>Fetching stations info...</p>
      ) : (
        <p>Error on fetching metro lines</p>
      )}
    </div>
  ) : (
    <Map
      antialias
      maxZoom={15}
      minZoom={12}
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
  );
};

export default memo(MapComponent);
