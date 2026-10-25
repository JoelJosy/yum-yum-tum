import { MDXRemote } from "next-mdx-remote/rsc";
import type { RestaurantPost } from "@/lib/restaurants";

export function RestaurantDetails({ post }: { post: RestaurantPost }) {
  const { frontmatter } = post;

  return (
    <article className="font-mono text-[#f5f5f0]">
      <header className="border-b border-[#ff6f18]/40 bg-[#242424] px-5 py-6">
        <p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-[#ff9c61] uppercase">
          {frontmatter.city} / {frontmatter.country}
        </p>
        <h1 className="text-3xl font-black tracking-tight">{frontmatter.name}</h1>
        <p className="mt-2 text-sm text-[#a4a4a0]">
          {frontmatter.cuisine.join(" // ")}
        </p>
      </header>
      <div className="space-y-7 p-5">
        <div className="grid gap-2 border-l-2 border-[#ff6f18] pl-3 text-xs">
          <p className="text-[#a4a4a0]">
            {"visited // "}
            {frontmatter.visited}
          </p>
          <p className="font-bold text-[#ff9c61]">
            {"rating // "}
            {frontmatter.rating}/5
          </p>
        </div>
        <DetailList label="must-try" items={frontmatter.mustTry} />
        <DetailList label="loved" items={frontmatter.loved} />
        <DetailList label="hated" items={frontmatter.hated} />
        <div className="prose prose-invert max-w-none text-sm leading-7 text-[#d4d4d0]">
          <MDXRemote source={post.body} />
        </div>
      </div>
    </article>
  );
}

function DetailList({ label, items }: { label: string; items: string[] }) {
  return (
    <section>
      <h2 className="mb-2 text-[10px] font-bold tracking-[0.18em] text-[#ff9c61] uppercase">
        {label}
      </h2>
      <ul className="space-y-1 text-sm text-[#d4d4d0]">
        {items.length > 0 ? (
          items.map((item) => <li key={item}>{"// "}{item}</li>)
        ) : (
          <li className="text-[#777773]">{"// none logged"}</li>
        )}
      </ul>
    </section>
  );
}
