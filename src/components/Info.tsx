import { useTramStore } from "../store";
import "./Info.css";

const Info = () => {
  const { currentStation, currentCoords } = useTramStore();

  return (
    <div className="info">
      <div className="info__block">
        <p className="info__header">Current station</p>
        <p className="info__p">
          <span className="info__field-name">ID:</span>{" "}
          {currentStation?.id || "None"}
        </p>
        <p className="info__p">
          <span className="info__field-name">Name:</span>{" "}
          {currentStation?.name || "Starting position"}
        </p>
      </div>
      <div className="info__block">
        <p className="info__header">Current coordinates</p>
        <p className="info__p">
          <span className="info__field-name">Longitude: </span>
          {currentCoords.lon.toFixed(5)}
        </p>
        <p className="info__p">
          <span className="info__field-name">Latitude:</span>{" "}
          {currentCoords.lat.toFixed(5)}
        </p>
      </div>
    </div>
  );
};

export default Info;
