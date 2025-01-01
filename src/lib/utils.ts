import { initialCoords } from "./consts";
import { CanvasCoordinatesType, CoordinatesType } from "./definitions";

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
  lonLatCoords: CoordinatesType
): CanvasCoordinatesType {
  const x = ((lonLatCoords.lon - initialCoords.lon) / 0.01) * 83;
  const z = ((lonLatCoords.lat - initialCoords.lat) / 0.01) * -111;
  console.log(x);
  return { x, z };
}

export function canvasToLonLatCoords(
  canvasCoords: CanvasCoordinatesType
): CoordinatesType {
  const lon = (canvasCoords.x / 83) * 0.01 + initialCoords.lon;
  const lat = (canvasCoords.z / -111) * 0.01 + initialCoords.lat;
  return { lon, lat };
}
