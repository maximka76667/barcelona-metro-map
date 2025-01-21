import "maplibre-gl/dist/maplibre-gl.css";
import { initialCoords } from "../../lib/consts";
import { memo } from "react";
import { Map } from "react-map-gl/maplibre";
import { Canvas } from "react-three-map";
import Scene from "../Scene/Scene";

const MapComponent = () => {
  const { lon: initialLon, lat: initialLat } = initialCoords;
  return (
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
