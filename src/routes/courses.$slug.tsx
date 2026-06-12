import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { courses } from "@/lib/content";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Lightbulb,
  PlayCircle,
  Share2,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/courses/$slug")({
  head: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    const title = course ? `${course.title} — ProductPath` : "Course — ProductPath";
    const description = course?.description ?? "A focused, ship-ready product management course.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/courses/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/courses/${params.slug}` }],
    };
  },
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    return { course };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Course not found</h1>
      <p className="mt-2 text-muted-foreground">It may have moved or been renamed.</p>
      <Link to="/courses" className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">
        <ArrowLeft className="h-4 w-4" /> Back to courses
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
    </div>
  ),
  component: CourseDetail,
});

const modules = [
  {
    title: "Why most PRDs fail (and a better mental model)",
    duration: "12 min",
    type: "Lesson",
    free: true,
    bullets: ["The 3 reasons PRDs get ignored", "Specs vs. shared understanding", "When NOT to write a PRD"],
  },
  {
    title: "The one-pager template that ships",
    duration: "18 min",
    type: "Template walkthrough",
    bullets: ["Problem, customer, signal", "Solution shape (not pixels)", "Out of scope — explicit"],
  },
  {
    title: "Writing problems that engineers actually want to solve",
    duration: "14 min",
    type: "Lesson",
    bullets: ["Show the pain, hide the answer", "Quantify the gap", "Reference the source"],
  },
  {
    title: "Designing the solution without designing the UI",
    duration: "16 min",
    type: "Workshop",
    bullets: ["Capability-level specs", "Flow diagrams that age well", "Constraints > screenshots"],
  },
  {
    title: "Defining 'done' — success metrics + rollout",
    duration: "11 min",
    type: "Lesson",
    bullets: ["Leading vs. lagging signals", "Rollout gates", "What you'll cut if you're late"],
  },
  {
    title: "Live review: rewriting a real PRD",
    duration: "29 min",
    type: "Live review",
    bullets: ["Before / after", "Stakeholder feedback loop", "What the eng lead said"],
  },
];

