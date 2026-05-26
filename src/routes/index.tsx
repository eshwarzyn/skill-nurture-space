import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Compass, LineChart, Sparkles, Target, Users } from "lucide-react";
import { paths, articles } from "@/lib/content";
import { Section } from "@/components/section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProductPath — Learn product management, the modern way" },
      { name: "description", content: "Structured learning paths, courses, and articles for product managers. Easy to navigate, built for repeat learners." },
      { property: "og:title", content: "ProductPath — Learn product management" },
      { property: "og:description", content: "Structured paths, courses, and articles for product managers." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featuredPaths = paths.slice(0, 3);
  const latest = articles.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-6 sm:pb-20 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> New: AI Product Management path
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              Become the product manager
              <br />
              your team relies on.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Structured learning paths, focused courses, and writing from working PMs — all in one
              calm, easy-to-navigate place.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/paths"
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Explore learning paths <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Browse all courses
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
              <span>50+ lessons</span>
              <span aria-hidden>·</span>
              <span>6 learning paths</span>
              <span aria-hidden>·</span>
              <span>Updated weekly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento grid */}
      <Section
        eyebrow="Why ProductPath"
        title="Everything you need, nothing you don't."
        description="A small, well-organized library that respects your time and brings you back every week."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2">
          {/* Big card: Paths */}
          <Link
            to="/paths"
            className="group relative col-span-1 row-span-1 overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-[var(--shadow-card)] md:col-span-4 md:row-span-2 md:p-8"
          >
            <div
              className="absolute inset-0 opacity-60"
              style={{ background: "var(--gradient-hero)" }}
              aria-hidden
            />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Compass className="h-4 w-4" /> Learning paths
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                Follow a path, not a maze.
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
                Hand-curated tracks from foundations to advanced strategy. Pick one, finish it, level up.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {featuredPaths.map((p) => (
                  <div
                    key={p.slug}
                    className="rounded-xl border border-border bg-background/70 p-4 backdrop-blur"
                  >
                    <div className="text-xs text-muted-foreground">{p.level} · {p.hours}h</div>
                    <div className="mt-1 font-medium">{p.title}</div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6 text-sm font-medium text-foreground">
                See all paths <ArrowRight className="ml-1 inline h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>

          {/* Courses */}
          <Link
            to="/courses"
            className="group rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-[var(--shadow-card)] md:col-span-2"
          >
            <BookOpen className="h-5 w-5 text-brand" />
            <h3 className="mt-3 font-display text-lg font-semibold">Focused courses</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Bite-sized, practical lessons on PRDs, discovery, metrics and more.
            </p>
            <div className="mt-4 text-sm font-medium">Browse courses →</div>
          </Link>

          {/* Articles */}
          <Link
            to="/articles"
            className="group rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-[var(--shadow-card)] md:col-span-2"
          >
            <LineChart className="h-5 w-5 text-brand" />
            <h3 className="mt-3 font-display text-lg font-semibold">Sharp articles</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Short reads from working PMs — published weekly.
            </p>
            <div className="mt-4 text-sm font-medium">Read articles →</div>
          </Link>

          {/* Community-ish stat tile */}
          <div className="rounded-2xl border border-border bg-foreground p-6 text-background md:col-span-3">
            <Users className="h-5 w-5 opacity-80" />
            <h3 className="mt-3 font-display text-lg font-semibold">Built for repeat learners</h3>
            <p className="mt-1 text-sm opacity-80">
              Save progress, jump back into the same path, and finish what you start.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <Stat value="50+" label="Lessons" />
              <Stat value="6" label="Paths" />
              <Stat value="Weekly" label="Updates" />
            </div>
          </div>

          {/* Resources */}
          <Link
            to="/resources"
            className="group rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-[var(--shadow-card)] md:col-span-3"
          >
            <Target className="h-5 w-5 text-brand" />
            <h3 className="mt-3 font-display text-lg font-semibold">Templates & frameworks</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              PRDs, interview scripts, RICE calculators — the toolkit, free.
            </p>
            <div className="mt-4 text-sm font-medium">Open the library →</div>
          </Link>
        </div>
      </Section>

      {/* Latest writing */}
      <Section eyebrow="From the blog" title="Latest articles" description="Short, useful, no fluff.">
        <div className="grid gap-4 md:grid-cols-3">
          {latest.map((a) => (
            <article key={a.slug} className="rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-[var(--shadow-card)]">
              <div className="text-xs font-medium text-brand">{a.category}</div>
              <h3 className="mt-2 font-display text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
              <div className="mt-4 text-xs text-muted-foreground">{a.author} · {a.readTime} read</div>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/articles" className="text-sm font-medium underline-offset-4 hover:underline">
            See all articles →
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl border border-border bg-surface-muted p-8 sm:p-12 text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Start with one path. Finish it.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            The fastest way to grow is to pick one track and stay with it. We'll keep it simple.
          </p>
          <Link
            to="/paths"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Pick your path <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg bg-white/5 px-2 py-3 ring-1 ring-white/10">
      <div className="font-display text-xl font-semibold">{value}</div>
      <div className="text-xs opacity-70">{label}</div>
    </div>
  );
}
