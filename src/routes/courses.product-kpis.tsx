"use client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Trophy,
} from "lucide-react";

export const Route = createFileRoute("/courses/product-kpis")({
  head: () => ({
    meta: [
      { title: "Product KPIs Course — ProductPath" },
      { name: "description", content: "Five interactive modules covering DAU/MAU, Retention, Conversion, Churn, and how to read KPIs together." },
    ],
  }),
  component: ProductKPIsCourse,
});

/* ── data ── */
interface Module {
  id: number;
  title: string;
  duration: string;
  sections: Array<{ heading: string; body: string }>;
  formula?: string;
  principles: string[];
  benchmarks: Array<[string, string]>;
  quiz: { question: string; options: string[]; answer: number; explanation: string };
}

const modules: Module[] = [
  {
    id: 0,
    title: "DAU / MAU — Measuring Engagement",
    duration: "30 min",
    sections: [
      { heading: "What are DAU and MAU?", body: "Daily Active Users (DAU) measures the number of unique users who perform at least one meaningful action on a single day. Monthly Active Users (MAU) does the same over a rolling 30-day window. The key word is 'active' — a login alone rarely counts. You must define qualifying events that signal genuine engagement with the product's core value." },
      { heading: "The stickiness ratio", body: "Dividing DAU by MAU gives the stickiness ratio. It answers: of everyone who engaged with us this month, what fraction came back today? Facebook built its early growth strategy around pushing this ratio toward 66%. Slack targets 25%+ for B2B engagement. TikTok exceeds 50% in its strongest markets. The ratio removes scale bias — it does not matter if you have 100K or 10M MAU, a 10% stickiness signals the same habit problem." },
      { heading: "Defining 'active' correctly", body: "The most common mistake teams make with DAU/MAU is defining 'active' as any session start. This inflates both metrics and makes the stickiness ratio meaningless. Instead, tie 'active' to value delivery: a message sent in Slack, a story posted in Instagram, a document opened in Notion. Wrong definitions produce vanity metrics that feel good in dashboards but do not correlate with retention or revenue." },
    ],
    formula: "Stickiness = (DAU ÷ MAU) × 100%",
    principles: [
      "Define qualifying events before you start tracking — not after.",
      "Use stickiness, not raw DAU, to compare across periods and competitors.",
      "Segment by acquisition channel — some channels produce habitual users; others do not.",
      "A rising MAU with flat DAU is an early warning sign, not a success metric.",
    ],
    benchmarks: [
      ["Consumer apps (social, media)", "≥ 50% stickiness"],
      ["B2B SaaS tools",               "≥ 20–25% stickiness"],
      ["Marketplace & commerce",        "10–20% acceptable"],
      ["Occasional-use utilities",      "< 10% may be fine"],
    ],
    quiz: {
      question: "Your product has 40,000 DAU and 250,000 MAU. What does the stickiness ratio tell you?",
      options: ["Stickiness is 16%, suggesting daily habits are not yet formed", "Stickiness is 40%, which is strong for a consumer app", "Stickiness is 6.25%, which is healthy for B2B SaaS", "Stickiness cannot be calculated without knowing total users"],
      answer: 0,
      explanation: "40,000 ÷ 250,000 = 16% stickiness. This is below the 20% threshold for most product categories — daily habits have not yet formed at scale.",
    },
  },
  {
    id: 1,
    title: "Retention Rate — Keeping What You Win",
    duration: "30 min",
    sections: [
      { heading: "What is retention?", body: "Retention measures the percentage of a user cohort that remains active after a defined period. A cohort is a group of users who joined at the same time — for example, everyone who signed up in October. Tracking cohorts, rather than aggregate totals, reveals whether product quality is improving or degrading over time." },
      { heading: "Day-N retention curves", body: "The most actionable way to visualise retention is the Day-N retention curve. Plot the percentage of users from a cohort who were active on Day 1, Day 3, Day 7, Day 14, Day 30, and Day 90. The shape of the curve tells you a great deal: a steep initial drop that flattens suggests the product has a loyal core even if initial onboarding is poor. A curve that continues declining with no flattening suggests no product-market fit for any segment yet." },
      { heading: "Why L7 and L28 retention matter", body: "L7 (active in last 7 of past 7 days) and L28 (active in last 28 days) are rolling retention measures that track current product health across your full user base, not just a specific cohort. They complement cohort curves: cohort curves tell you whether newer cohorts are better than older ones; L7/L28 tells you whether your existing users are healthy right now." },
    ],
    formula: "Day-N Retention = (Users active on Day N ÷ Original cohort size) × 100%",
    principles: [
      "Compare cohort curves to identify whether recent product changes improved or hurt retention.",
      "A flattening retention curve at any level — even 5% — signals PMF for a segment worth understanding.",
      "Day-1 retention is the most actionable — it is entirely in onboarding's control.",
      "Segment cohorts by acquisition source; referral cohorts often retain 2x better than paid.",
    ],
    benchmarks: [
      ["Day-1 retention (consumer)", "≥ 40% strong, < 25% poor"],
      ["Day-7 retention (consumer)", "≥ 20% strong, < 10% poor"],
      ["Day-30 retention",           "≥ 10% strong, < 5% poor"],
      ["B2B SaaS Day-30",            "≥ 35% expected"],
    ],
    quiz: {
      question: "You have two cohorts. Cohort A: 1,000 users, 150 still active on Day 30. Cohort B: 800 users, 200 still active on Day 30. Which cohort has better Day-30 retention?",
      options: ["Cohort A, because 1,000 > 800 initial users", "Cohort B, because 200 > 150 active users", "Cohort B, because 25% retention > 15% retention", "They are equal because both have similar absolute numbers"],
      answer: 2,
      explanation: "Cohort A: 150/1,000 = 15% retention. Cohort B: 200/800 = 25% retention. Cohort B retains significantly better on a percentage basis, which is the correct way to compare cohorts of different sizes.",
    },
  },
  {
    id: 2,
    title: "Conversion Rate — Turning Interest Into Action",
    duration: "30 min",
    sections: [
      { heading: "Defining conversion rate", body: "Conversion rate measures the percentage of users who complete a defined action relative to those who had the opportunity to do so. This definition has two critical parts: the numerator (who converted) and the denominator (who had the opportunity). Most CVR problems come from an unclear denominator — marketers measure visitors, PMs measure sign-ups, growth teams measure activated users. They are measuring different things and should not be compared." },
      { heading: "The conversion funnel", body: "Products typically have multiple conversion steps: visitor → sign-up, sign-up → activated, activated → paying, paying → retained. The end-to-end conversion rate is the product of all these step rates. If visitor→sign-up is 5%, sign-up→activated is 60%, and activated→paying is 20%, your end-to-end rate is 0.05 × 0.6 × 0.2 = 0.6%. Improving the weakest step creates the highest leverage." },
      { heading: "Freemium vs free-trial vs self-serve vs sales-assisted", body: "The benchmark for conversion rate varies massively by business model. Freemium converts 2–5% of free to paid. Free trials convert 15–25%. Self-serve converts paid trials at 40–60%. Sales-assisted closes 20–40% of qualified opportunities. Comparing your CVR across these models is meaningless — you must benchmark within the same model and growth motion." },
    ],
    formula: "CVR = (Number who converted ÷ Number who had the opportunity) × 100%",
    principles: [
      "Always state which funnel step a CVR refers to — avoid reporting 'our conversion rate is 3%' without context.",
      "High CVR with high churn usually means your messaging over-promises and the product under-delivers.",
      "Optimise the step with the most absolute volume of users dropping off, not the worst percentage.",
      "A/B test single changes — multi-variable tests make it impossible to know what moved the rate.",
    ],
    benchmarks: [
      ["Visitor → free sign-up",       "2–5% typical"],
      ["Freemium → paid (SaaS)",        "2–5% typical"],
      ["Free trial → paid (SaaS)",      "15–25% strong"],
      ["Ecommerce add-to-cart → buy",   "3–8% typical"],
    ],
    quiz: {
      question: "You increase your visitor-to-sign-up CVR from 3% to 4% but your Day-30 churn increases from 40% to 55%. What should you investigate first?",
      options: ["The landing page copy, because it clearly improved CVR", "The marketing channel mix, because the improved CVR means you are reaching more people", "The quality of users being converted — better CVR may mean lower-intent sign-ups", "Nothing — a 1 pp CVR gain always outweighs higher churn"],
      answer: 2,
      explanation: "Higher CVR alongside higher churn is a classic signal of a messaging-product mismatch. The copy attracted more sign-ups but the users are less qualified — they signed up for a promise the product did not deliver. Investigate which cohort is churning faster and whether the new sign-ups differ from previous ones.",
    },
  },
  {
    id: 3,
    title: "Churn Rate — Understanding Customer Loss",
    duration: "30 min",
    sections: [
      { heading: "Customer churn vs MRR churn", body: "Customer churn counts the percentage of customers lost. MRR churn counts the percentage of revenue lost. They can diverge significantly: if you lose many small customers but retain large ones, customer churn may be 5% while MRR churn is only 1%. For a subscription business, MRR churn is almost always the more important metric — and it can even be negative (good) if expansion revenue from existing customers exceeds cancellation losses." },
      { heading: "Calculating churn correctly", body: "Always measure churn against the customer base at the start of the period, not the end. Never subtract new customers acquired during the period — they are a separate acquisition metric and should not mask churn. Monthly churn of 3% sounds modest until you compound it: after 12 months, you retain only 69% of your original cohort. Use the annual churn formula (1 - (1 - monthly rate)^12) to understand the true annual impact before presenting to leadership." },
      { heading: "Leading vs lagging churn signals", body: "Churn is a lagging metric — it tells you about decisions users already made. Leading signals come from product usage data: declining login frequency, unused premium features, support tickets with billing questions, NPS decays 60–90 days before cancellation. Build churn prediction models on these signals so you can intervene before the customer decides to leave." },
    ],
    formula: "Monthly Churn = (Customers lost ÷ Customers at start of month) × 100%",
    principles: [
      "Use the start-of-period denominator, never the end-of-period — the maths is not symmetric.",
      "Track MRR churn separately from user churn — they measure different business health dimensions.",
      "Net Revenue Retention above 100% means you grow without new customers — the strongest SaaS position.",
      "Identify your top 10% of churning accounts and call them — qualitative insight beats any model initially.",
    ],
    benchmarks: [
      ["Monthly churn (B2B SaaS, strong)", "< 1%"],
      ["Monthly churn (B2B SaaS, average)", "1–3%"],
      ["Monthly churn (consumer sub)",      "5–7% typical"],
      ["Net Revenue Retention (elite)",     "≥ 120%"],
    ],
    quiz: {
      question: "You start the month with 2,000 paying customers. During the month you lose 60 and gain 180 new customers. What is your monthly churn rate?",
      options: ["3% (60 ÷ 2,000)", "2.75% ((60 − 180) ÷ 2,000 adjusted)", "−6% because you net-gained customers", "Cannot be calculated without knowing average revenue per customer"],
      answer: 0,
      explanation: "Churn rate = 60 ÷ 2,000 = 3%. New customers (180) are never subtracted from the churn calculation. They are an acquisition metric, not a churn offset. Mixing them would mask a 3% churn problem behind a flattering net customer addition.",
    },
  },
  {
    id: 4,
    title: "Reading KPIs Together — The Full Picture",
    duration: "30 min",
    sections: [
      { heading: "Why single KPIs mislead", body: "Every KPI is a partial view. High retention with no growth is a stagnant product. High growth with high churn is a leaky bucket. High conversion with poor retention means your marketing over-promises. High DAU/MAU with no revenue conversion means you have engagement but not monetisation. PMs who optimise a single metric almost always move it by degrading others. The goal is a self-consistent set of metrics that all improve together." },
      { heading: "The growth accounting equation", body: "New active users = Reactivated users + New users − Churned users. This equation forces you to see growth as the net of acquisition, retention, and reactivation — not just new user counts. When growth slows, always attribute it: is acquisition declining? Is churn increasing? Are reactivated users declining? Decomposing growth this way reveals the actual lever to pull." },
      { heading: "KPI trees and north star framing", body: "A KPI tree connects your north star metric to its input metrics. If your north star is weekly active buyers (e-commerce), the inputs might be: visits × visit-to-browse rate × browse-to-add rate × add-to-purchase rate. Each input can be further decomposed. Building this tree prevents 'which metric do we move?' debates and forces the team to reason about causal relationships, not just correlations." },
    ],
    principles: [
      "Build a KPI tree before choosing what to optimise — know the full system before pulling levers.",
      "Use growth accounting to decompose every slowdown into acquisition, churn, or reactivation changes.",
      "Set an anti-metric for every metric you optimise to detect degradation elsewhere.",
      "Review KPIs weekly at the team level, monthly at the leadership level, quarterly for strategic pivots.",
    ],
    benchmarks: [
      ["Healthy growth signature",    "Rising retention + rising conversion"],
      ["Leaky bucket warning",        "Rising MAU + flat/rising churn"],
      ["PMF signal",                  "Cohort curves flattening above 10%"],
      ["NRR priority threshold",      "Focus on NRR before CAC once PMF found"],
    ],
    quiz: {
      question: "Your DAU/MAU is at 45%, your Day-30 retention for new cohorts improved from 12% to 18%, but your MRR churn is at 4% monthly. What is the most important metric to address first?",
      options: ["DAU/MAU — 45% is below world-class and should be the focus", "Day-30 retention — while improving, it remains below strong benchmarks", "MRR churn — 4% monthly compounds to ~40% annual MRR loss, which is a critical business risk", "None of them are urgent — the portfolio is balanced"],
      answer: 2,
      explanation: "4% monthly MRR churn compounds to approximately 40% annual MRR loss. Even with strong stickiness and improving retention, losing 40% of revenue annually is not sustainable. MRR churn at this level should be the immediate priority — it has the largest direct impact on business viability.",
    },
  },
];

