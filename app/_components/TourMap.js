"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Map, Overlay } from "pigeon-maps";
import { maptiler } from "pigeon-maps/providers";

const maptilerProvider = maptiler(
  process.env.NEXT_PUBLIC_MAPTILER_KEY,
  "base-v4-light",
);

const MAX_LATITUDE = 85.05112878;

function project([latitude, longitude]) {
  const clampedLatitude = Math.max(
    -MAX_LATITUDE,
    Math.min(MAX_LATITUDE, latitude),
  );
  const sin = Math.sin((clampedLatitude * Math.PI) / 180);

  return [
    (longitude + 180) / 360,
    0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI),
  ];
}

function unproject([x, y]) {
  return [
    (Math.atan(Math.sinh(Math.PI * (1 - 2 * y))) * 180) / Math.PI,
    x * 360 - 180,
  ];
}

function fitLocations(locations, { width, height }) {
  if (!locations.length || !width || !height) return null;

  const points = locations.map((location) =>
    project([location.coordinates[1], location.coordinates[0]]),
  );
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const horizontalPadding = Math.min(64, width * 0.15);
  const topPadding = Math.min(120, height * 0.25);
  const bottomPadding = Math.min(80, height * 0.2);
  const availableWidth = Math.max(1, width - 2 * horizontalPadding);
  const availableHeight = Math.max(1, height - topPadding - bottomPadding);
  const zoom = Math.max(
    1,
    Math.min(
      13,
      Math.log2(
        Math.min(
          availableWidth / (256 * Math.max(maxX - minX, 1e-12)),
          availableHeight / (256 * Math.max(maxY - minY, 1e-12)),
        ),
      ),
    ),
  );
  const scale = 256 * 2 ** zoom;

  return {
    center: unproject([
      (minX + maxX) / 2,
      (minY + maxY) / 2 + (bottomPadding - topPadding) / (2 * scale),
    ]),
    zoom,
  };
}

export default function TourMap({ locations }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [activeLocationId, setActiveLocationId] = useState(null);
  const [pan, setPan] = useState(null);
  const fit = useMemo(() => fitLocations(locations, size), [locations, size]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      const height = Math.round(entry.contentRect.height);
      setSize((current) =>
        current.width === width && current.height === height
          ? current
          : { width, height },
      );
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const activeLocation = locations.find(
    (location) => location._id === activeLocationId,
  );

  const anchorFor = (location) => [
    location.coordinates[1],
    location.coordinates[0],
  ];

  return (
    <div ref={containerRef} className="h-full w-full">
      {fit && (
        <Map
          center={pan?.fit === fit ? pan.center : fit.center}
          zoom={fit.zoom}
          width={size.width}
          height={size.height}
          dprs={[1, 2]}
          provider={maptilerProvider}
          animate={false}
          mouseEvents
          touchEvents
          minZoom={fit.zoom}
          maxZoom={fit.zoom}
          metaWheelZoom
          metaWheelZoomWarning=""
          onClick={() => setActiveLocationId(null)}
          onBoundsChanged={({ center, initial }) => {
            if (!initial) setPan({ fit, center });
          }}
        >
          {locations.map((location) => (
            <Overlay anchor={anchorFor(location)} key={location._id}>
              <button
                type="button"
                aria-label={`Day ${location.day}: ${location.description}`}
                aria-expanded={activeLocationId === location._id}
                onClick={() =>
                  setActiveLocationId((current) =>
                    current === location._id ? null : location._id,
                  )
                }
                className="pigeon-drag-block absolute flex h-14 w-12 -translate-x-1/2 -translate-y-full cursor-pointer items-center justify-center drop-shadow-lg transition-transform hover:scale-110 focus-visible:rounded-lg focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#2e864b]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 48 56"
                  className="h-full w-full"
                >
                  <path
                    d="M24 2C11.8 2 2 11.8 2 24c0 16 22 30 22 30s22-14 22-30C46 11.8 36.2 2 24 2Z"
                    fill="#55c57a"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <text
                    x="24"
                    y="26"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="white"
                    fontSize="18"
                    fontWeight="700"
                  >
                    {location.day}
                  </text>
                </svg>
              </button>
            </Overlay>
          ))}
          {activeLocation && (
            <Overlay anchor={anchorFor(activeLocation)}>
              <div
                role="dialog"
                aria-label={`Day ${activeLocation.day} location`}
                className="pigeon-drag-block absolute bottom-16 left-0 flex w-max max-w-[min(18rem,80vw)] -translate-x-1/2 items-start gap-3 rounded-lg bg-white px-4 py-3 text-base text-[#333] shadow-lg"
              >
                <span>{`Day ${activeLocation.day}: ${activeLocation.description}`}</span>
                <button
                  type="button"
                  aria-label="Close location popup"
                  onClick={() => setActiveLocationId(null)}
                  className="shrink-0 rounded text-xl leading-none text-[#555] hover:text-[#2e864b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e864b]"
                >
                  ×
                </button>
              </div>
            </Overlay>
          )}
        </Map>
      )}
    </div>
  );
}
