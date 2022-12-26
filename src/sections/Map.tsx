import { Map as PigeonMap, Marker } from "pigeon-maps";
import { FC, useEffect, useRef, useState } from "react";
import { SetLocation } from "../App";
import { Coordinates } from "../types";
import { getCountry, getUniqueId, roundCoordinates } from "../utils";

interface MapProps extends Coordinates {
  setLocation: SetLocation;
  geofencing: boolean;
}

export const Map: FC<MapProps> = ({
  latitude,
  longitude,
  setLocation,
  geofencing,
}) => {
  const [marker, setMarker] = useState<[number, number]>([latitude, longitude]);
  const latestRequest = useRef<number>();

  useEffect(() => {
    setMarker([latitude, longitude]);
  }, [latitude, longitude]);

  const fetchCountry = async ({ latitude, longitude }: Coordinates) => {
    try {
      const id = getUniqueId();
      latestRequest.current = id;
      const result = await fetch(
        `http://api.geonames.org/countryCode?lat=${latitude}&lng=${longitude}&username=lbg1`
      );
      const countryCode = await result.text();
      const country = getCountry(countryCode.trim());
      if (latestRequest.current !== id) {
        return;
      }
      setLocation((prev) => ({
        ...prev,
        country,
      }));
    } catch {}
  };

  return (
    <PigeonMap
      center={[latitude, longitude]}
      defaultZoom={5}
      onClick={({ latLng }) => {
        const [latitude, longitude] = latLng;
        const [roundLat, roundLong] = roundCoordinates({
          latitude,
          longitude,
        });
        setMarker([latitude, longitude]);
        geofencing && fetchCountry({ latitude, longitude });

        setLocation({
          country: `${roundLat}, ${roundLong}`,
          latitude,
          longitude,
        });
      }}
    >
      <Marker width={50} anchor={marker} />
    </PigeonMap>
  );
};
