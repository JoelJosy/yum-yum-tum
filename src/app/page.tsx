"use client";

import { useState } from "react";
import { Map, type MapViewport, MapControls} from "@/components/ui/map";

export default function Home() {
  const [viewport, setViewport] = useState<MapViewport>({
    center: [77.658, 13.019],
    zoom: 9,
    bearing: 0,
    pitch: 0,
  });

  return (
    <div className="relative h-screen w-full">
      <Map 
        viewport={viewport} 
        onViewportChange={setViewport} 
        projection={{ type: "globe" }} 
      >
        <MapControls
          position="top-right"
          showZoom
          showCompass
          showLocate
          showFullscreen
        />
      </Map>
    </div>
  );
}
