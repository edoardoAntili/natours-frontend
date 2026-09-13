"use client";

import { Map, Marker } from "pigeon-maps";
import { maptiler } from "pigeon-maps/providers";
import { getCenter, getDistance } from "geolib";

const maptilerProvider = maptiler(
  process.env.NEXT_PUBLIC_MAPTILER_KEY,
  "outdoor",
);

export default function TourMap({ locations }) {
  const centerObj = getCenter(
    locations.map((location) => ({
      latitude: location.coordinates[1],
      longitude: location.coordinates[0],
    })),
  );
  const defaultCenter = [centerObj.latitude, centerObj.longitude];
  const distanceFromCenter = locations
    .map((location) => ({
      latitude: location.coordinates[1],
      longitude: location.coordinates[0],
    }))
    .map((coord) => getDistance(coord, centerObj))
    .reduce((acc, curVal, _, arr) => acc + curVal / arr.length, 0);
  const zoom = Math.max(
    4.5,
    Math.min(13, 13.5 - Math.log2(distanceFromCenter / 1000)),
  );

  return (
    <Map
      defaultCenter={defaultCenter}
      defaultZoom={zoom}
      dprs={[1, 2]}
      provider={maptilerProvider}
      animate={false}
      mouseEvents={false}
      touchEvents={false}
    >
      {locations.map((location) => (
        <Marker
          width={50}
          anchor={[...location.coordinates].reverse()}
          key={location._id}
        />
      ))}
    </Map>
  );
}
