import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ProductPath" },
      { name: "description", content: "Why ProductPath exists: a calm, focused learning platform for product managers." },
      { property: "og:title", content: "About — ProductPath" },
      { property: "og:description", content: "Why ProductPath exists." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About"
        title="Calm learning for product people."
        description="ProductPath exists because PM learning is scattered across dozens of newsletters, courses, and threads. We put the essentials in one place."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="prose-like space-y-6 text-base text-muted-foreground">
          <p>
            We follow three rules: <strong className="text-foreground">structured over scattered</strong>,{" "}
            <strong className="text-foreground">applied over abstract</strong>, and{" "}
            <strong className="text-foreground">finished over started</strong>.
          </p>
          <p>
            Every path, course, and article is built with one question in mind: will a working PM
            use this on Monday morning? If the answer is no, we cut it.
          </p>
          <p>
            We're built for repeat learners — people who return weekly to chip away at a path,
            not binge-and-bounce. That's why navigation is simple, content is short, and there's
            a clear next step on every page.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-surface-muted p-8 text-center">
          <h2 className="font-display text-2xl font-semibold">Ready to start?</h2>
          <Link
            to="/paths"
            className="mt-4 inline-flex items-center rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90"
          >
            Explore learning paths
          </Link>
        </div>
      </div>
    </div>
  );
}
