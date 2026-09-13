"use client";

import dynamic from "next/dynamic";

const TourMap = dynamic(() => import("./TourMap"), {
  ssr: false,
});

export default function TourMapWrapper({ locations }) {
  return <TourMap locations={locations} />;
}
