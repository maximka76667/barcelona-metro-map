import RotatingBox from "../RotatingBox/RotatingBox";
import Tram from "../Tram/Tram";
import LineStations from "../LineStations/LineStations";
import { useMetroLinesStore } from "../../store";
import { memo } from "react";

const Scene = () => {
  const { lines } = useMetroLinesStore();
  return (
    <>
      <ambientLight intensity={1} />
      <RotatingBox color={"#f00"} />
      <Tram />
      {lines.map(({ node }) => {
        return <LineStations key={node.id} node={node} />;
      })}
    </>
  );
};

export default memo(Scene);
