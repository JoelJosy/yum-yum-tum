"use client";

import { useEffect, useId, useMemo, useState } from "react";
import type {
  GeoJSONSource,
  MapGeoJSONFeature,
  MapLayerMouseEvent,
  ExpressionSpecification,
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
        "circle-radius": 20,
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
        "circle-radius": 7,
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
        "circle-radius": 2,
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
          className="border-[#ff6f18]/70 bg-[#1b1b1b] px-2 py-1 font-mono text-xs text-[#f5f5f0] shadow-[2px_2px_0_#ff6f18]"
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
        >
          <div className="bg-card text-card-foreground w-72 overflow-hidden rounded-2xl border p-0 shadow-xl">
            <div className="bg-primary text-primary-foreground px-5 py-4">
              <p className="text-primary-foreground/70 mb-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
                {activeSelection.restaurant.cuisine}
              </p>
              <h2 className="text-xl leading-tight font-semibold">
                {activeSelection.restaurant.name}
              </h2>
              <p className="text-primary-foreground/70 mt-1 text-xs">
                {activeSelection.restaurant.city},{" "}
                {activeSelection.restaurant.country}
              </p>
            </div>
            <div className="space-y-3 p-5">
              <div className="text-muted-foreground flex items-center justify-between text-xs">
                <span>{activeSelection.restaurant.visited}</span>
                <span className="text-card-foreground font-semibold">
                  rating {activeSelection.restaurant.rating}/3
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-5">
                {activeSelection.restaurant.note}
              </p>
              <a
                href={activeSelection.restaurant.postUrl}
                className="flex h-9 items-center justify-center rounded-lg bg-[#bd5f3c] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#a94f30]"
              >
                Read the full story
              </a>
            </div>
          </div>
        </MapPopup>
      )}
    </>
  );
}
