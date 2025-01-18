import { LineType } from "../lib/definitions";
import Station from "./Station";
import { getRouteOfClosestPoints } from "../lib/utils";
import { memo } from "react";

type LineStationsProps = LineType;

const LineStations = ({
  node: { color, stations, originStation },
}: LineStationsProps) => {
  // if (color != "FB712B") return;

  const route = getRouteOfClosestPoints(stations.edges, originStation);

  return (
    <>
      {route.map(({ id, coordinates: { latitude, longitude } }, index) => (
        <Station
          key={id}
          color={color}
          latitude={latitude}
          longitude={longitude}
          index={index}
          station={route[index]}
          route={route}
        />
      ))}
    </>
  );
};

export default memo(LineStations);
