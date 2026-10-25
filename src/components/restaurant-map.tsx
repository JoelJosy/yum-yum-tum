"use client";

import { useState } from "react";
import {
  Map,
  MapControls,
  useMap,
  type MapViewport,
} from "@/components/ui/map";
import { restaurants } from "./restaurant-data";
import { RestaurantLayer } from "./restaurant-layer";
import { RestaurantSearch } from "./restaurant-search";

const initialViewport: MapViewport = {
  center: [13, 26],
  zoom: 1.35,
  bearing: 0,
  pitch: 0,
};

function RestaurantSearchNavigation({
  searchOpen,
  searchQuery,
  visibleRestaurants,
  onOpen,
  onClose,
  onQueryChange,
}: {
  searchOpen: boolean;
  searchQuery: string;
  visibleRestaurants: typeof restaurants;
  onOpen: () => void;
  onClose: () => void;
  onQueryChange: (query: string) => void;
}) {
  const { map } = useMap();

  return (
    <RestaurantSearch
      searchOpen={searchOpen}
      searchQuery={searchQuery}
      restaurants={visibleRestaurants}
      onOpen={onOpen}
      onClose={onClose}
      onQueryChange={onQueryChange}
      onSelectRestaurant={(restaurant) =>
        map?.flyTo({
          center: [restaurant.longitude, restaurant.latitude],
          zoom: 15,
          duration: 3200,
          curve: 1.6,
          essential: true,
        })
      }
    />
  );
}

export function RestaurantMap() {
  const [viewport, setViewport] = useState<MapViewport>(initialViewport);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleRestaurants = normalizedQuery
    ? restaurants.filter((restaurant) =>
        [
          restaurant.name,
          restaurant.city,
          restaurant.country,
          restaurant.cuisine,
        ].some((value) => value.toLowerCase().includes(normalizedQuery)),
      )
    : restaurants;

  return (
    <section className="relative h-screen w-full">
      <div className="absolute inset-0 overflow-hidden bg-[#101010]">
        <Map
          className="h-full w-full"
          viewport={viewport}
          onViewportChange={setViewport}
          projection={{ type: "globe" }}
          theme="dark"
        >
          <RestaurantSearchNavigation
            searchOpen={searchOpen}
            searchQuery={searchQuery}
            visibleRestaurants={visibleRestaurants}
            onOpen={() => setSearchOpen(true)}
            onClose={() => {
              setSearchQuery("");
              setSearchOpen(false);
            }}
            onQueryChange={setSearchQuery}
          />
          <MapControls
            position="bottom-right"
            className="right-5 bottom-5 sm:right-8 sm:bottom-8"
            showZoom
            showCompass
            showLocate
            showFullscreen
          />
          <RestaurantLayer restaurants={visibleRestaurants} />
        </Map>
      </div>
    </section>
  );
}
