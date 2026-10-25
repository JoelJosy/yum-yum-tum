export type Restaurant = {
  id: string;
  name: string;
  city: string;
  country: string;
  cuisine: string;
  rating: 1 | 2 | 3;
  visited: string;
  note: string;
  longitude: number;
  latitude: number;
  postUrl: string;
};

export const restaurants: Restaurant[] = [
  {
    id: "atomix",
    name: "Atomix",
    city: "New York",
    country: "United States",
    cuisine: "Korean tasting menu",
    rating: 3,
    visited: "May 2024",
    note: "A thoughtful, card-led tasting menu where every course tells a story.",
    longitude: -73.982,
    latitude: 40.744,
    postUrl: "/journal/atomix-new-york",
  },
  {
    id: "dishoom",
    name: "Dishoom",
    city: "London",
    country: "United Kingdom",
    cuisine: "Bombay comfort food",
    rating: 2,
    visited: "September 2023",
    note: "Black daal, roomali rolls, and a breakfast worth crossing town for.",
    longitude: -0.134,
    latitude: 51.512,
    postUrl: "/journal/dishoom-london",
  },
  {
    id: "le-servan",
    name: "Le Servan",
    city: "Paris",
    country: "France",
    cuisine: "Modern French",
    rating: 1,
    visited: "June 2024",
    note: "Small plates with big personality in the kind of room you never want to leave.",
    longitude: 2.378,
    latitude: 48.871,
    postUrl: "/journal/le-servan-paris",
  },
  {
    id: "sorn",
    name: "Sorn",
    city: "Bangkok",
    country: "Thailand",
    cuisine: "Southern Thai",
    rating: 3,
    visited: "February 2025",
    note: "Deep, bright southern flavours and the most memorable crab curry of the trip.",
    longitude: 100.547,
    latitude: 13.72,
    postUrl: "/journal/sorn-bangkok",
  },
  {
    id: "flour-and-water",
    name: "Flour + Water",
    city: "San Francisco",
    country: "United States",
    cuisine: "Handmade pasta",
    rating: 3,
    visited: "October 2022",
    note: "Pasta made with restraint, precision, and a little bit of California sunshine.",
    longitude: -122.412,
    latitude: 37.774,
    postUrl: "/journal/flour-and-water-san-francisco",
  },
  {
    id: "quintonil",
    name: "Quintonil",
    city: "Mexico City",
    country: "Mexico",
    cuisine: "Contemporary Mexican",
    rating: 3,
    visited: "November 2024",
    note: "A playful tour through Mexico's pantry, from delicate herbs to smoky cacao.",
    longitude: -99.198,
    latitude: 19.427,
    postUrl: "/journal/quintonil-mexico-city",
  },
  {
    id: "geranium",
    name: "Geranium",
    city: "Copenhagen",
    country: "Denmark",
    cuisine: "Nordic tasting menu",
    rating: 3,
    visited: "August 2023",
    note: "Quietly spectacular cooking that makes even a single carrot feel celebratory.",
    longitude: 12.572,
    latitude: 55.703,
    postUrl: "/journal/geranium-copenhagen",
  },
  {
    id: "lila",
    name: "Lila",
    city: "Bengaluru",
    country: "India",
    cuisine: "Seasonal Indian",
    rating: 3,
    visited: "January 2025",
    note: "A bright, modern take on familiar flavours, with a menu that follows the seasons.",
    longitude: 77.594,
    latitude: 12.971,
    postUrl: "/journal/lila-bengaluru",
  },
];
