import { StationTypeNode } from "../lib/definitions";
import { Coordinates } from "react-three-map";
import StationsLine from "./StationsLine";
import React from "react";
import StationCone from "./StationCone";

interface StationProps {
  color: string;
  latitude: number;
  longitude: number;
  index: number;
  route: StationTypeNode[];
  station: StationTypeNode;
}

const Station = ({
  color,
  latitude,
  longitude,
  index,
  route,
  station,
}: StationProps) => {
  return (
    <>
      {/* 'Coordinates' tag places all children on some latitude and longitude */}
      <Coordinates latitude={latitude} longitude={longitude}>
        <StationCone color={color} station={station} index={index} />
        <object3D scale={10}>
          {index + 1 !== route.length && (
            <StationsLine color={color} index={index} route={route} />
          )}
        </object3D>
      </Coordinates>
    </>
  );
};

export default React.memo(Station);
