import { Coordinates } from "react-three-map";
import { CoordinatesType } from "../lib/definitions";
import { MathUtils } from "three";
import { useEffect } from "react";

import { Station } from "../lib/definitions";
import { useTramStore } from "../store";

interface LineStationsProps {
  color: string;
  stations: Station[];
}

const LineStations = ({ color, stations }: LineStationsProps) => {
  const { setTargetCoords } = useTramStore();

  const handleConeClick = (newCoordinates: CoordinatesType) => {
    setTargetCoords(newCoordinates);
  };

  useEffect(() => {
    console.log(stations);
  }, [stations]);

  return (
    <>
      {stations.map(
        ({
          node: {
            coordinates: { latitude, longitude },
          },
        }) => (
          <Coordinates latitude={latitude} longitude={longitude}>
            <object3D
              onClick={() => handleConeClick({ lon: longitude, lat: latitude })}
              scale={20}
            >
              <mesh rotation={[MathUtils.degToRad(180), 0, 0]}>
                <coneGeometry />
                <meshBasicMaterial color={`#${color}`} />
              </mesh>
            </object3D>
          </Coordinates>
        )
      )}
    </>
  );
};

export default LineStations;
