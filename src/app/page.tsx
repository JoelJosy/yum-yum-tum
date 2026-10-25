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
      className={`${theme === "dark" ? "dark" : ""} bg-background text-foreground relative min-h-screen overflow-hidden`}
    >
      <RestaurantMap
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
    </main>
  );
}
