import { createFileRoute, Link } from "@tanstack/react-router";
import { paths } from "@/lib/content";
import { PageHeader } from "@/components/section";
import { ArrowRight, Clock, Layers } from "lucide-react";

export const Route = createFileRoute("/paths")({
  head: () => ({
    meta: [
      { title: "Learning Paths — ProductPath" },
      { name: "description", content: "Structured PM learning tracks from foundations to advanced strategy, discovery, analytics, AI, and growth." },
      { property: "og:title", content: "Learning Paths — ProductPath" },
      { property: "og:description", content: "Structured product management learning tracks." },
      { property: "og:url", content: "/paths" },
    ],
    links: [{ rel: "canonical", href: "/paths" }],
  }),
  component: PathsPage,
});

const levelTone: Record<string, string> = {
  Beginner: "bg-brand-soft text-brand",
  Intermediate: "bg-secondary text-foreground",
  Advanced: "bg-foreground text-background",
};

function PathsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Learning paths"
        title="Pick a path. Finish it."
        description="Each path is a guided sequence of lessons designed to take you from where you are to a real, demonstrable skill."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {paths.map((p) => (
            <Link
              key={p.slug}
              to="/paths"
              className="group rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${levelTone[p.level]}`}>
                  {p.level}
                </span>
                <span className="text-xs text-muted-foreground">{p.tag}</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Layers className="h-3.5 w-3.5" /> {p.modules} modules</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {p.hours}h</span>
              </div>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium">
                Start path <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
