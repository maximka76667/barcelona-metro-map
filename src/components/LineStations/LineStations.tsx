import { OrderedLine } from "../../lib/definitions";
import Station from "../Station/Station";
import { memo } from "react";

type LineStationsProps = { line: OrderedLine };

const LineStations = ({ line: { color, stations } }: LineStationsProps) => {
  return (
    <>
      {stations.map(({ id, coordinates: { latitude, longitude } }, index) => (
        <Station
          key={id}
          color={color}
          latitude={latitude}
          longitude={longitude}
          index={index}
          station={stations[index]}
          route={stations}
        />
      ))}
    </>
  );
};

export default memo(LineStations);
