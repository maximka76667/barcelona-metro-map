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
  id: number;
  name: string;
  color: string;
  originStation: StationTypeNode;
  endingStation: StationTypeNode;
  stations: {
    edges: StationType[];
  };
}

export interface Route {
  id: string;
  name: string;
  route: StationTypeNode[];
}

export interface OrderedLine {
  id: number;
  name: string;
  color: string;
  originStation: StationTypeNode;
  endingStation: StationTypeNode;
  stations: StationTypeNode[];
}

export type Graph = GraphNode[];

export interface GraphNode {
  station: StationTypeNodeWithLines;
  connectedTo: GraphConnection[];
}

export interface GraphConnection {
  to: StationTypeNode;
  weight: number;
}

export interface Path {
  distance: number;
  path: StationTypeNode[];
}
