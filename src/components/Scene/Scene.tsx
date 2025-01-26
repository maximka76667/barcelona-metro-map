import RotatingBox from "../RotatingBox/RotatingBox";
import Tram from "../Tram/Tram";
import LineStations from "../LineStations/LineStations";
import { useMetroLinesStore, useRouterStore } from "../../store";
import { memo } from "react";
import StationsLine from "../StationsLine/StationsLine";
import { Coordinates } from "react-three-map";

const Scene = () => {
  const { orderedLines } = useMetroLinesStore();
  const { path } = useRouterStore();
  return (
    <>
      <ambientLight intensity={1} />
      <RotatingBox color={"#f00"} />
      <Tram />
      {orderedLines.map((line) => {
        return <LineStations key={line.id} line={line} />;
      })}
      <>
        {/* Black route line */}
        {path &&
          path.path.map((node, index) => {
            if (index !== path.path.length - 1) {
              console.log(index);
              return (
                <Coordinates
                  latitude={node.coordinates.latitude}
                  longitude={node.coordinates.longitude}
                >
                  <object3D scale={10} position={[0, 3, 0]}>
                    <StationsLine
                      key={node.id}
                      color="252525"
                      index={index}
                      route={path.path}
                      width={15}
                    />
                  </object3D>
                </Coordinates>
              );
            }
          })}
      </>
    </>
  );
};

export default memo(Scene);
