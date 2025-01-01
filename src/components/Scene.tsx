import RotatingBox from "./RotatingBox";
import { Coordinates } from "react-three-map";
import Tram from "./Tram";
import { MathUtils } from "three";
import { CoordinatesType } from "../lib/definitions";
import { useTramStore } from "../store";

const Scene = () => {
  const { setTargetCoords } = useTramStore();

  const handleConeClick = (newCoordinates: CoordinatesType) => {
    setTargetCoords(newCoordinates);
  };

  return (
    <>
      <ambientLight intensity={1} />
      <RotatingBox color={"#f00"} />
      <Tram />
      <Coordinates latitude={41.380205} longitude={2.154007}>
        <object3D
          onClick={() => handleConeClick({ lon: 2.154007, lat: 41.380205 })}
          scale={20}
        >
          <mesh rotation={[MathUtils.degToRad(180), 0, 0]}>
            <coneGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </object3D>
      </Coordinates>
      <Coordinates latitude={41.380205} longitude={2.158007}>
        <object3D
          onClick={() => handleConeClick({ lon: 2.158007, lat: 41.380205 })}
          scale={20}
        >
          <mesh rotation={[MathUtils.degToRad(180), 0, 0]}>
            <coneGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </object3D>
      </Coordinates>
    </>
  );
};

export default Scene;
