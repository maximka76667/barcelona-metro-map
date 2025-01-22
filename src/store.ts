import { create } from "zustand";
import {
  CoordinatesType,
  LineType,
  OrderedLine,
  Route,
  StationTypeNode,
  StationTypeWithLines,
} from "./lib/definitions";

// Store to handle tram movement and position
interface TramStore {
  currentCoords: CoordinatesType;
  targetCoords: CoordinatesType;
  setCurrentCoords: (coords: CoordinatesType) => void; // update coords function
  setTargetCoords: (coords: CoordinatesType) => void;
  currentRotationAngle: number;
  setCurrentRotationAngle: (angle: number) => void;
  currentStation: StationTypeNode | null;
  setCurrentStation: (newStation: StationTypeNode | null) => void;
}

export const useTramStore = create<TramStore>((set) => ({
  currentCoords: { lon: 2.154007, lat: 41.390205 },
  targetCoords: { lon: 2.154007, lat: 41.390205 }, // initial coordinates
  setCurrentCoords: (currentCoords) => set({ currentCoords }), // update coords function
  setTargetCoords: (targetCoords) => set({ targetCoords }),
  currentRotationAngle: 0,
  setCurrentRotationAngle: (angle) => set({ currentRotationAngle: angle }),
  currentStation: null,
  setCurrentStation: (currentStation) => set({ currentStation }),
}));

// Store fetched metro lines and stations
interface MetroLinesStore {
  lines: LineType[];
  setLines: (lines: LineType[]) => void;
  stations: StationTypeWithLines[];
  setStations: (stations: StationTypeWithLines[]) => void;
  orderedLines: OrderedLine[];
  setOrderedLines: (orderedLines: OrderedLine[]) => void;
  routes: Route[];
  setRoutes: (routes: Route[]) => void;
}

export const useMetroLinesStore = create<MetroLinesStore>((set) => ({
  lines: [],
  setLines: (lines) => set({ lines }),
  orderedLines: [],
  setOrderedLines: (orderedLines) => set({ orderedLines }),
  stations: [],
  setStations: (stations) => set({ stations }),
  routes: [],
  setRoutes: (routes) => set({ routes }),
}));

// Store for 'router' feature
interface RouterStore {
  originStation: StationTypeWithLines | null;
  setOriginStation: (originStation: StationTypeWithLines | null) => void;
  destinationStation: StationTypeWithLines | null;
  setDestinationStation: (
    destinationStation: StationTypeWithLines | null
  ) => void;
}

export const useRouterStore = create<RouterStore>((set) => ({
  originStation: null,
  setOriginStation: (originStation) => set({ originStation }),
  destinationStation: null,
  setDestinationStation: (destinationStation) => set({ destinationStation }),
}));
