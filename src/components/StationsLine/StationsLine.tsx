import { Line } from "@react-three/drei";
import { StationTypeNode } from "../lib/definitions";
import { lonLatToCanvasCoords } from "../lib/utils";
import tinycolor from "tinycolor2";
import { memo } from "react";

interface StationsLineProps {
  index: number;
  route: StationTypeNode[];
  color: string;
}

const StationsLine = ({ index, route, color }: StationsLineProps) => {
  // Get current station, later used as center in calculating next station canvas coords
  const currentStation = route[index];

  const nextRouteStation = route[index + 1];

  // Convert next station coords to { lon, lat } type
  const nextRouteStationCoords = {
    lon: nextRouteStation.coordinates.longitude,
    lat: nextRouteStation.coordinates.latitude,
  };

  // Convert destination point coordinates to canvas coordinates
  const { x, z } = lonLatToCanvasCoords(nextRouteStationCoords, {
    lon: currentStation.coordinates.longitude,
    lat: currentStation.coordinates.latitude,
  });

  const lineColor = tinycolor(`#${color}`).brighten(20).toString();

  return (
    <Line
      linewidth={10}
      color={lineColor}
      points={[
        [0, 0, 0],
        [x, 0, z],
      ]}
    />
  );
};

export default memo(StationsLine);
