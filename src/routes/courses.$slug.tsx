"use client";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
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
  RotateCcw,
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

type QuizOption = { t: string; correct: boolean };
type Module = {
  title: string;
  tag: string;
  eyebrow: string;
  desc: string;
  body: string[];
  formulas: string[];
  keys: string[];
  benchmarks: { label: string; val: string }[];
  quiz: { q: string; opts: QuizOption[]; ok: string; bad: string };
};

const kpiModules: Module[] = [
  {
    title: "Daily & Monthly Active Users",
    tag: "DAU · MAU",
    eyebrow: "Module 1 of 5",
    desc: "Understand how to measure who is actually using your product and how often — and why the ratio between daily and monthly users tells you more than either number alone.",
    body: [
      "Daily Active Users (DAU) counts unique users who perform at least one qualifying action within a 24-hour window. Monthly Active Users (MAU) does the same over a rolling 30-day window.",
      "The qualifying action must be deliberately defined per product — for a messaging app it might be sending a message; for an e-commerce site, viewing a product page. Using a vague definition like \"opens the app\" inflates the number and destroys signal.",
      "The DAU/MAU ratio — called the <strong>Stickiness ratio</strong> — is often more revealing than either metric alone. It answers: \"Of everyone who touches us monthly, how many come back daily?\" A high stickiness score signals habitual use; a low one signals that the product is used occasionally, not as a daily tool.",
      "Weekly Active Users (WAU) is preferred for products used multiple times a week but not daily — for example, project management tools or team wikis. Always choose the cadence that reflects your product's natural use frequency.",
    ],
    formulas: [
      "DAU = count of unique users with 1+ qualifying event on a given day",
      "MAU = count of unique users with 1+ qualifying event in the last 30 days",
      "Stickiness = (DAU / MAU) x 100%",
    ],
    keys: [
      "Define your qualifying event precisely — it must reflect genuine value delivery, not passive presence.",
      "Track trends over time, not just snapshots — a rising DAU/MAU ratio signals growing habit formation.",
      "Segment by acquisition channel: DAU/MAU often varies dramatically between organic vs paid users.",
      "World-class stickiness (Facebook, Instagram): 60-70%. Healthy range: 20-50%. Below 20% needs attention.",
      "A product with high MAU but low stickiness is reaching people but not building habit — the classic leaky engagement problem.",
    ],
    benchmarks: [
      { label: "Facebook / Instagram", val: "~66% stickiness" },
      { label: "Twitter / X", val: "~25%" },
      { label: "Casual games avg.", val: "15-25%" },
    ],
    quiz: {
      q: "A fitness app has 120,000 MAU and 18,000 DAU. What is the stickiness ratio and what does it signal?",
      opts: [
        { t: "15% — people use it occasionally, not as a daily habit", correct: true },
        { t: "15% — strong daily engagement, near world-class", correct: false },
        { t: "6.7 — users per day per monthly user", correct: false },
        { t: "18% — healthy stickiness for a fitness app", correct: false },
      ],
      ok: "Correct. 18,000 / 120,000 = 15%. For a fitness app this is expected (people don't work out every day), but it signals the product isn't a daily habit. Compare against category benchmarks, not generic ones.",
      bad: "Not quite. Stickiness = DAU / MAU x 100% = 18,000 / 120,000 x 100% = 15%. The question is whether 15% is good for a fitness app — context and category benchmarks matter as much as the number itself.",
    },
  },
  {
    title: "Retention Rate",
    tag: "Cohort analysis",
    eyebrow: "Module 2 of 5",
    desc: "Learn why retention is the single most important long-term health metric, how to track it correctly with cohort analysis, and what a healthy retention curve looks like.",
    body: [
      "Retention measures the percentage of users from a cohort (a group acquired in a specific time window) who remain active after N days, weeks, or months. Low retention means the leaky bucket problem: no acquisition strategy can overcome a product people stop using.",
      "Retention is tracked as a <strong>curve</strong>, not a single number. Plotting Day 1, 7, 14, 30, and 90 reveals two critical patterns: the steepness of early drop-off (Day 1-7), and whether the curve flattens. A curve that levels off at any value above zero is evidence of product-market fit.",
      "Cohort analysis prevents survivorship bias. Averaging across all users hides the fact that early cohorts (who had more time to churn) are dragging down the metric. Proper cohort-based retention shows whether the product is improving over time.",
      "The magic number pattern: Slack found that teams who exchanged 2,000 messages had 93% retention. This kind of discovery — a specific behaviour threshold that predicts long-term retention — should reshape onboarding to push users toward that milestone.",
    ],
    formulas: [
      "Day-N retention = (users from cohort still active on Day N / original cohort size) x 100%",
    ],
    keys: [
      "A flattening retention curve at any level above zero signals product-market fit for a user segment.",
      "Day-1 retention is the most powerful lever: improving it by 1 pp often lifts Day-30 retention by 5+ pp (Duolingo's experience).",
      "Use cohort-based tracking, never aggregate averages — aggregates hide whether things are getting better.",
      "Identify your magic number — the usage threshold that predicts long-term retention — and redesign onboarding around it.",
      "Good Day-1 retention: >40%. Good Day-7: >20%. Good Day-30: >10%. These vary significantly by category.",
    ],
    benchmarks: [
      { label: "Day 1 (good)", val: ">40%" },
      { label: "Day 7 (good)", val: ">20%" },
      { label: "Day 30 (good)", val: ">10%" },
      { label: "Duolingo Day-30", val: "40%+" },
    ],
    quiz: {
      q: "You acquire 4,000 users in January. On Day 30, 600 are still active. On Day 30 of the February cohort (also 4,000 users), 720 are active. What should you conclude?",
      opts: [
        { t: "Retention improved: from 15% to 18% between cohorts", correct: true },
        { t: "Retention is flat — absolute numbers are more meaningful than percentages", correct: false },
        { t: "February's cohort is worse because fewer total users stayed active", correct: false },
        { t: "You cannot compare cohorts without knowing their acquisition channels", correct: false },
      ],
      ok: "Correct. Jan: 600 / 4,000 = 15%. Feb: 720 / 4,000 = 18%. Cohort-based retention reveals the trend — absolute numbers are misleading when cohort sizes differ.",
      bad: "Check your maths. Jan: 600 / 4,000 = 15%. Feb: 720 / 4,000 = 18%. Cohort percentages are what matter — the cohort sizes are equal, so percentages are the fair comparison.",
    },
  },
  {
    title: "Conversion Rate",
    tag: "Funnel · CVR",
    eyebrow: "Module 3 of 5",
    desc: "Master how to measure and optimise the percentage of users who complete desired actions at each stage of your product funnel.",
    body: [
      "Conversion rate measures the percentage of users who complete a desired action out of those who had the opportunity. The desired action is relative to a specific funnel stage — it could be signing up, activating a feature, upgrading to paid, completing a purchase, or sharing a referral.",
      "Every funnel has multiple conversion steps, and the overall funnel conversion rate is the <strong>product</strong> of all step-level rates. A four-step funnel with 50% conversion at each step delivers just 6.25% end-to-end (0.5 to the power of 4). This compounding effect means small improvements at early stages have outsized downstream impact.",
      "The highest-leverage conversions to optimise are usually the aha moment step (first genuine value delivery) and the free-to-paid upgrade step. These are where the most value and the most drop-off typically coincide.",
      "Conversion optimisation is validated by A/B testing — changing one variable at a time and measuring statistical significance before shipping. Without this discipline, you are guessing at what moved the needle.",
    ],
    formulas: [
      "CVR = (users who completed the action / users who had the opportunity) x 100%",
      "End-to-end funnel CVR = CVR step 1 x CVR step 2 x ... x CVR step N",
    ],
    keys: [
      "Conversion is always relative to a specific funnel step — always state which step you are measuring.",
      "Improving an early step has compounding benefits for all downstream steps.",
      "Biggest leverage points: the aha moment (first value delivery) and the free-to-paid upgrade.",
      "Landing page CVR benchmark: 2-5% typical; 5%+ is strong.",
      "Freemium-to-paid benchmark: 2-5% typical; Spotify sits at ~26% paid of MAU.",
      "SaaS free-trial-to-paid benchmark: 15-25% is the target range.",
      "Always A/B test changes — correlation between a change and a CVR lift is not causation without controls.",
    ],
    benchmarks: [
      { label: "Visitor to sign-up", val: "2-5%" },
      { label: "Freemium to paid", val: "2-5%" },
      { label: "Trial to paid (SaaS)", val: "15-25%" },
      { label: "Dropbox referral uplift", val: "+60%" },
    ],
    quiz: {
      q: "10,000 visitors see your landing page. 800 sign up. 320 activate a core feature. 96 upgrade to paid. What is the visitor-to-paid conversion rate, and which step has the worst drop-off?",
      opts: [
        { t: "0.96% visitor-to-paid; worst drop-off is activation (800 to 320, 60% lost)", correct: true },
        { t: "9.6% visitor-to-paid; worst drop-off is sign-up (10,000 to 800, 92% lost)", correct: false },
        { t: "0.96% visitor-to-paid; worst drop-off is upgrade (320 to 96, 70% lost)", correct: false },
        { t: "3.2% visitor-to-paid; drop-offs are equal across all steps", correct: false },
      ],
      ok: "Correct. 96 / 10,000 = 0.96%. Step drops: sign-up 8% CVR (92% lost), activation 40% CVR (60% lost), upgrade 30% CVR (70% lost). Activation loses the most users in absolute count; upgrade has the steepest percentage loss.",
      bad: "Sign-up: 800 / 10,000 = 8% CVR (92% lost). Activation: 320 / 800 = 40% CVR (60% lost). Upgrade: 96 / 320 = 30% CVR (70% lost). Overall: 96 / 10,000 = 0.96%.",
    },
  },
  {
    title: "Churn Rate",
    tag: "Churn · MRR impact",
    eyebrow: "Module 4 of 5",
    desc: "Understand why churn is the growth killer hiding in plain sight, how to calculate its true annual impact, and the proven strategies to reduce it.",
    body: [
      "Churn rate is the percentage of users or customers who stop using the product within a given period — the inverse of retention. User churn tracks all active users who go inactive; revenue churn (MRR churn) tracks the monthly recurring revenue lost specifically to cancellations.",
      "The compounding nature of churn is what makes it dangerous. A <strong>3% monthly churn rate</strong> sounds modest, but it compounds to approximately 31% annual churn — meaning you lose nearly a third of your customer base and must replace it just to stay flat.",
      "MRR churn is more business-critical than user churn for subscription products. Losing 100 users who each paid $10/month is worse than losing 200 users who were on a free plan.",
      "Predictive churn modelling uses behavioural signals (dropping session frequency, support ticket volume, feature abandonment) to identify at-risk accounts before they cancel, enabling proactive intervention.",
    ],
    formulas: [
      "Monthly churn = (customers lost in month / customers at start of month) x 100%",
      "MRR churn = MRR lost to cancellations / MRR at start of month x 100%",
      "Annual churn = 1 - (1 - monthly churn rate)^12",
      "Revenue churn can be negative if expansion MRR exceeds cancellation MRR (net revenue retention above 100%)",
    ],
    keys: [
      "3% monthly churn = ~31% annual churn — replace a third of your customer base each year just to stay flat.",
      "Best-in-class SaaS churn: under 0.5%/month. Healthy: 1-2%. Needs attention: above 3%.",
      "Netflix keeps churn below 2%/month vs 5-7% industry average through algorithmic personalisation.",
      "MRR churn matters more than user churn for subscription businesses — track both, but weight MRR churn.",
      "The best churn-reduction lever is onboarding — users who reach value quickly churn far less.",
    ],
    benchmarks: [
      { label: "Best SaaS (annual)", val: "<6%" },
      { label: "Healthy SaaS (monthly)", val: "1-2%" },
      { label: "Netflix monthly", val: "<2%" },
      { label: "Avg SaaS (monthly)", val: "3-5%" },
    ],
    quiz: {
      q: "A SaaS company starts the month with 2,000 customers at $50 MRR each. They lose 80 customers but gain 200 new ones. What is the monthly churn rate and MRR impact of churn?",
      opts: [
        { t: "4% churn rate; $4,000 MRR lost to cancellations", correct: true },
        { t: "-6% churn rate; net positive because new customers exceed churn", correct: false },
        { t: "4% churn rate; MRR impact is zero because new customers offset it", correct: false },
        { t: "4% churn rate; $10,000 MRR lost because 200 customers joined", correct: false },
      ],
      ok: "Correct. Churn = 80 / 2,000 = 4%. MRR churn = 80 x $50 = $4,000 lost. New customer MRR = 200 x $50 = $10,000 gained. Churn rate is always calculated on the opening base — new additions do not offset the churn figure itself.",
      bad: "Churn = customers lost / customers at start = 80 / 2,000 = 4%. MRR lost to churn = 80 x $50 = $4,000. New customers are a separate acquisition metric — they do not reduce the churn rate.",
    },
  },
  {
    title: "Reading KPIs Together",
    tag: "Synthesis",
    eyebrow: "Module 5 of 5",
    desc: "Learn how DAU, MAU, Retention, Conversion, and Churn form an interconnected system — and how to diagnose which metric to fix first.",
    body: [
      "Each KPI answers a different question, but they are interdependent. DAU and MAU tell you who is engaging and how often. Retention tells you whether that engagement lasts. Conversion tells you how efficiently you turn attention into action. Churn tells you how quickly you lose what you have built.",
      "The AARRR framework (Acquisition to Activation to Retention to Revenue to Referral) maps each KPI to a stage in the user lifecycle. Conversion is the primary Acquisition and Activation metric. DAU/MAU governs Retention and Referral. Churn is the Revenue stage warning signal.",
      "A product with high MAU but low DAU/MAU is reaching people but not building habit — the occasional use trap. A product with high conversion but high churn is an efficient top-of-funnel with a broken product experience. A product with high retention and low conversion has strong product-market fit but a marketing or onboarding problem.",
      "The right benchmark is always category-specific. A 15% DAU/MAU stickiness that would concern a social app is perfectly healthy for a quarterly tax tool. Context determines what is good.",
    ],
    formulas: [
      "LTV = ARPU / churn rate (the lower your churn, the higher the lifetime value of each user)",
      "Net Revenue Retention = (MRR start + expansion - churn - contraction) / MRR start x 100%",
      "Growth = new users - churned users (you must acquire faster than you lose)",
    ],
    keys: [
      "High MAU + low stickiness = reach without habit. Fix: redesign for daily use cases.",
      "High conversion + high churn = good acquisition, broken experience. Fix: fix onboarding and core product loop.",
      "High retention + low conversion = PMF exists, marketing/onboarding problem. Fix: reduce friction to first value.",
      "The most impactful investment varies by lifecycle stage: early = retention; growth = conversion; scale = churn reduction.",
      "Net Revenue Retention above 100% means existing customers are growing in value — the most powerful compounding metric in SaaS.",
    ],
    benchmarks: [
      { label: "NRR world-class SaaS", val: ">120%" },
      { label: "NRR healthy", val: "100-120%" },
      { label: "LTV:CAC target", val: ">3:1" },
    ],
    quiz: {
      q: "A B2C app reports: MAU growing 20% MoM, Day-30 retention 8%, DAU/MAU 12%, conversion 6%. What is the most urgent problem?",
      opts: [
        { t: "Retention — 8% Day-30 means 92% of users are gone within a month; growth is masking a broken product loop", correct: true },
        { t: "Conversion — 6% is below the 15-25% SaaS benchmark", correct: false },
        { t: "Stickiness — 12% DAU/MAU is the critical issue to address first", correct: false },
        { t: "Nothing — 20% MoM MAU growth is strong, the other metrics are fine", correct: false },
      ],
      ok: "Correct. 8% Day-30 retention is the fire. 92% of acquired users are gone within 30 days — the 20% MAU growth is the treadmill running faster to fill the leaky bucket. Fixing retention delivers compounding returns; no acquisition strategy sustains a product people stop using.",
      bad: "The most urgent signal is Day-30 retention at 8%. 92% of users leave within a month — MAU growth is masking the problem by constant re-acquisition. This is the classic leaky bucket. Conversion (6% for B2C is actually reasonable) and stickiness are secondary until retention is addressed.",
    },
  },
];

