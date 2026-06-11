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
        <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[oklch(0.92_0.12_60/0.35)] blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-brand" /> New: AI Product Management path
            </div>
            <h1 className="font-display text-5xl font-bold tracking-tight sm:text-7xl leading-[1.02] text-balance">
              Become the PM
              <br />
              <span className="bg-gradient-to-r from-[oklch(0.72_0.19_40)] via-[oklch(0.7_0.2_25)] to-[oklch(0.65_0.18_320)] bg-clip-text text-transparent">
                teams rely on.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Structured learning paths, focused courses, and writing from working PMs — all in one
              calm, easy-to-navigate place.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/paths"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background shadow-lg shadow-[oklch(0.2_0.05_40/0.15)] transition-all hover:bg-brand hover:shadow-[var(--shadow-glow)]"
              >
                Explore learning paths
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Browse all courses
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span>50+ Lessons</span>
              <span className="h-1 w-1 rounded-full bg-border" aria-hidden />
              <span>6 Learning Paths</span>
              <span className="h-1 w-1 rounded-full bg-border" aria-hidden />
              <span>Updated Weekly</span>
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
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* Big card: Paths */}
          <Link
            to="/paths"
            className="group relative overflow-hidden rounded-3xl border border-[oklch(0.92_0.08_60)] bg-[oklch(0.98_0.03_60)] p-8 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] md:col-span-8 md:p-10"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[oklch(0.85_0.15_50/0.25)] blur-3xl" aria-hidden />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[oklch(0.93_0.09_60)] text-brand">
                  <Compass className="h-5 w-5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-brand">Learning paths</span>
              </div>
              <h3 className="mt-5 font-display text-3xl font-bold sm:text-4xl">
                Follow a path,<br />not a maze.
              </h3>
              <p className="mt-3 max-w-md text-base text-muted-foreground">
                Hand-curated tracks from foundations to advanced strategy. Pick one, finish it, level up.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {featuredPaths.slice(0, 2).map((p) => (
                  <div
                    key={p.slug}
                    className="rounded-2xl border border-[oklch(0.92_0.06_60)] bg-surface p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{p.level} · {p.hours}h</div>
                    <div className="mt-1.5 font-semibold text-foreground">{p.title}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-brand">
                See all paths
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Courses */}
          <Link
            to="/courses"
            className="group rounded-3xl border border-border bg-surface p-7 transition-all hover:-translate-y-0.5 hover:border-[oklch(0.85_0.12_290)] hover:shadow-md md:col-span-4"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[oklch(0.95_0.05_290)] text-[oklch(0.55_0.18_290)] transition-transform group-hover:scale-110">
              <BookOpen className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold">Focused courses</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Bite-sized, practical lessons on PRDs, discovery, metrics and more.
            </p>
            <div className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[oklch(0.55_0.18_290)]">
              Browse courses <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Dark stat card */}
          <div className="relative overflow-hidden rounded-3xl bg-[oklch(0.2_0.04_270)] p-8 text-white md:col-span-7">
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-[oklch(0.72_0.19_40/0.25)] blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-[oklch(0.7_0.2_320/0.18)] blur-3xl" aria-hidden />
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <Users className="h-5 w-5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white/60">For repeat learners</span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold sm:text-3xl">Built for progress.</h3>
              <p className="mt-3 max-w-md text-sm text-white/70">
                Save progress, jump back into the same path, and finish what you start.
              </p>
              <div className="mt-7 grid grid-cols-3 gap-4">
                <Stat value="50+" label="Lessons" color="oklch(0.78 0.17 45)" />
                <Stat value="6" label="Paths" color="oklch(0.78 0.14 320)" />
                <Stat value="Weekly" label="Updates" color="oklch(0.82 0.13 210)" />
              </div>
            </div>
          </div>

          {/* Articles */}
          <Link
            to="/articles"
            className="group rounded-3xl border border-[oklch(0.9_0.07_210)] bg-[oklch(0.97_0.03_210)] p-7 transition-all hover:-translate-y-0.5 hover:shadow-md md:col-span-5"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-[oklch(0.55_0.15_210)] shadow-sm transition-transform group-hover:scale-110">
              <LineChart className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold">Sharp articles</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Short reads from working PMs — published every single Wednesday.
            </p>
            <div className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[oklch(0.5_0.15_210)]">
              Read articles <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Resources */}
          <Link
            to="/resources"
            className="group rounded-3xl border border-border bg-surface-muted p-7 transition-all hover:-translate-y-0.5 hover:bg-surface hover:shadow-md md:col-span-12"
          >
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[oklch(0.93_0.09_60)] text-brand">
                  <Target className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold">Templates & frameworks</h3>
                  <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                    PRDs, interview scripts, RICE calculators — the toolkit for modern product teams, free for all members.
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform group-hover:translate-x-1">
                Open the library <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>
      </Section>

      {/* Latest writing */}
      <Section eyebrow="From the blog" title="Latest articles" description="Short, useful, no fluff.">
        <div className="grid gap-6 md:grid-cols-3">
          {latest.map((a, i) => {
            const palette = [
              { bg: "oklch(0.95 0.08 60)", text: "oklch(0.55 0.18 40)" },
              { bg: "oklch(0.94 0.06 290)", text: "oklch(0.5 0.18 290)" },
              { bg: "oklch(0.94 0.07 210)", text: "oklch(0.45 0.15 210)" },
            ][i % 3];
            return (
              <article key={a.slug} className="group cursor-pointer">
                <div
                  className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl border border-border transition-shadow group-hover:shadow-lg"
                  style={{ backgroundColor: palette.bg }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                  <span
                    className="absolute bottom-4 left-4 rounded-full bg-surface px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm"
                    style={{ color: palette.text }}
                  >
                    {a.category}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold leading-snug transition-colors group-hover:text-brand">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
                  <span>{a.author}</span>
                  <span className="h-1 w-1 rounded-full bg-border" aria-hidden />
                  <span>{a.readTime} read</span>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-10">
          <Link
            to="/articles"
            className="group inline-flex items-center gap-2 text-sm font-bold text-foreground"
          >
            See all articles
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border transition-all group-hover:bg-foreground group-hover:text-background">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-surface-muted p-10 text-center sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[oklch(0.85_0.15_50/0.35)] blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-[oklch(0.85_0.13_290/0.3)] blur-3xl" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Start with one path. Finish it.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground sm:text-lg">
              The fastest way to grow is to pick one track and stay with it. We'll keep it simple.
            </p>
            <Link
              to="/paths"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-bold text-background shadow-xl shadow-[oklch(0.2_0.05_40/0.15)] transition-all hover:bg-brand hover:shadow-[var(--shadow-glow)]"
            >
              Pick your path
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color?: string }) {
  return (
    <div className="rounded-2xl bg-white/5 px-3 py-4 ring-1 ring-white/10">
      <div className="font-display text-2xl font-bold" style={color ? { color } : undefined}>
        {value}
      </div>
      <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/50">{label}</div>
    </div>
  );
}
