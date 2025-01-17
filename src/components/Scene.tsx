import RotatingBox from "./RotatingBox";
import Tram from "./Tram";
import LineStations from "./LineStations";
import { useMetroLinesStore } from "../store";

const Scene = () => {
  const { lines } = useMetroLinesStore();
  return (
    <>
      <ambientLight intensity={1} />
      <RotatingBox color={"#f00"} />
      <Tram />
      {lines.map((line) => {
        return <LineStations node={line.node} />;
      })}
    </>
  );
};

export default Scene;
