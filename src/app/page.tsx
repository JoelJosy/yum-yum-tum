"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { restaurants } from "@/components/restaurant-data";
import { RestaurantMap } from "@/components/restaurant-map";

type Theme = "light" | "dark";

export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");

  return (
    <main
      className={`${theme === "dark" ? "dark" : ""} relative min-h-screen overflow-hidden bg-[#1b1b1b] text-[#f5f5f0]`}
    >
      <RestaurantMap
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3 border border-[#ff6f18]/50 bg-[#1b1b1b]/90 px-3 py-2 text-[#f5f5f0] shadow-[4px_4px_0_#ff6f18] backdrop-blur-md sm:bottom-8 sm:left-8">
        <div className="flex items-center gap-3">
          <MapPin className="size-4 text-[#ff6f18]" />
          <div>
            <p className="font-mono text-lg leading-none font-bold">
              {restaurants.length}
            </p>
            <p className="mt-1 font-mono text-[9px] tracking-[0.16em] text-[#a4a4a0] uppercase">
              restaurants visited
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
