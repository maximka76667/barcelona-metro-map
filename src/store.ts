import { create } from "zustand";
import { CoordinatesType, Line } from "./lib/definitions";

interface TramStore {
  currentCoords: CoordinatesType;
  targetCoords: CoordinatesType;
  setCurrentCoords: (coords: CoordinatesType) => void; // update coords function
  setTargetCoords: (coords: CoordinatesType) => void;
  currentRotationAngle: number;
  setCurrentRotationAngle: (angle: number) => void;
}

export const useTramStore = create<TramStore>((set) => ({
  currentCoords: { lon: 2.154007, lat: 41.390205 },
  targetCoords: { lon: 2.154007, lat: 41.390205 }, // initial coordinates
  setCurrentCoords: (currentCoords) => set({ currentCoords }), // update coords function
  setTargetCoords: (targetCoords) => set({ targetCoords }),
  currentRotationAngle: 0,
  setCurrentRotationAngle: (angle) => set({ currentRotationAngle: angle }),
}));

interface MetroLinesStore {
  lines: Line[];
  setLines: (lines: Line[]) => void;
}

export const useMetroLinesStore = create<MetroLinesStore>((set) => ({
  lines: [],
  setLines: (lines) => set({ lines }),
}));
