import React from "react";
import { MathUtils } from "three";
import { CoordinatesType, StationTypeNode } from "../lib/definitions";
import { useTramStore } from "../store";
import { Html } from "@react-three/drei";

interface StationConeProps {
  color: string;
  index: number;
  station: StationTypeNode;
}

const StationCone = ({
  color,
  index,
  station: {
    id,
    name,
    coordinates: { latitude: lat, longitude: lon },
  },
}: StationConeProps) => {
  const { setTargetCoords } = useTramStore();

  const handleConeClick = (newCoordinates: CoordinatesType) => {
    setTargetCoords(newCoordinates);
  };

  return (
    <>
      <object3D onClick={() => handleConeClick({ lon, lat })} scale={30}>
        <mesh rotation={[MathUtils.degToRad(180), 0, 0]} position={[0, 1.5, 0]}>
          <coneGeometry />
          <meshBasicMaterial color={`#${color}`} />
        </mesh>
        {/* <Html>
          {
            <p>
              {index} {id}, {name}
            </p>
          }
        </Html> */}
      </object3D>
    </>
  );
};

export default StationCone;
