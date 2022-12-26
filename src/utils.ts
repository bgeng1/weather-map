import { countryData } from "./data/data";
import { APIResponse, Coordinates, Latitude } from "./types";

const northernSeasons: string[] = [
  "winter",
  "winter",
  "spring",
  "spring",
  "spring",
  "summer",
  "summer",
  "summer",
  "autumn",
  "autumn",
  "autumn",
  "winter",
];
const southernSeasons: string[] = [
  "summer",
  "summer",
  "autumn",
  "autumn",
  "autumn",
  "winter",
  "winter",
  "winter",
  "spring",
  "spring",
  "spring",
  "summer",
];

//reference https://open-meteo.com/en/docs
const weatherDict: Record<number, string> = {
  0: "clear sky",
  1: "mainly clear",
  2: "partly cloudy",
  3: "overcast",
  45: "fog",
  48: "depositing rime fog",
  51: "light drizle",
  53: "moderate drizzle",
  55: "dense drizzle",
  56: "freezing light drizzle",
  57: "freezing dense drizzle",
  61: "light rain",
  63: "moderate rain",
  65: "heavy rain",
  66: "freezing light rain",
  67: "freezing heavy rain",
  71: "light snow",
  73: "moderate snow",
  75: "heavy snow",
  77: "snow grains",
  80: "slight rain showers",
  81: "moderate rain showers",
  82: "violent rain showers",
  85: "slight snow showers",
  86: "heavy snow showers",
  95: "thunderstorm",
  96: "thunderstorm with slight hail",
  99: "thunderstorm with heavy hail",
};

export const getWeatherSummary = (weatherCode?: number): string | undefined => {
  if (weatherCode === undefined) {
    return undefined;
  }
  return weatherDict[weatherCode];
};

export const getSeason = (latitude: number, month: number): string => {
  return latitude >= 0 ? northernSeasons[month] : southernSeasons[month];
};

//reference: https://journeynorth.org/weather/ClimateTempPrecipAns2.html
//this is only relevant in the 'tropics' between +-23.5 degrees latitude
export const getPrecipitationSeason = (
  latitude: Latitude,
  month: number
): string | undefined => {
  if (latitude > 23.5 || latitude < -23.5) {
    return undefined;
  }
  const direction = latitude >= 0 ? "north" : "south";
  if (direction === "north") {
    // april to september
    if (month >= 3 && month <= 8) {
      return "wet";
    }
    // october to march
    return "dry";
  }
  if (month >= 3 && month <= 8) {
    return "dry";
  }
  return "wet";
};

export const fetchWeather = async ({
  latitude,
  longitude,
}: Coordinates): Promise<APIResponse> => {
  let response;
  try {
    response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
  } catch (error) {
    console.log("failed to fetch weather data");
  }

  return await response?.json();
};

export const getCountry = (countryCode: string) => {
  return countryData.find((entry) => entry.alpha2 === countryCode)?.country;
};

let id = 0;
export const getUniqueId = (): number => {
  return id++;
};

export const roundCoordinates = (
  { latitude, longitude }: Coordinates,
  decimalPlaces = 2
): [number, number] => {
  const roundedLat = latitude && parseFloat(latitude.toFixed(decimalPlaces));
  const roundedLong = longitude && parseFloat(longitude.toFixed(decimalPlaces));
  return [roundedLat, roundedLong];
};
