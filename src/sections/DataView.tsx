import { FC, ReactNode, useEffect, useState } from "react";
import { SetLocation } from "../App";
import { exampleResponse } from "../data/exampleResponse";
import { APIResponse, Coordinates } from "../types";
import {
  fetchWeather,
  getPrecipitationSeason,
  getSeason,
  getWeatherSummary,
  roundCoordinates,
} from "../utils";
import CheckBox from "./dataViewComponents/Checkbox";
import DataPoint from "./dataViewComponents/DataPoint";
import Icon from "./dataViewComponents/Icon";
import { Map } from "./Map";

interface DataViewProps {
  coordinates: Coordinates;
  setLocation: SetLocation;
}

export const DataView: FC<DataViewProps> = ({ coordinates, setLocation }) => {
  const [weather, setWeather] = useState<APIResponse>();
  const [useWeather, setUseWeather] = useState<boolean>(false);
  const [useGeoFence, setUseGeoFence] = useState<boolean>(false);

  const getWeather = async () => {
    let result: APIResponse | undefined = useWeather
      ? await fetchWeather({ latitude, longitude })
      : exampleResponse;
    setWeather(result);
  };

  useEffect(() => {
    setWeather(undefined);
    getWeather();
  }, [coordinates]);

  const { latitude, longitude } = coordinates;
  const [lat, long] = roundCoordinates({ latitude, longitude });
  const month = new Date().getMonth();
  const season = getSeason(latitude, month);
  const precipSeason = getPrecipitationSeason(latitude, month);
  const currentWeather = weather?.current_weather;
  const weatherSummary = getWeatherSummary(currentWeather?.weathercode);

  let dataPoints: Record<string, ReactNode> = {
    season,
    lat,
    long,
    temp: `${currentWeather?.temperature}\u00B0C`,
    "wind speed": `${currentWeather?.windspeed} km/h`,
    weather: weatherSummary,
    "precipitation season": precipSeason,
  };

  if (import.meta.env.MODE === "development") {
    dataPoints = {
      ...dataPoints,
      "use weather": <CheckBox setState={setUseWeather} />,
      "use geofencing": <CheckBox setState={setUseGeoFence} />,
    };
  }

  return (
    <section id="data-view">
      <div className="data-map">
        <Map
          latitude={latitude}
          longitude={longitude}
          setLocation={setLocation}
          geofencing={useGeoFence}
        />
        <p>click on the map</p>
      </div>
      <div className="data-text">
        {/* <Icon season={season} /> */}
        {Object.keys(dataPoints).map((key) => {
          return <DataPoint key={key} label={key} value={dataPoints[key]} />;
        })}
      </div>
    </section>
  );
};

export default DataView;
