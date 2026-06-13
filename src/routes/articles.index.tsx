import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "@/lib/content";
import { PageHeader } from "@/components/section";

export const Route = createFileRoute("/articles/")({
  head: () => ({
    meta: [
      { title: "Articles — ProductPath" },
      { name: "description", content: "Short, useful articles on product management craft, discovery, strategy, analytics, and leadership." },
      { property: "og:title", content: "Articles — ProductPath" },
      { property: "og:description", content: "Short, useful articles on product management." },
      { property: "og:url", content: "/articles" },
    ],
    links: [{ rel: "canonical", href: "/articles" }],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const [featured, ...rest] = articles;
  return (
    <div>
      <PageHeader
        eyebrow="Articles"
        title="Writing from working PMs."
        description="Practical essays you can read in a coffee break, written by people shipping product today."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Featured */}
        <article className="overflow-hidden rounded-3xl border border-border bg-surface">
          <div className="grid gap-6 p-6 md:grid-cols-5 md:p-10">
            <div className="md:col-span-3">
              <div className="text-xs font-medium text-brand">{featured.category} · Featured</div>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
              <div className="mt-5 text-sm text-muted-foreground">
                {featured.author} · {featured.readTime} read
              </div>
            </div>
            <div
              className="hidden rounded-2xl md:col-span-2 md:block"
              style={{ background: "var(--gradient-brand)" }}
              aria-hidden
            />
          </div>
        </article>

        {/* Grid */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <Link
              key={a.slug}
              to={a.slug === "opportunity-trees" ? "/articles/opportunity-trees" : "/articles"}
              className="rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-[var(--shadow-card)]"
            >
              <div className="text-xs font-medium text-brand">{a.category}</div>
              <h3 className="mt-2 font-display text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
              <div className="mt-4 text-xs text-muted-foreground">
                {a.author} · {a.readTime} read
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
