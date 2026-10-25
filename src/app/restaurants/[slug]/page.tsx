import { notFound } from "next/navigation";
import Link from "next/link";
import { RestaurantDetails } from "@/components/restaurant-details";
import { getAllRestaurants, getRestaurantBySlug } from "@/lib/restaurants";

export function generateStaticParams() {
  return getAllRestaurants().map(({ frontmatter }) => ({
    slug: frontmatter.slug,
  }));
}

export default async function RestaurantPage({
  params,
}: PageProps<"/restaurants/[slug]">) {
  const { slug } = await params;
  const post = getRestaurantBySlug(slug);
  if (!post) notFound();

  return (
    <main className="dark min-h-screen bg-[#1b1b1b] px-4 py-8 text-[#f5f5f0] sm:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-6 inline-flex h-9 items-center border border-[#ff6f18] bg-[#1b1b1b] px-3 font-mono text-xs font-bold text-[#ff9c61] shadow-[3px_3px_0_#ff6f18] hover:bg-[#ff6f18] hover:text-[#1b1b1b]"
        >
          [ BACK TO MAP ]
        </Link>
        <div className="border border-[#ff6f18]/80 bg-[#1b1b1b] shadow-[6px_6px_0_#ff6f18]">
          <RestaurantDetails post={post} />
        </div>
      </div>
    </main>
  );
}
