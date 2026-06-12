import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { courses } from "@/lib/content";
import { PageHeader } from "@/components/section";
import { Search } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — ProductPath" },
      { name: "description", content: "Focused, practical product management courses on PRDs, discovery, metrics, prioritization, AI, and growth." },
      { property: "og:title", content: "Courses — ProductPath" },
      { property: "og:description", content: "Practical product management courses." },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(courses.map((c) => c.category)))],
    [],
  );

  const filtered = courses.filter((c) => {
    const matchesQuery =
      !query ||
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase());
    const matchesCat = category === "All" || c.category === category;
    return matchesQuery && matchesCat;
  });

  return (
    <div>
      <PageHeader
        eyebrow="Course catalog"
        title="Short, sharp, ship-ready."
        description="Every course is built to be finished in a sitting or two — and applied this week."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses…"
              aria-label="Search courses"
              className="w-full rounded-md border border-border bg-surface py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  category === c
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-surface text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Link
              key={c.slug}
              to="/courses/$slug"
              params={{ slug: c.slug }}
              className="group block rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{c.category}</span>
                <span>{c.duration}</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold group-hover:text-brand">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
              <div className="mt-4 text-xs font-medium text-brand">{c.level}</div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No courses match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
