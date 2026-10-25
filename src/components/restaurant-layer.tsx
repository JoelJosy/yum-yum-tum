"use client";

import { useEffect, useId, useMemo, useState } from "react";
import type {
  GeoJSONSource,
  MapGeoJSONFeature,
  MapLayerMouseEvent,
} from "maplibre-gl";
import { MapPopup, useMap } from "@/components/ui/map";
import type { Restaurant } from "./restaurant-data";

type RestaurantLayerProps = {
  restaurants: Restaurant[];
};

type SelectedRestaurant = {
  restaurant: Restaurant;
  coordinates: [number, number];
};

export function RestaurantLayer({ restaurants }: RestaurantLayerProps) {
  const { map, isLoaded } = useMap();
  const id = useId();
  const sourceId = `restaurant-source-${id}`;
  const outerGlowLayerId = `restaurant-glow-outer-${id}`;
  const innerGlowLayerId = `restaurant-glow-inner-${id}`;
  const coreLayerId = `restaurant-core-${id}`;
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<SelectedRestaurant | null>(null);
  const [hoveredRestaurant, setHoveredRestaurant] =
    useState<SelectedRestaurant | null>(null);

  const data = useMemo<
    GeoJSON.FeatureCollection<
      GeoJSON.Point,
      { id: string; rating: number }
    >
  >(
    () => ({
      type: "FeatureCollection",
      features: restaurants.map((restaurant) => ({
        type: "Feature",
        id: restaurant.id,
        properties: {
          id: restaurant.id,
          rating: restaurant.rating,
        },
        geometry: {
          type: "Point",
          coordinates: [restaurant.longitude, restaurant.latitude],
        },
      })),
    }),
    [restaurants],
  );

  useEffect(() => {
    if (!map || !isLoaded) return;

    map.addSource(sourceId, {
      type: "geojson",
      data,
    });

    const ratingColor = "#ff9c61";

    map.addLayer({
      id: outerGlowLayerId,
      type: "circle",
      source: sourceId,
      paint: {
        "circle-radius": 30,
        "circle-blur": 0.95,
        "circle-color": ratingColor,
        "circle-opacity": 0.3,
      },
    });

    map.addLayer({
      id: innerGlowLayerId,
      type: "circle",
      source: sourceId,
      paint: {
        "circle-radius": 17,
        "circle-blur": 0.8,
        "circle-color": ratingColor,
        "circle-opacity": 0.6,
      },
    });

    map.addLayer({
      id: coreLayerId,
      type: "circle",
      source: sourceId,
      paint: {
        "circle-radius": 6,
        "circle-color": ratingColor,
        "circle-opacity": 1,
        "circle-stroke-width": 1.5,
        "circle-stroke-color": "#ff9c61",
      },
    });

    const handleClick = (
      event: MapLayerMouseEvent & { features?: MapGeoJSONFeature[] },
    ) => {
      const feature = event.features?.[0];
      const restaurant = restaurants.find(
        (item) => item.id === feature?.properties?.id,
      );
      if (!restaurant || !feature) return;

      const coordinates = (
        feature.geometry as GeoJSON.Point
      ).coordinates.slice() as [number, number];
      map.flyTo({
        center: coordinates,
        zoom: 15,
        duration: 3200,
        curve: 1.6,
        essential: true,
      });
      setHoveredRestaurant(null);
      setSelectedRestaurant({ restaurant, coordinates });
    };

    const handleMouseEnter = (
      event: MapLayerMouseEvent & { features?: MapGeoJSONFeature[] },
    ) => {
      map.getCanvas().style.cursor = "pointer";
      const feature = event.features?.[0];
      const restaurant = restaurants.find(
        (item) => item.id === feature?.properties?.id,
      );
      if (!restaurant || !feature) return;
      const coordinates = (
        feature.geometry as GeoJSON.Point
      ).coordinates.slice() as [number, number];
      setHoveredRestaurant({ restaurant, coordinates });
    };
    const handleMouseLeave = () => {
      map.getCanvas().style.cursor = "";
      setHoveredRestaurant(null);
    };

    map.on("click", coreLayerId, handleClick);
    map.on("mouseenter", coreLayerId, handleMouseEnter);
    map.on("mouseleave", coreLayerId, handleMouseLeave);

    return () => {
      map.off("click", coreLayerId, handleClick);
      map.off("mouseenter", coreLayerId, handleMouseEnter);
      map.off("mouseleave", coreLayerId, handleMouseLeave);
      map.getCanvas().style.cursor = "";
      if (map.getLayer(coreLayerId)) map.removeLayer(coreLayerId);
      if (map.getLayer(innerGlowLayerId)) map.removeLayer(innerGlowLayerId);
      if (map.getLayer(outerGlowLayerId)) map.removeLayer(outerGlowLayerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    };
    // The source and layers are initialized once per map instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, isLoaded]);

  useEffect(() => {
    if (!map || !isLoaded) return;
    const source = map.getSource(sourceId) as GeoJSONSource | undefined;
    source?.setData(data);

  }, [data, isLoaded, map, sourceId]);

  const activeSelection =
    selectedRestaurant &&
    restaurants.some(
      (restaurant) => restaurant.id === selectedRestaurant.restaurant.id,
    )
      ? selectedRestaurant
      : null;

  if (!activeSelection && !hoveredRestaurant) return null;

  return (
    <>
      {!activeSelection && hoveredRestaurant && (
        <MapPopup
          longitude={hoveredRestaurant.coordinates[0]}
          latitude={hoveredRestaurant.coordinates[1]}
          closeOnClick={false}
          focusAfterOpen={false}
          offset={10}
          closeButton={false}
          className="!rounded-none border-[#ff6f18]/70 bg-[#1b1b1b] px-2 py-1 font-mono text-xs text-[#f5f5f0] shadow-[2px_2px_0_#ff6f18]"
        >
          {hoveredRestaurant.restaurant.name}
        </MapPopup>
      )}
      {activeSelection && (
        <MapPopup
          longitude={activeSelection.coordinates[0]}
          latitude={activeSelection.coordinates[1]}
          onClose={() => setSelectedRestaurant(null)}
          closeOnClick={false}
          focusAfterOpen={false}
          offset={10}
          closeButton
          maxWidth="min(20rem, calc(100vw - 2rem))"
          className="!max-w-[calc(100vw-2rem)] !rounded-none border-[#ff6f18]/80 bg-[#1b1b1b] p-0 font-mono text-[#f5f5f0] shadow-[5px_5px_0_#ff6f18]"
        >
          <div className="w-[min(20rem,calc(100vw-2rem))] max-w-full overflow-hidden">
            <div className="border-b border-[#ff6f18]/40 bg-[#242424] px-4 py-4">
              <p className="mb-2 text-[9px] font-bold tracking-[0.18em] text-[#ff9c61] uppercase">
                {activeSelection.restaurant.cuisine}
              </p>
              <h2 className="text-xl leading-tight font-black tracking-tight text-[#f5f5f0]">
                {activeSelection.restaurant.name}
              </h2>
              <p className="mt-1 text-xs text-[#a4a4a0]">
                {activeSelection.restaurant.city},{" "}
                {activeSelection.restaurant.country}
              </p>
            </div>
            <div className="space-y-4 p-4">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="text-[#a4a4a0]">
                  {activeSelection.restaurant.visited}
                </span>
                <span className="shrink-0 font-bold text-[#ff9c61]">
                  rating {activeSelection.restaurant.rating}/5
                </span>
              </div>
              <p className="text-sm leading-5 text-[#d4d4d0]">
                {activeSelection.restaurant.note}
              </p>
              <a
                href={activeSelection.restaurant.postUrl}
                className="flex h-9 items-center justify-center border border-[#ff6f18] bg-[#ff6f18] px-3 text-xs font-bold text-[#1b1b1b] transition-colors hover:bg-[#ff9c61]"
              >
                [ READ MORE ]
              </a>
            </div>
          </div>
        </MapPopup>
      )}
    </>
  );
}
