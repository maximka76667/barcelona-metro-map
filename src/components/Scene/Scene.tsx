import RotatingBox from "../RotatingBox/RotatingBox";
import Tram from "../Tram/Tram";
import LineStations from "../LineStations/LineStations";
import { useMetroLinesStore } from "../../store";
import { memo } from "react";

const Scene = () => {
  const { orderedLines } = useMetroLinesStore();
  return (
    <>
      <ambientLight intensity={1} />
      <RotatingBox color={"#f00"} />
      <Tram />
      {orderedLines.map((line) => {
        return <LineStations key={line.id} line={line} />;
      })}
    </>
  );
};

export default memo(Scene);
