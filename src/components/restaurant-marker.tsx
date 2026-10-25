"use client";

import { ArrowUpRight, Star } from "lucide-react";
import {
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from "@/components/ui/map";
import type { Restaurant } from "./restaurant-data";

export function RestaurantMarker({ restaurant }: { restaurant: Restaurant }) {
  const markerColor = "#ff9c61";
  const glowSize = 5 + restaurant.rating * 1.5;
  const glowOpacity = 0.4 + restaurant.rating * 0.12;

  return (
    <MapMarker
      longitude={restaurant.longitude}
      latitude={restaurant.latitude}
    >
      <MarkerContent>
        <div
          className="group relative flex size-7 items-center justify-center transition-transform duration-200 hover:scale-125"
          style={{
            filter: `drop-shadow(0 0 ${glowSize}px ${markerColor}${Math.round(glowOpacity * 255).toString(16).padStart(2, "0")})`,
          }}
        >
          <span
            className="absolute size-7 rounded-full blur-sm"
            style={{ backgroundColor: markerColor, opacity: glowOpacity }}
          />
          <span
            className="relative size-2.5 rounded-full"
            style={{
              backgroundColor: markerColor,
              boxShadow: `0 0 5px 1px ${markerColor}`,
            }}
          />
        </div>
      </MarkerContent>
      <MarkerTooltip>{restaurant.name}</MarkerTooltip>
      <MarkerPopup
        className="bg-card text-card-foreground border-border w-72 overflow-hidden rounded-2xl p-0 shadow-xl"
        closeButton
      >
        <div className="bg-primary text-primary-foreground px-5 py-4">
          <p className="text-primary-foreground/70 mb-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
            {restaurant.cuisine}
          </p>
          <h2 className="text-xl leading-tight font-semibold">
            {restaurant.name}
          </h2>
          <p className="text-primary-foreground/70 mt-1 text-xs">
            {restaurant.city}, {restaurant.country}
          </p>
        </div>
        <div className="space-y-3 p-5">
          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <span>{restaurant.visited}</span>
            <span className="text-card-foreground flex items-center gap-1 font-semibold">
              <Star className="size-3.5 fill-[#d48a43] text-[#d48a43]" />
              {restaurant.rating}
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-5">
            {restaurant.note}
          </p>
          <a
            href={restaurant.postUrl}
            className="flex h-9 items-center justify-center gap-2 rounded-lg bg-[#bd5f3c] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#a94f30]"
          >
            Read the full story
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </MarkerPopup>
    </MapMarker>
  );
}