const prdModules = [
  { title: "Why most PRDs fail (and a better mental model)", duration: "12 min", type: "Lesson", free: true, bullets: ["The 3 reasons PRDs get ignored", "Specs vs. shared understanding", "When NOT to write a PRD"] },
  { title: "The one-pager template that ships", duration: "18 min", type: "Template walkthrough", free: false, bullets: ["Problem, customer, signal", "Solution shape (not pixels)", "Out of scope — explicit"] },
  { title: "Writing problems that engineers actually want to solve", duration: "14 min", type: "Lesson", free: false, bullets: ["Show the pain, hide the answer", "Quantify the gap", "Reference the source"] },
  { title: "Designing the solution without designing the UI", duration: "16 min", type: "Workshop", free: false, bullets: ["Capability-level specs", "Flow diagrams that age well", "Constraints > screenshots"] },
  { title: "Defining 'done' — success metrics + rollout", duration: "11 min", type: "Lesson", free: false, bullets: ["Leading vs. lagging signals", "Rollout gates", "What you'll cut if you're late"] },
  { title: "Live review: rewriting a real PRD", duration: "29 min", type: "Live review", free: false, bullets: ["Before / after", "Stakeholder feedback loop", "What the eng lead said"] },
];

const prdOutcomes = [
  "Write a PRD in under 90 minutes that doesn't get rewritten",
  "Cut spec length in half without losing clarity",
  "Get an engineer to say 'this is the clearest spec I've read'",
  "Use the same one-pager from kickoff through launch",
];

