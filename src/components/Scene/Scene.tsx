import RotatingBox from "./RotatingBox";
import Tram from "./Tram";
import LineStations from "./LineStations";
import { useMetroLinesStore } from "../store";
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
