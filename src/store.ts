import { create } from "zustand";
import { CoordinatesType, LineType, StationTypeNode } from "./lib/definitions";

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

// Use global state with tram coords
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

interface MetroLinesStore {
  lines: LineType[];
  setLines: (lines: LineType[]) => void;
}

// Use global state for fetched metro lines
export const useMetroLinesStore = create<MetroLinesStore>((set) => ({
  lines: [],
  setLines: (lines) => set({ lines }),
}));
