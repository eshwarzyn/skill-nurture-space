import { createFileRoute, Link } from "@tanstack/react-router";
import { resources } from "@/lib/content";
import { PageHeader } from "@/components/section";
import { BookMarked, CheckSquare, FileText, Hammer, LayoutTemplate } from "lucide-react";

const icons = {
  Template: LayoutTemplate,
  Framework: FileText,
  Checklist: CheckSquare,
  Book: BookMarked,
  Tool: Hammer,
} as const;

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Resources — ProductPath" },
      { name: "description", content: "Free PM templates, frameworks, checklists, tools, and recommended books." },
      { property: "og:title", content: "Resources — ProductPath" },
      { property: "og:description", content: "Free product management templates and tools." },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Resources"
        title="The toolkit, free."
        description="Templates and frameworks that working PMs actually use — open them up, copy, adapt."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => {
            const Icon = icons[r.type];
            const dedicatedHref = r.href && r.href !== "#" ? r.href : null;
            return (
              <Link
                key={r.title}
                to={(dedicatedHref ?? "/resources") as "/resources"}
                className="group rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Icon className="h-4 w-4 text-brand" /> {r.type}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
                <div className="mt-4 text-sm font-medium">Open →</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
