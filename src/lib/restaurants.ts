import "server-only";

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { GlobeMarker } from "@/types/restaurant";

const restaurantsDirectory = path.join(process.cwd(), "content/restaurants");

const restaurantSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  lat: z.number().finite(),
  lng: z.number().finite(),
  rating: z.number().min(0).max(5),
  cuisine: z.array(z.string().min(1)),
  overview: z.string().min(1),
  mustTry: z.array(z.string().min(1)),
  loved: z.array(z.string().min(1)),
  hated: z.array(z.string().min(1)),
  visited: z.string().regex(/^\d{4}-\d{2}$/),
});

export type Restaurant = z.infer<typeof restaurantSchema>;

export type RestaurantPost = {
  frontmatter: Restaurant;
  body: string;
};

function getRestaurantSlugs() {
  return readdirSync(restaurantsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.slice(0, -4));
}

function readRestaurant(slug: string): RestaurantPost {
  const fileName = `${slug}.mdx`;
  const filePath = path.join(restaurantsDirectory, fileName);
  const source = readFileSync(filePath, "utf8");
  const parsed = matter(source);
  const result = restaurantSchema.safeParse(parsed.data);

  if (!result.success) {
    throw new Error(
      `Invalid restaurant frontmatter in ${fileName}: ${result.error.message}`,
    );
  }

  return { frontmatter: result.data, body: parsed.content.trim() };
}

export function getAllRestaurants(): RestaurantPost[] {
  return getRestaurantSlugs()
    .map(readRestaurant)
    .sort((a, b) => b.frontmatter.visited.localeCompare(a.frontmatter.visited));
}

export function getRestaurantBySlug(slug: string): RestaurantPost | undefined {
  if (!getRestaurantSlugs().includes(slug)) return undefined;
  return readRestaurant(slug);
}

export function getGlobeMarkers(): GlobeMarker[] {
  return getAllRestaurants().map(({ frontmatter }) => ({
    slug: frontmatter.slug,
    name: frontmatter.name,
    lat: frontmatter.lat,
    lng: frontmatter.lng,
    rating: frontmatter.rating,
    cuisine: frontmatter.cuisine,
    overview: frontmatter.overview,
    mustTry: frontmatter.mustTry,
    city: frontmatter.city,
    country: frontmatter.country,
    visited: frontmatter.visited,
  }));
}
