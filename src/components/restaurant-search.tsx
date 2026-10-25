"use client";

import { Search, X } from "lucide-react";
import type { Restaurant } from "./restaurant-data";

type RestaurantSearchProps = {
  searchOpen: boolean;
  searchQuery: string;
  restaurants: Restaurant[];
  onOpen: () => void;
  onClose: () => void;
  onQueryChange: (query: string) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
};

export function RestaurantSearch({
  searchOpen,
  searchQuery,
  restaurants,
  onOpen,
  onClose,
  onQueryChange,
  onSelectRestaurant,
}: RestaurantSearchProps) {
  return (
    <div className="absolute top-5 right-5 z-20 sm:top-8 sm:right-8">
      {searchOpen ? (
        <div className="w-64 sm:w-72">
          <div className="flex items-center border border-[#ff6f18]/70 bg-[#1b1b1b]/95 p-1 shadow-[4px_4px_0_#ff6f18] backdrop-blur-sm">
            <Search className="ml-2 size-4 text-[#ff6f18]" />
            <input
              autoFocus
              type="search"
              value={searchQuery}
              onChange={(event) => onQueryChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") onClose();
              }}
              placeholder="Search restaurants..."
              aria-label="Search restaurants"
              className="h-8 min-w-0 flex-1 bg-transparent px-2 font-mono text-xs text-[#f5f5f0] outline-none placeholder:text-[#a4a4a0]"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="flex size-8 items-center justify-center text-[#ff6f18] transition-colors hover:bg-[#ff6f18] hover:text-[#1b1b1b]"
            >
              <X className="size-4" />
            </button>
          </div>
          {searchQuery.trim() && (
            <div className="mt-2 border border-[#ff6f18]/50 bg-[#1b1b1b]/95 p-1 shadow-[3px_3px_0_#ff6f18] backdrop-blur-sm">
              {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="border-b border-[#ff6f18]/15 last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() => onSelectRestaurant(restaurant)}
                      className="w-full px-3 py-2 text-left transition-colors hover:bg-[#ff6f18] hover:text-[#1b1b1b]"
                    >
                      <p className="font-mono text-xs font-bold text-[#f5f5f0]">
                        {restaurant.name}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] text-[#a4a4a0]">
                        {restaurant.city}, {restaurant.country}
                      </p>
                    </button>
                  </div>
                ))
              ) : (
                <p className="px-3 py-3 font-mono text-xs text-[#a4a4a0]">
                  No restaurants found.
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={onOpen}
          aria-label="Open restaurant search"
          className="flex size-9 items-center justify-center border border-[#ff6f18]/70 bg-[#1b1b1b]/95 text-[#ff6f18] shadow-[2px_2px_0_#ff6f18] transition-colors hover:bg-[#ff6f18] hover:text-[#1b1b1b]"
        >
          <Search className="size-4" />
        </button>
      )}
    </div>
  );
}