function ProductKPIsCourse() {
  const [current, setCurrent]   = useState(0);
  const [answered, setAnswered] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const [done, setDone]         = useState(false);

  const mod = modules[current]!;
  const totalMods = modules.length;
  const completedCount = Object.values(completed).filter(Boolean).length;
  const progress = Math.round((completedCount / totalMods) * 100);

  function answer(idx: number) {
    if (answered[current] !== undefined) return;
    setAnswered((prev) => ({ ...prev, [current]: idx }));
    if (idx === mod.quiz.answer) setCompleted((prev) => ({ ...prev, [current]: true }));
  }

  function next() {
    if (current < totalMods - 1) setCurrent((c) => c + 1);
    else setDone(true);
  }

  function reset() {
    setCurrent(0); setAnswered({}); setCompleted({}); setDone(false);
  }

  if (done) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[oklch(0.96_0.06_145)] text-[oklch(0.4_0.15_145)]">
            <Trophy className="h-10 w-10" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">Course complete!</h1>
          <p className="mt-4 text-muted-foreground">You finished all five Product KPI modules. You can now measure, interpret, and act on DAU/MAU, retention, conversion, churn, and composite KPI signals.</p>
          <div className="mt-8 inline-block rounded-2xl border border-border bg-surface px-10 py-6 text-center">
            <div className="font-display text-4xl font-bold text-foreground">{completedCount}/{totalMods}</div>
            <div className="mt-1 text-sm text-muted-foreground">Modules passed</div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground hover:border-foreground/30">
              <RotateCcw className="h-4 w-4" /> Restart course
            </button>
            <Link to="/resources/product-kpis" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background">
              KPI calculators <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <Link to="/courses" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Courses
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Product KPIs</span>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10">
        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-10 space-y-4">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Progress</div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-foreground transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{completedCount} / {totalMods} complete</div>
            </div>
            <div className="rounded-2xl border border-border bg-surface overflow-hidden">
              {modules.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => setCurrent(i)}
                  className={`flex w-full items-center gap-3 border-b border-border px-5 py-3 text-left text-sm transition-colors last:border-0 ${i === current ? "bg-foreground text-background" : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"}`}
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${completed[i] ? "bg-[oklch(0.4_0.15_145)] text-white" : i === current ? "bg-background/20" : "bg-secondary"}`}>
                    {completed[i] ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                  </span>
                  <span className="leading-tight">{m.title}</span>
                </button>
              ))}
            </div>
            <button onClick={reset} className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface py-2.5 text-xs text-muted-foreground hover:text-foreground">
              <RotateCcw className="h-3.5 w-3.5" /> Reset progress
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {/* Module header */}
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            Module {current + 1} of {totalMods} · {mod.duration}
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{mod.title}</h1>

          {/* Sections */}
          <div className="mt-8 space-y-6">
            {mod.sections.map((s) => (
              <div key={s.heading} className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="font-display text-lg font-semibold text-foreground">{s.heading}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>

          {/* Formula */}
          {mod.formula && (
            <div className="mt-6 rounded-2xl border border-foreground/20 bg-foreground p-6 text-background">
              <div className="text-xs font-semibold uppercase tracking-widest text-background/60">Formula</div>
              <div className="mt-3 font-display text-xl font-semibold sm:text-2xl">{mod.formula}</div>
            </div>
          )}

          {/* Principles */}
          <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">Key principles</h2>
            <ul className="mt-4 space-y-3">
              {mod.principles.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[oklch(0.4_0.15_145)]" />
                  <span className="text-sm leading-6 text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benchmarks */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="border-b border-border bg-surface-muted px-6 py-4">
              <h2 className="font-display text-base font-semibold text-foreground">Benchmarks</h2>
            </div>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border">
                {mod.benchmarks.map(([label, value]) => (
                  <tr key={label} className="hover:bg-surface-muted">
                    <td className="px-6 py-3 text-muted-foreground">{label}</td>
                    <td className="px-6 py-3 font-semibold text-foreground text-right">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quiz */}
          <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-brand">Knowledge check</div>
            <p className="mt-3 font-display text-base font-semibold text-foreground">{mod.quiz.question}</p>
            <div className="mt-4 space-y-2">
              {mod.quiz.options.map((opt, i) => {
                const sel    = answered[current];
                const picked = sel === i;
                const correct = i === mod.quiz.answer;
                const revealed = sel !== undefined;
                let cls = "border-border bg-surface text-foreground hover:border-foreground/30";
                if (revealed && picked && correct)  cls = "border-[oklch(0.4_0.15_145)] bg-[oklch(0.96_0.06_145)] text-[oklch(0.3_0.15_145)]";
                else if (revealed && picked && !correct) cls = "border-[oklch(0.5_0.18_25)] bg-[oklch(0.97_0.05_25)] text-[oklch(0.4_0.18_25)]";
                else if (revealed && correct) cls = "border-[oklch(0.4_0.15_145)] bg-[oklch(0.96_0.06_145)] text-[oklch(0.3_0.15_145)]";
                return (
                  <button
                    key={opt}
                    onClick={() => answer(i)}
                    disabled={revealed}
                    className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${cls} ${revealed ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <span className="mr-2 font-semibold">{String.fromCharCode(65 + i)}.</span>{opt}
                  </button>
                );
              })}
            </div>
            {answered[current] !== undefined && (
              <div className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-6 ${answered[current] === mod.quiz.answer ? "border-[oklch(0.88_0.08_145)] bg-[oklch(0.96_0.06_145)] text-[oklch(0.35_0.15_145)]" : "border-[oklch(0.9_0.07_25)] bg-[oklch(0.97_0.05_25)] text-[oklch(0.4_0.18_25)]"}`}>
                <strong>{answered[current] === mod.quiz.answer ? "Correct! " : "Not quite. "}</strong>{mod.quiz.explanation}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Previous
            </button>
            <button
              onClick={next}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background"
            >
              {current < totalMods - 1 ? "Next module" : "Finish course"} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
