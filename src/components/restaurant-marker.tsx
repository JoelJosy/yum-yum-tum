"use client";

import { ArrowUpRight, MapPin, Star } from "lucide-react";
import {
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from "@/components/ui/map";
import type { Restaurant } from "./restaurant-data";

export function RestaurantMarker({ restaurant }: { restaurant: Restaurant }) {
  const markerColor =
    restaurant.rating >= 4
      ? "bg-[#70a15a]"
      : restaurant.rating < 2
        ? "bg-[#d4584a]"
        : "bg-[#d48a43]";

  return (
    <MapMarker
      longitude={restaurant.longitude}
      latitude={restaurant.latitude}
    >
      <MarkerContent>
        <div className={`group relative flex size-8 items-center justify-center rounded-full border-2 border-white ${markerColor} shadow-[0_3px_10px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-125 dark:border-background`}>
          <MapPin className="size-4 fill-[#fffaf2] text-[#fffaf2]" />
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