function QuizBlock({ quiz }: { quiz: Module["quiz"] }) {
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const letters = ["A", "B", "C", "D"];

  return (
    <div className="mt-8 rounded-3xl border border-border bg-surface p-6">
      <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand">Knowledge check</div>
      <p className="mb-5 text-sm font-medium leading-7 text-foreground">{quiz.q}</p>
      <div className="flex flex-col gap-2">
        {quiz.opts.map((opt, i) => {
          let cls = "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-all text-left w-full ";
          if (!answered) {
            cls += "border-border bg-secondary text-muted-foreground hover:border-foreground/30 hover:text-foreground cursor-pointer";
          } else if (opt.correct) {
            cls += "border-[oklch(0.7_0.18_145)] bg-[oklch(0.96_0.06_145)] text-[oklch(0.35_0.15_145)]";
          } else if (i === selected && !opt.correct) {
            cls += "border-[oklch(0.7_0.18_25)] bg-[oklch(0.97_0.05_25)] text-[oklch(0.4_0.18_25)]";
          } else {
            cls += "border-border bg-secondary text-muted-foreground opacity-60";
          }
          return (
            <button key={i} className={cls} disabled={answered} onClick={() => { setAnswered(true); setSelected(i); }}>
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${answered && opt.correct ? "bg-[oklch(0.5_0.18_145)] text-white" : answered && i === selected && !opt.correct ? "bg-[oklch(0.6_0.18_25)] text-white" : "bg-surface text-muted-foreground"}`}>
                {letters[i]}
              </span>
              <span>{opt.t}</span>
            </button>
          );
        })}
      </div>
      {answered && selected !== null && (
        <div className={`mt-4 rounded-xl border p-4 text-sm leading-6 ${quiz.opts[selected]?.correct ? "border-[oklch(0.85_0.1_145)] bg-[oklch(0.96_0.06_145)] text-[oklch(0.35_0.15_145)]" : "border-[oklch(0.85_0.08_25)] bg-[oklch(0.97_0.05_25)] text-[oklch(0.4_0.18_25)]"}`}>
          {quiz.opts[selected]?.correct ? quiz.ok : quiz.bad}
        </div>
      )}
    </div>
  );
}

function InteractiveCourse({ modules, course }: { modules: Module[]; course: (typeof courses)[number] }) {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState<Set<number>>(new Set());

  const mod = modules[current]!;
  const pct = Math.round((done.size / modules.length) * 100);

  function markDone() {
    const next = new Set(done);
    next.add(current);
    setDone(next);
    if (current < modules.length - 1) {
      setCurrent(current + 1);
      window.scrollTo(0, 0);
    }
  }

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden />
        <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[oklch(0.92_0.12_60/0.35)] blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/courses" className="inline-flex items-center gap-1 hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Courses</Link>
            <span>/</span><span className="text-foreground">{course.category}</span>
          </div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand" />{course.category} · {course.level}
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-[oklch(0.72_0.19_40)] via-[oklch(0.7_0.2_25)] to-[oklch(0.65_0.18_320)] bg-clip-text text-transparent">{course.title}</span>
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted-foreground">{course.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.duration}</span>
            <span className="inline-flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {modules.length} modules</span>
            <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> 3,841 enrolled</span>
            <span className="inline-flex items-center gap-1.5 text-foreground"><Star className="h-4 w-4 fill-[oklch(0.82_0.16_75)] text-[oklch(0.82_0.16_75)]" /> 4.8 (487)</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-4 rounded-2xl border border-border bg-surface p-4">
              <div className="mb-2 text-xs text-muted-foreground">Course progress</div>
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-2 text-sm font-semibold text-brand">{pct}% complete</div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="border-b border-border px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Modules</div>
              <ol>
                {modules.map((m, i) => (
                  <li key={m.title}>
                    <button
                      onClick={() => { setCurrent(i); window.scrollTo(0, 0); }}
                      className={`flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left text-sm transition-colors last:border-b-0 ${i === current ? "bg-[oklch(0.97_0.04_60)] font-semibold text-brand" : done.has(i) ? "text-[oklch(0.4_0.15_145)] hover:bg-surface-muted" : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"}`}
                    >
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${done.has(i) ? "bg-[oklch(0.5_0.18_145)] text-white" : i === current ? "bg-brand text-white" : "bg-secondary text-muted-foreground"}`}>
                        {done.has(i) ? "✓" : i + 1}
                      </span>
                      <span className="leading-snug">{m.title}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <button
              onClick={() => { setDone(new Set()); setCurrent(0); window.scrollTo(0, 0); }}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset progress
            </button>
          </aside>

          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand">{mod.eyebrow} · {mod.tag}</div>
            <h2 className="font-display text-3xl font-bold tracking-tight">{mod.title}</h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">{mod.desc}</p>

            <div className="mt-8 space-y-4">
              {mod.body.map((p, i) => (
                <p key={i} className="text-sm leading-7 text-muted-foreground" dangerouslySetInnerHTML={{ __html: p.replace(/<strong>/g, '<strong class="font-semibold text-foreground">') }} />
              ))}
            </div>

            <div className="mt-6 space-y-2">
              {mod.formulas.map((f) => (
                <div key={f} className="rounded-xl border-l-4 border-brand bg-[oklch(0.97_0.04_60)] px-4 py-3 font-mono text-xs leading-6 text-foreground">{f}</div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
              <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span className="text-brand">◆</span> Key principles
              </div>
              <ul className="space-y-3">
                {mod.keys.map((k) => (
                  <li key={k} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand opacity-60" />{k}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {mod.benchmarks.map((b) => (
                <div key={b.label} className="rounded-lg border border-border bg-surface px-3 py-2 text-xs">
                  <strong className="text-foreground">{b.val}</strong> <span className="text-muted-foreground">— {b.label}</span>
                </div>
              ))}
            </div>

            <QuizBlock quiz={mod.quiz} />

            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <button disabled={current === 0} onClick={() => { setCurrent(current - 1); window.scrollTo(0, 0); }} className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30">
                <ArrowLeft className="h-4 w-4" /> Previous
              </button>
              <button onClick={markDone} className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90">
                {done.has(current) ? "Next module" : "Mark complete & continue"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {done.size === modules.length && (
              <div className="mt-8 rounded-3xl border border-brand/25 bg-[oklch(0.97_0.04_60)] p-8 text-center">
                <div className="text-3xl">🎓</div>
                <h3 className="mt-3 font-display text-2xl font-bold">Course complete!</h3>
                <p className="mt-2 text-sm text-muted-foreground">You have worked through all {modules.length} modules. Use the Resources page for quick reference any time.</p>
                <Link to="/resources/rice-calculator" className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">
                  Open KPI Tools <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function StaticCourseDetail({ course }: { course: (typeof courses)[number] }) {
  const related = courses.filter((c) => c.slug !== course.slug && c.category === course.category).slice(0, 3);
  const fallback = courses.filter((c) => c.slug !== course.slug).slice(0, 3);
  const recs = related.length ? related : fallback;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden />
        <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[oklch(0.92_0.12_60/0.35)] blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/courses" className="inline-flex items-center gap-1 hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Courses</Link>
            <span>/</span><span className="text-foreground">{course.category}</span>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-brand" />{course.category} · {course.level}
              </div>
              <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                <span className="bg-gradient-to-r from-[oklch(0.72_0.19_40)] via-[oklch(0.7_0.2_25)] to-[oklch(0.65_0.18_320)] bg-clip-text text-transparent">{course.title}</span>
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">{course.description} Master the one-pager that engineering, design, and execs all actually read — and ship from.</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.duration}</span>
                <span className="inline-flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {prdModules.length} lessons</span>
                <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> 4,218 enrolled</span>
                <span className="inline-flex items-center gap-1.5 text-foreground"><Star className="h-4 w-4 fill-[oklch(0.82_0.16_75)] text-[oklch(0.82_0.16_75)]" /> 4.9 (612)</span>
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
            <div className="relative">
              <div className="rounded-3xl border border-border bg-surface p-2 shadow-[var(--shadow-card)]">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-[oklch(0.78_0.17_45)] via-[oklch(0.72_0.19_30)] to-[oklch(0.65_0.18_320)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(1_0_0/0.25),transparent_50%)]" />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.15_0.04_280/0.5)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-white backdrop-blur">Preview · 2:14</div>
                  <button className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"><PlayCircle className="h-8 w-8" /></button>
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white/90">
                    <span className="font-display text-base font-semibold">Lesson 01 · Why most PRDs fail</span><span>HD</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-3">
                  <Stat label="Lessons" value={String(prdModules.length)} />
                  <Stat label="Templates" value="3" color="oklch(0.78 0.14 320)" />
                  <Stat label="Updated" value="Jun '26" color="oklch(0.82 0.13 210)" />
                </div>
              </div>
              <div className="absolute -right-3 -top-3 hidden rotate-3 rounded-2xl border border-border bg-surface px-3 py-2 text-xs font-semibold shadow-[var(--shadow-card)] sm:block">
                <span className="text-brand">★</span> Top 5 this month
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-14">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">What you'll walk away with</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {prdOutcomes.map((o) => (
                  <div key={o} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" /><span className="text-sm text-foreground">{o}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between">
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Curriculum</h2>
                <span className="text-sm text-muted-foreground">{prdModules.length} lessons · {course.duration}</span>
              </div>
              <ol className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
                {prdModules.map((m, i) => (
                  <li key={m.title} className="group flex flex-col gap-3 p-5 transition-colors hover:bg-surface-muted sm:flex-row sm:items-start sm:gap-5">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[oklch(0.96_0.05_60)] font-display text-sm font-semibold text-brand">{String(i + 1).padStart(2, "0")}</div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-base font-semibold">{m.title}</h3>
                        {m.free && <span className="rounded-full bg-[oklch(0.93_0.09_70)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[oklch(0.3_0.1_40)]">Free preview</span>}
                      </div>
                      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        {m.bullets.map((b) => <li key={b} className="inline-flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-brand" /> {b}</li>)}
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

            <div className="overflow-hidden rounded-3xl border border-border bg-[oklch(0.15_0.04_280)] text-[oklch(0.97_0.02_60)]">
              <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.85_0.15_50/0.35)] px-3 py-1 text-xs font-medium text-[oklch(0.85_0.15_50)]">
                    <Lightbulb className="h-3.5 w-3.5" /> Inside the course
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">The one-pager, in one screen.</h2>
                  <p className="mt-3 max-w-md text-sm text-[oklch(0.82_0.04_60)]">Every section earns its place. No filler. No "TBD". You'll get the exact Notion + Google Doc templates used by PMs at Stripe, Linear, and Figma.</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.85_0.15_50)] px-5 py-2.5 text-sm font-medium text-[oklch(0.2_0.05_40)] transition-opacity hover:opacity-90"><Download className="h-4 w-4" /> Get template</button>
                    <button className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.97_0.02_60/0.2)] px-4 py-2.5 text-sm font-medium text-[oklch(0.97_0.02_60)]"><FileText className="h-4 w-4" /> See sample PRD</button>
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
                  <p className="text-[oklch(0.92_0.03_60)]">PM at a 20-200 person SaaS, first 7 days, multi-product portfolio.</p>
                  <p className="mt-2"><span className="text-[oklch(0.85_0.15_50)]">## Solution shape</span></p>
                  <p className="text-[oklch(0.92_0.03_60)]">Replace 4-step wizard with a 1-screen workspace + sample data. Defer integrations.</p>
                  <p className="mt-2"><span className="text-[oklch(0.85_0.15_50)]">## Success</span></p>
                  <p className="text-[oklch(0.92_0.03_60)]">D1 activation 38% to 55%. Guardrail: support tickets flat WoW.</p>
                  <p className="mt-2"><span className="text-[oklch(0.85_0.15_50)]">## Out of scope</span></p>
                  <p className="text-[oklch(0.92_0.03_60)]">Mobile, SSO, billing flows.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[oklch(0.78_0.17_45)] to-[oklch(0.65_0.18_320)] font-display text-2xl font-bold text-white">MC</div>
                <div className="flex-1">
                  <div className="text-xs font-medium uppercase tracking-widest text-brand">Your instructor</div>
                  <h3 className="mt-1 font-display text-xl font-semibold">Maya Chen</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Former Group PM at Linear and Stripe. Has shipped 40+ products with the exact one-pager taught in this course.</p>
                </div>
                <Link to="/about" className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-brand">Profile <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
              <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Includes</div>
              <ul className="mt-4 space-y-3 text-sm">
                {[{ icon: PlayCircle, label: `${prdModules.length} on-demand lessons` }, { icon: FileText, label: "3 downloadable templates" }, { icon: Target, label: "End-of-course rubric" }, { icon: Users, label: "Private Slack channel" }].map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-foreground"><Icon className="h-4 w-4 text-brand" /> {label}</li>
                ))}
              </ul>
              <div className="mt-6 border-t border-border pt-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-semibold">Free</span>
                  <span className="text-sm text-muted-foreground line-through">$49</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Included with ProductPath membership.</p>
                <button className="mt-4 w-full rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90">Enroll now</button>
                <button className="mt-2 w-full rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted">Save for later</button>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-dashed border-border bg-surface-muted p-5 text-xs text-muted-foreground">
              <div className="font-semibold text-foreground">100% money-back</div>
              Finish the first 2 lessons. If it's not the clearest PRD guidance you've seen, get a full refund — no questions.
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Keep going</h2>
            <Link to="/courses" className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-brand">All courses <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {recs.map((c) => (
              <Link key={c.slug} to="/courses/$slug" params={{ slug: c.slug }} className="group rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between text-xs text-muted-foreground"><span>{c.category}</span><span>{c.duration}</span></div>
                <h3 className="mt-3 font-display text-lg font-semibold group-hover:text-brand">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand">View course <ArrowRight className="h-3.5 w-3.5" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function CourseDetail() {
  const { course } = Route.useLoaderData() as { course: (typeof courses)[number] };
  if (course.slug === "metrics") return <InteractiveCourse modules={kpiModules} course={course} />;
  return <StaticCourseDetail course={course} />;
}

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-xl bg-surface-muted p-3 text-center">
      <div className="font-display text-lg font-semibold" style={color ? { color } : undefined}>{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
