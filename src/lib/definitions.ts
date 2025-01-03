export type CoordinatesType = { lon: number; lat: number };
export type CanvasCoordinatesType = { x: number; z: number };

export interface Station {
  node: {
    id: string;
    name: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface Line {
  node: {
    id: string;
    name: string;
    color: string;
    originStation: {
      id: string;
    };
    endingStation: {
      id: string;
    };
    stations: {
      edges: Station[];
    };
  };
}
