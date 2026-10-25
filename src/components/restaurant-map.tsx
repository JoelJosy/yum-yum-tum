"use client";

import { useState } from "react";
import {
  Map,
  MapControls,
  type MapViewport,
} from "@/components/ui/map";
import { restaurants } from "./restaurant-data";
import { RestaurantMarker } from "./restaurant-marker";
import { ThemeToggle } from "./theme-toggle";

type Theme = "light" | "dark";

const initialViewport: MapViewport = {
  center: [13, 26],
  zoom: 1.35,
  bearing: 0,
  pitch: 0,
};

export function RestaurantMap({
  theme,
  onToggleTheme,
}: {
  theme: Theme;
  onToggleTheme: () => void;
}) {
  const [viewport, setViewport] = useState<MapViewport>(initialViewport);

  return (
    <section className="relative h-screen w-full">
      <div className="absolute inset-0 overflow-hidden bg-[#1b1b1b]">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <Map
          className="h-full w-full"
          viewport={viewport}
          onViewportChange={setViewport}
          projection={{ type: "globe" }}
          theme={theme}
        >
          <MapControls
            position="top-right"
            className="top-12"
            showZoom
            showCompass
            showLocate
            showFullscreen
          />
          {restaurants.map((restaurant) => (
            <RestaurantMarker key={restaurant.id} restaurant={restaurant} />
          ))}
        </Map>
      </div>
    </section>
  );
}
