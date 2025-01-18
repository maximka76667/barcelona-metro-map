import { initialCoords } from "./consts";
import {
  CanvasCoordinatesType,
  CoordinatesType,
  StationType,
  StationTypeNode,
} from "./definitions";

export function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  // Convert degrees to radians
  const toRad = (degree: number) => degree * (Math.PI / 180);

  // Radius of the Earth in kilometers
  const R = 6371;

  // Difference between latitudes and longitudes
  const deltaLat = toRad(lat2 - lat1);
  const deltaLon = toRad(lon2 - lon1);

  // Haversine formula
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  const distance = R * c;
  return distance; // Distance in kilometers
}

export function lonLatToCanvasCoords(
  lonLatCoords: CoordinatesType,
  center: CoordinatesType = initialCoords
): CanvasCoordinatesType {
  const x = ((lonLatCoords.lon - center.lon) / 0.01) * 83;
  const z = ((lonLatCoords.lat - center.lat) / 0.01) * -111;
  return { x, z };
}

export function canvasToLonLatCoords(
  canvasCoords: CanvasCoordinatesType
): CoordinatesType {
  const lon = (canvasCoords.x / 83) * 0.01 + initialCoords.lon;
  const lat = (canvasCoords.z / -111) * 0.01 + initialCoords.lat;
  return { lon, lat };
}

export function getShortestRotationAngle(
  currentAngle: number,
  targetAngle: number
): number {
  let delta = (targetAngle - currentAngle) % 360;

  // Adjust delta to the shortest path
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;

  return currentAngle + delta;
}

export function calculateDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

export function getRouteOfClosestPoints(
  arrayOfStations: StationType[],
  initialStation: StationTypeNode
): StationTypeNode[] {
  // Array of stations without initial station
  let unsortedStations = arrayOfStations.filter(
    (station) => station.node.id !== initialStation.id
  );

  // Sorted route
  const sortedStations = [initialStation];

  const initialUnsortedLength = unsortedStations.length;

  for (let i = 0; i < initialUnsortedLength - 1; i++) {
    // Last visited station
    const lastStation = sortedStations[sortedStations.length - 1];

    // Find the closest station to the last station in the result station from unsorted stations
    // By passing distance and station through reduce
    const closestStation = unsortedStations.reduce<{
      distance: number;
      station: StationType;
    }>(
      (prev, station) => {
        const { coordinates } = station.node;
        const newShortestDistance = calculateDistance(
          coordinates.latitude,
          coordinates.longitude,
          lastStation.coordinates.latitude,
          lastStation.coordinates.longitude
        );
        if (newShortestDistance < prev.distance && newShortestDistance > 0) {
          return { distance: newShortestDistance, station };
        }
        return { distance: prev.distance, station: prev.station };
      },
      { distance: Infinity, station: { node: lastStation } }
    ).station;

    // Add closest station to final route
    sortedStations.push(closestStation.node);

    // Delete current closest station from unsorted list
    unsortedStations = unsortedStations.filter(
      (station) => station.node.id !== closestStation.node.id
    );
  }

  sortedStations.push(unsortedStations[0].node);

  return sortedStations;
}
