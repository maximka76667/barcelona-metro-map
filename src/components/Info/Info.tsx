import Select from "react-select";
import { useMetroLinesStore, useRouterStore, useTramStore } from "../../store";
import "./Info.css";

import { memo } from "react";

const Info = () => {
  const { currentStation, currentCoords } = useTramStore();
  const { stations } = useMetroLinesStore();
  const {
    originStation,
    setOriginStation,
    destinationStation,
    setDestinationStation,
  } = useRouterStore();

  return (
    <div className="info">
      <div className="info__top">
        <Select
          options={stations}
          getOptionLabel={(option) =>
            `[${option.node.lines}] ${option.node.name}`
          }
          className="info__station-input info__station-input_origin"
          menuPlacement="top"
          isClearable
          isOptionSelected={(option, selectValue) =>
            selectValue.some((value) => option.node.name == value.node.name)
          }
          placeholder="Origin station"
          value={originStation}
          onChange={setOriginStation}
        />
        <Select
          options={stations}
          getOptionLabel={(option) =>
            `[${option.node.lines}] ${option.node.name}`
          }
          className="info__station-input info__station-input_destination"
          menuPlacement="top"
          isClearable
          isOptionSelected={(option, selectValue) =>
            selectValue.some((value) => option.node.name == value.node.name)
          }
          placeholder="Destination station"
          value={destinationStation}
          onChange={setDestinationStation}
        />
      </div>
      <div className="info__bottom">
        <div className="info__block">
          <p className="info__header">Current tram station</p>
          <p className="info__p">
            <span className="info__field-name">ID:</span>
            {/* If there is no station, it's starting position */}
            {currentStation?.id || "None"}
          </p>
          <p className="info__p">
            <span className="info__field-name">Name:</span>
            {currentStation?.name || "Starting position"}
          </p>
        </div>
        <div className="info__block">
          <p className="info__header">Current tram coordinates</p>
          <p className="info__p">
            <span className="info__field-name">Longitude: </span>
            {currentCoords.lon.toFixed(5)}
          </p>
          <p className="info__p">
            <span className="info__field-name">Latitude:</span>
            {currentCoords.lat.toFixed(5)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(Info);
