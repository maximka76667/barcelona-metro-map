import "./App.css";
import "maplibre-gl/dist/maplibre-gl.css";
import MapComponent from "./components/MapComponent/MapComponent";
import Info from "./components/Info/Info";
import { useQuery } from "@apollo/client";
import { LineType, StationTypeWithLines } from "./lib/definitions";
import { useMetroLinesStore, useRouterStore } from "./store";
import { GET_LINES, GET_STATIONS } from "./lib/queries";
import { useEffect } from "react";
import { getAdjacentStations, getRouteOfClosestPoints } from "./lib/utils";

function App() {
  const { setStations, orderedLines, setOrderedLines } = useMetroLinesStore();
  const { setOriginStation, setDestinationStation } = useRouterStore();

  const { data, loading, error } = useQuery(GET_LINES);

  const {
    data: stationsData,
    loading: stationsLoading,
    error: stationsError,
  } = useQuery<{ metroStations: { edges: StationTypeWithLines[] } }>(
    GET_STATIONS
  );

  useEffect(() => {
    if (data) {
      // Store metro lines into global state for metro lines
      console.log(data.metroLines.edges);

      const fetchedLines: LineType[] = data.metroLines.edges;

      // Converting API data into working structure
      const orderedLines = fetchedLines.map(
        ({
          node: { id, name, color, originStation, endingStation, stations },
        }) => {
          return {
            id,
            name,
            color,
            originStation,
            endingStation,
            stations: getRouteOfClosestPoints(stations.edges, originStation),
          };
        }
      );

      setOrderedLines(orderedLines);

      console.log("App routes: ", orderedLines);
    }
  }, [data, setOrderedLines]);

  useEffect(() => {
    if (stationsData) {
      // Store stations into global state
      console.log(stationsData.metroStations.edges);
      setStations(stationsData.metroStations.edges);

      // Demo example: make origin = Hospital Clínic station
      setOriginStation(
        stationsData.metroStations.edges.filter(
          (station) => station.node.id == "6660520"
        )[0]
      );

      // Demo example: make destination = Liceu station
      setDestinationStation(
        stationsData.metroStations.edges.filter(
          (station) => station.node.id == "6660325"
        )[0]
      );

      // Convert stations data into graph to apply later Dijkstra to find shortest path
      const graph = stationsData.metroStations.edges.map((station) => {
        return {
          station: station.node,
          connectedTo: getAdjacentStations(station, orderedLines),
        };
      });

      console.log("GRAPH: ", graph);
    }
  }, [
    setDestinationStation,
    setOriginStation,
    setStations,
    stationsData,
    orderedLines,
  ]);

  return loading || error || stationsLoading || stationsError ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading || stationsLoading ? (
        <p>Fetching stations info...</p>
      ) : (
        <p>Error on fetching metro lines</p>
      )}
    </div>
  ) : (
    <div
      style={{
        overflow: "auto",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <Info />
      <MapComponent />
    </div>
  );
}

export default App;
