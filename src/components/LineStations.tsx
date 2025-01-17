import { LineType } from "../lib/definitions";
import Station from "./Station";
import { getRouteOfClosestPoints } from "../lib/utils";

type LineStationsProps = LineType;

const LineStations = ({
  node: { color, stations, originStation },
}: LineStationsProps) => {
  // if (color != "FB712B") return;

  console.log("Stations: ", stations.edges);
  console.log("Origin Station: ", originStation);
  const route = getRouteOfClosestPoints(stations.edges, originStation);

  console.log("Route: ", route);

  return (
    <>
      {route.map(({ coordinates: { latitude, longitude } }, index) => (
        <Station
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

export default LineStations;
