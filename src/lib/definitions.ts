export type CoordinatesType = { lon: number; lat: number };
export type CanvasCoordinatesType = { x: number; z: number };

export interface StationType {
  node: StationTypeNode;
}

export interface StationTypeWithLines {
  node: StationTypeNodeWithLines;
}

export interface StationTypeNode {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export type StationTypeNodeWithLines = StationTypeNode & { lines: string[] };

export interface LineType {
  node: LineTypeNode;
}

export interface LineTypeNode {
  id: string;
  name: string;
  color: string;
  originStation: StationTypeNode;
  endingStation: StationTypeNode;
  stations: {
    edges: StationType[];
  };
}
