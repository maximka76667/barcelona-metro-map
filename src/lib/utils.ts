import { initialCoords } from "./consts";
import {
  CanvasCoordinatesType,
  CoordinatesType,
  Graph,
  GraphConnection,
  OrderedLine,
  StationType,
  StationTypeNode,
  StationTypeNodeWithLines,
  StationTypeWithLines,
} from "./definitions";

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
          return {
            distance: newShortestDistance,
            station,
          };
        }
        return {
          distance: prev.distance,
          station: prev.station,
        };
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

// This function add connection only if they don't already exist for this node
function addGraphConnection(
  result: GraphConnection[],
  stationNode: StationTypeNodeWithLines,
  newStation: StationTypeNode
) {
  // Check if connection to some station already was added to result
  // If it not there add it
  if (
    result.findIndex(
      (graphConnection) => graphConnection.to.id == newStation.id
    ) === -1
  ) {
    const { longitude: lonX, latitude: latX } = stationNode.coordinates;
    const { longitude: lonY, latitude: latY } = newStation.coordinates;

    result.push({
      to: newStation,
      // It's not actually correct to calculate distance this way
      // without converting longitudes and latitudes to anything
      // but I do it because I needed only relative distance from the point
      // To know which distance is shorter
      // Multiply by 1000 just to see easier which station relatively closer
      weight: 1000 * calculateDistance(lonX, latX, lonY, latY),
    });
  }
}

// Function which takes station with it's metro lines
// and array of all metro lines ordered from origin station to final station
// Returns directly connected stations to a passed station
export const getAdjacentStations = (
  station: StationTypeWithLines,
  orderedLines: OrderedLine[]
): GraphConnection[] => {
  const stationNode = station.node;
  const result: GraphConnection[] = [];

  // Go through lines names of station
  stationNode.lines.forEach((lineName) => {
    // Find line (which includes all info about its stations) by its name
    const currentLine = orderedLines.find((line) => line.name == lineName);

    // This line will always exist, but this if was made to pass typescript check
    // because previous .find() can possibly return undefined
    if (currentLine) {
      // Index of station for current metro line
      const currentStationIndex = currentLine.stations.findIndex(
        (lineStation) => lineStation.id == stationNode.id
      );

      // Next ifs handle adding stations to prevent out of bound array error
      // When station is first
      // it doesn't have previous station so we don't try to add it
      // Same for the last station which doesn't have next station

      // If station is not first we add previous one
      if (currentStationIndex !== 0) {
        const prevStation = currentLine.stations[currentStationIndex - 1];
        addGraphConnection(result, stationNode, prevStation);
      }

      // If station is not last one, we get next station
      if (currentStationIndex !== currentLine.stations.length - 1) {
        const nextStation = currentLine.stations[currentStationIndex + 1];
        addGraphConnection(result, stationNode, nextStation);
      }
    }
  });

  return result;
};

class PriorityQueue {
  queue: { nodeId: string; priority: number }[];

  constructor() {
    this.queue = [];
  }

  enqueue(nodeId: string, priority: number) {
    this.queue.push({ nodeId, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    if (this.queue.length !== 0) {
      return this.queue.shift()!.nodeId;
    }
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

function findStationById(graph: Graph, id: string) {
  return graph.find((node) => node.station.id === id);
}

export function dijkstra(graph: Graph, startId: string, endId: string) {
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string } = {};
  const pq = new PriorityQueue();

  // Initialize distances and queue
  for (const node of graph) {
    const { station } = node;
    distances[station.id] = Infinity;
    previous[station.id] = "";
  }
  distances[startId] = 0;

  pq.enqueue(startId, 0);

  while (!pq.isEmpty()) {
    const currentId = pq.dequeue();

    if (!currentId) {
      continue;
    }

    const currentStation = findStationById(graph, currentId);

    if (!currentStation) {
      continue;
    }

    if (currentId === endId) break; // Reached destination

    for (const edge of currentStation.connectedTo) {
      const neighbor = edge.to.id;
      const weight = edge.weight;
      const newDist = distances[currentId] + weight;

      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        previous[neighbor] = currentId;

        pq.enqueue(neighbor, newDist);
      }
    }
  }

  // Reconstruct the shortest path
  const path = [];
  let current = endId;
  while (current) {
    const graphNode = findStationById(graph, current);

    if (!graphNode) {
      return;
    }

    // Get station from graph node
    const stationWithLines = graphNode.station;

    // Convert station with lines into station
    const station: StationTypeNode = {
      coordinates: stationWithLines.coordinates,
      id: stationWithLines.id,
      name: stationWithLines.name,
    };

    path.unshift(station);
    current = previous[current];
  }

  return { distance: distances[endId], path };
}