const outcomes = [
  "Write a PRD in under 90 minutes that doesn't get rewritten",
  "Cut spec length in half without losing clarity",
  "Get an engineer to say 'this is the clearest spec I've read'",
  "Use the same one-pager from kickoff through launch",
];

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const related = courses.filter((c) => c.slug !== course.slug && c.category === course.category).slice(0, 3);
  const fallback = courses.filter((c) => c.slug !== course.slug).slice(0, 3);
  const recs = related.length ? related : fallback;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden />
        <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[oklch(0.92_0.12_60/0.35)] blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/courses" className="inline-flex items-center gap-1 hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Courses
            </Link>
            <span>/</span>
            <span className="text-foreground">{course.category}</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-brand" />
                {course.category} · {course.level}
              </div>
              <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                <span className="bg-gradient-to-r from-[oklch(0.72_0.19_40)] via-[oklch(0.7_0.2_25)] to-[oklch(0.65_0.18_320)] bg-clip-text text-transparent">
                  {course.title}
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                {course.description} Master the one-pager that engineering, design, and execs all actually read — and ship from.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.duration}</span>
                <span className="inline-flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {modules.length} lessons</span>
                <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> 4,218 enrolled</span>
                <span className="inline-flex items-center gap-1.5 text-foreground">
                  <Star className="h-4 w-4 fill-[oklch(0.82_0.16_75)] text-[oklch(0.82_0.16_75)]" /> 4.9 (612)
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-[oklch(0.2_0.05_40/0.15)_0_8px_24px_-8px] transition-shadow hover:shadow-[var(--shadow-glow)]">
                  <PlayCircle className="h-4 w-4" /> Start course
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted">
                  <Download className="h-4 w-4" /> Download PRD template
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Preview card */}
            <div className="relative">
              <div className="rounded-3xl border border-border bg-surface p-2 shadow-[var(--shadow-card)]">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-[oklch(0.78_0.17_45)] via-[oklch(0.72_0.19_30)] to-[oklch(0.65_0.18_320)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(1_0_0/0.25),transparent_50%)]" />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.15_0.04_280/0.5)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-white backdrop-blur">
                    Preview · 2:14
                  </div>
                  <button className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">
                    <PlayCircle className="h-8 w-8" />
                  </button>
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white/90">
                    <span className="font-display text-base font-semibold">Lesson 01 · Why most PRDs fail</span>
                    <span>HD</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-3">
                  <Stat label="Lessons" value={String(modules.length)} />
                  <Stat label="Templates" value="3" color="oklch(0.78 0.14 320)" />
                  <Stat label="Updated" value="Jun '26" color="oklch(0.82 0.13 210)" />
                </div>
              </div>

              {/* Floating tag */}
              <div className="absolute -right-3 -top-3 hidden rotate-3 rounded-2xl border border-border bg-surface px-3 py-2 text-xs font-semibold shadow-[var(--shadow-card)] sm:block">
                <span className="text-brand">★</span> Top 5 this month
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-14">
            {/* What you'll learn */}
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">What you'll walk away with</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {outcomes.map((o) => (
                  <div key={o} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                    <span className="text-sm text-foreground">{o}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div>
              <div className="flex items-end justify-between">
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Curriculum</h2>
                <span className="text-sm text-muted-foreground">{modules.length} lessons · {course.duration}</span>
              </div>
              <ol className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
                {modules.map((m, i) => (
                  <li key={m.title} className="group flex flex-col gap-3 p-5 transition-colors hover:bg-surface-muted sm:flex-row sm:items-start sm:gap-5">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[oklch(0.96_0.05_60)] font-display text-sm font-semibold text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-base font-semibold">{m.title}</h3>
                        {m.free && (
                          <span className="rounded-full bg-[oklch(0.93_0.09_70)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[oklch(0.3_0.1_40)]">
                            Free preview
                          </span>
                        )}
                      </div>
                      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        {m.bullets.map((b) => (
                          <li key={b} className="inline-flex items-center gap-1.5">
                            <span className="h-1 w-1 rounded-full bg-brand" /> {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground sm:flex-col sm:items-end">
                      <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {m.duration}</span>
                      <span>{m.type}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Sample / template preview */}
            <div className="overflow-hidden rounded-3xl border border-border bg-[oklch(0.15_0.04_280)] text-[oklch(0.97_0.02_60)]">
              <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.85_0.15_50/0.35)] px-3 py-1 text-xs font-medium text-[oklch(0.85_0.15_50)]">
                    <Lightbulb className="h-3.5 w-3.5" /> Inside the course
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">The one-pager, in one screen.</h2>
                  <p className="mt-3 max-w-md text-sm text-[oklch(0.82_0.04_60)]">
                    Every section earns its place. No filler. No "TBD". You'll get the exact Notion + Google Doc templates used by PMs at Stripe, Linear, and Figma.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.85_0.15_50)] px-5 py-2.5 text-sm font-medium text-[oklch(0.2_0.05_40)] transition-opacity hover:opacity-90">
                      <Download className="h-4 w-4" /> Get template
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.97_0.02_60/0.2)] px-4 py-2.5 text-sm font-medium text-[oklch(0.97_0.02_60)]">
                      <FileText className="h-4 w-4" /> See sample PRD
                    </button>
                  </div>
                </div>
                <div className="rounded-2xl border border-[oklch(0.97_0.02_60/0.12)] bg-[oklch(0.2_0.05_280)] p-5 font-mono text-xs leading-relaxed text-[oklch(0.88_0.03_60)]">
                  <div className="mb-3 flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.2_25)]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.82_0.16_75)]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.18_150)]" />
                    <span className="ml-2 text-[10px] uppercase tracking-widest text-[oklch(0.7_0.04_60)]">PRD · Onboarding v2</span>
                  </div>
                  <p><span className="text-[oklch(0.85_0.15_50)]">## Problem</span></p>
                  <p className="text-[oklch(0.92_0.03_60)]">62% of new users never reach "first PR shipped" — they bounce at the workspace step.</p>
                  <p className="mt-2"><span className="text-[oklch(0.85_0.15_50)]">## Customer</span></p>
                  <p className="text-[oklch(0.92_0.03_60)]">PM at a 20–200 person SaaS, first 7 days, multi-product portfolio.</p>
                  <p className="mt-2"><span className="text-[oklch(0.85_0.15_50)]">## Solution shape</span></p>
                  <p className="text-[oklch(0.92_0.03_60)]">Replace 4-step wizard with a 1-screen workspace + sample data. Defer integrations.</p>
                  <p className="mt-2"><span className="text-[oklch(0.85_0.15_50)]">## Success</span></p>
                  <p className="text-[oklch(0.92_0.03_60)]">D1 activation 38% → 55%. Guardrail: support tickets flat WoW.</p>
                  <p className="mt-2"><span className="text-[oklch(0.85_0.15_50)]">## Out of scope</span></p>
                  <p className="text-[oklch(0.92_0.03_60)]">Mobile, SSO, billing flows.</p>
                </div>
              </div>
            </div>

            {/* Instructor */}
            <div className="rounded-3xl border border-border bg-surface p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[oklch(0.78_0.17_45)] to-[oklch(0.65_0.18_320)] font-display text-2xl font-bold text-white">
                  MC
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium uppercase tracking-widest text-brand">Your instructor</div>
                  <h3 className="mt-1 font-display text-xl font-semibold">Maya Chen</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Former Group PM at Linear and Stripe. Has shipped 40+ products with the exact one-pager taught in this course.
                  </p>
                </div>
                <Link to="/about" className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-brand">
                  Profile <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
              <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Includes</div>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  { icon: PlayCircle, label: `${modules.length} on-demand lessons` },
                  { icon: FileText, label: "3 downloadable templates" },
                  { icon: Target, label: "End-of-course rubric" },
                  { icon: Users, label: "Private Slack channel" },
                ].map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-foreground">
                    <Icon className="h-4 w-4 text-brand" /> {label}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-border pt-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-semibold">Free</span>
                  <span className="text-sm text-muted-foreground line-through">$49</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Included with ProductPath membership.</p>
                <button className="mt-4 w-full rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90">
                  Enroll now
                </button>
                <button className="mt-2 w-full rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted">
                  Save for later
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-dashed border-border bg-surface-muted p-5 text-xs text-muted-foreground">
              <div className="font-semibold text-foreground">100% money-back</div>
              Finish the first 2 lessons. If it's not the clearest PRD guidance you've seen, get a full refund — no questions.
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Keep going</h2>
            <Link to="/courses" className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-brand">
              All courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {recs.map((c) => (
              <Link
                key={c.slug}
                to="/courses/$slug"
                params={{ slug: c.slug }}
                className="group rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{c.category}</span>
                  <span>{c.duration}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold group-hover:text-brand">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand">
                  View course <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-xl bg-surface-muted p-3 text-center">
      <div className="font-display text-lg font-semibold" style={color ? { color } : undefined}>{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
