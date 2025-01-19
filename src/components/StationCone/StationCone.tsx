import { memo, useState } from "react";
import { MathUtils } from "three";
import { StationTypeNode } from "../lib/definitions";
import { useTramStore } from "../store";
import { Html } from "@react-three/drei";
import clsx from "clsx";
import tinycolor from "tinycolor2";

interface StationConeProps {
  color: string;
  index: number;
  station: StationTypeNode;
}

const StationCone = ({ color, station }: StationConeProps) => {
  const {
    name,
    coordinates: { latitude: lat, longitude: lon },
  } = station;
  const { setTargetCoords, setCurrentStation } = useTramStore();
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const handleConeClick = () => {
    setCurrentStation(station);
    setTargetCoords({ lat, lon });
    setIsInfoVisible(true);
  };

  const handleConePointerEnter = () => {
    setIsInfoVisible(true);
  };

  const handleConePointerLeave = () => {
    setIsInfoVisible(false);
  };

  return (
    <>
      <object3D
        onClick={handleConeClick}
        onPointerEnter={handleConePointerEnter}
        onPointerLeave={handleConePointerLeave}
        scale={50}
      >
        <mesh rotation={[MathUtils.degToRad(180), 0, 0]} position={[0, 1.5, 0]}>
          <coneGeometry />
          <meshBasicMaterial color={`#${color}`} />
        </mesh>

        <Html
          style={{
            padding: "4px",
            borderRadius: "8px",
            backgroundColor: tinycolor("#fff").setAlpha(0.5).toString(),
          }}
          className={clsx("invisible transition_3", isInfoVisible && "visible")}
        >
          <p style={{ margin: 0, minWidth: "100px", textAlign: "center" }}>
            {name}
          </p>
        </Html>
      </object3D>
    </>
  );
};

export default memo(StationCone);
