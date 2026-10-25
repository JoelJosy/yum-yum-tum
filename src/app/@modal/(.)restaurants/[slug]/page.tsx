import { notFound } from "next/navigation";
import { Modal } from "@/components/modal";
import { RestaurantDetails } from "@/components/restaurant-details";
import { getAllRestaurants, getRestaurantBySlug } from "@/lib/restaurants";

export function generateStaticParams() {
  return getAllRestaurants().map(({ frontmatter }) => ({
    slug: frontmatter.slug,
  }));
}

export default async function RestaurantModalPage({
  params,
}: PageProps<"/restaurants/[slug]">) {
  const { slug } = await params;
  const post = getRestaurantBySlug(slug);
  if (!post) notFound();

  return (
    <Modal>
      <RestaurantDetails post={post} />
    </Modal>
  );
}
