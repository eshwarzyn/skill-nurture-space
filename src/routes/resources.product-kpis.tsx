"use client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronRight,
  Gauge,
  LineChart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { ContentDetail, DetailSection } from "@/components/content-detail";

export const Route = createFileRoute("/resources/product-kpis")({
  head: () => ({
    meta: [
      { title: "Product KPI Tools — ProductPath" },
      { name: "description", content: "Interactive KPI calculators, funnel visualiser, benchmark table, formula sheet and diagnostics for product managers." },
    ],
  }),
  component: ProductKPIs,
});

/* ── helpers ── */
function Tier({ tier }: { tier: "good" | "avg" | "bad" }) {
  const map = {
    good: { cls: "bg-[oklch(0.96_0.06_145)] text-[oklch(0.4_0.15_145)] border border-[oklch(0.88_0.08_145)]", label: "Strong" },
    avg:  { cls: "bg-[oklch(0.97_0.06_75)] text-[oklch(0.5_0.15_65)] border border-[oklch(0.9_0.08_75)]",   label: "Average" },
    bad:  { cls: "bg-[oklch(0.97_0.05_25)] text-[oklch(0.5_0.18_25)] border border-[oklch(0.9_0.07_25)]",   label: "Needs work" },
  };
  return <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${map[tier].cls}`}>{map[tier].label}</span>;
}

function Num({ value, label, tier }: { value: string; label: string; tier: "good" | "avg" | "bad" }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-display text-3xl font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <Tier tier={tier} />
    </div>
  );
}

function Field({ label, id, value, onChange, step }: { label: string; id: string; value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label htmlFor={id} className="min-w-[210px] text-sm text-muted-foreground">{label}</label>
      <input
        id={id} type="number" step={step ?? 1} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-36 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-brand focus:outline-none"
      />
    </div>
  );
}

/* ── funnel defaults ── */
const defaultStages = [
  { name: "Website visitors",    val: 100000 },
  { name: "Sign-ups",            val: 8000   },
  { name: "Activated users",     val: 3200   },
  { name: "Paying customers",    val: 640    },
  { name: "Retained at 90 days", val: 480    },
];
const fColors = [
  "oklch(0.72 0.19 40)",
  "oklch(0.65 0.18 320)",
  "oklch(0.6 0.18 210)",
  "oklch(0.7 0.18 75)",
  "oklch(0.6 0.18 25)",
];

type Tab = "calcs" | "funnel" | "cases" | "benchmarks" | "formulas" | "diagnostics";
const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "calcs",       label: "Calculators",     icon: <Gauge className="h-4 w-4" />       },
  { id: "funnel",      label: "Funnel Visualiser",icon: <TrendingDown className="h-4 w-4" /> },
  { id: "cases",       label: "Case Studies",     icon: <BookOpen className="h-4 w-4" />    },
  { id: "benchmarks",  label: "Benchmarks",       icon: <BarChart3 className="h-4 w-4" />   },
  { id: "formulas",    label: "Formula Sheet",    icon: <LineChart className="h-4 w-4" />   },
  { id: "diagnostics", label: "Diagnostics",      icon: <TrendingUp className="h-4 w-4" />  },
];

function ProductKPIs() {
  const [tab, setTab] = useState<Tab>("calcs");

  /* DAU/MAU */
  const [dau, setDau] = useState(50000);
  const [mau, setMau] = useState(200000);
  const stick = mau > 0 ? (dau / mau) * 100 : 0;
  const stickTier: "good"|"avg"|"bad" = stick >= 50 ? "good" : stick >= 20 ? "avg" : "bad";

  /* Retention */
  const [cohort, setCohort] = useState(1000);
  const [active, setActive] = useState(300);
  const [dayN, setDayN]     = useState(30);
  const ret     = cohort > 0 ? (active / cohort) * 100 : 0;
  const retGood = dayN <= 1 ? 40 : dayN <= 7 ? 20 : 10;
  const retTier: "good"|"avg"|"bad" = ret >= retGood * 1.5 ? "good" : ret >= retGood ? "avg" : "bad";

  /* Conversion */
  const [opp, setOpp]   = useState(10000);
  const [conv, setConv] = useState(400);
  const cvr     = opp > 0 ? (conv / opp) * 100 : 0;
  const cvrTier: "good"|"avg"|"bad" = cvr >= 5 ? "good" : cvr >= 2 ? "avg" : "bad";

  /* Churn */
  const [custStart, setCustStart] = useState(5000);
  const [custLost,  setCustLost]  = useState(150);
  const [avgMrr,    setAvgMrr]    = useState(99);
  const churnRate = custStart > 0 ? (custLost / custStart) * 100 : 0;
  const mrrLost   = custLost * avgMrr;
  const churnTier: "good"|"avg"|"bad" = churnRate < 1 ? "good" : churnRate < 3 ? "avg" : "bad";

  /* Annual churn */
  const [moChurn, setMoChurn] = useState(3);
  const annChurn = (1 - Math.pow(1 - moChurn / 100, 12)) * 100;
  const annTier: "good"|"avg"|"bad" = annChurn < 6 ? "good" : annChurn < 20 ? "avg" : "bad";

  /* Funnel */
  const [stages, setStages] = useState(defaultStages.map((s) => ({ ...s })));
  const updateStage = useCallback((i: number, v: number) => {
    setStages((prev) => prev.map((s, idx) => (idx === i ? { ...s, val: v } : s)));
  }, []);
  const top = stages[0]?.val || 1;
  let bigDrop = 0, bigIdx = 1;
  for (let i = 1; i < stages.length; i++) {
    const d = (1 - stages[i].val / (stages[i - 1]?.val || 1)) * 100;
    if (d > bigDrop) { bigDrop = d; bigIdx = i; }
  }

  return (
    <ContentDetail
      backTo="/resources"
      backLabel="Back to resources"
      eyebrow="Reference · Analytics"
      title="Product KPI Tools"
      description="Live calculators, funnel modelling, case studies, benchmarks, formulas, and diagnostics — everything you need to measure, interpret, and act on product data."
      meta="Free · No sign-up · 6 tools"
    >
      {/* Tab nav */}
      <div className="-mx-1 mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.id
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-surface text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* ── CALCULATORS ── */}
      {tab === "calcs" && (
        <>
          <DetailSection title="DAU / MAU stickiness">
            <p className="mb-4 text-sm text-muted-foreground">The stickiness ratio answers: "Of everyone who touches us monthly, how many come back daily?" It is more revealing than either DAU or MAU alone.</p>
            <div className="rounded-3xl border border-border bg-surface p-6">
              <div className="space-y-3">
                <Field label="Daily Active Users (DAU)" id="dau" value={dau} onChange={setDau} />
                <Field label="Monthly Active Users (MAU)" id="mau" value={mau} onChange={setMau} />
              </div>
              <div className="mt-5 flex items-center gap-5 border-t border-border pt-5">
                <Num value={`${stick.toFixed(1)}%`} label="Stickiness (DAU / MAU)" tier={stickTier} />
              </div>
            </div>
          </DetailSection>

          <DetailSection title="Day-N cohort retention">
            <p className="mb-4 text-sm text-muted-foreground">Track what percentage of an acquired cohort is still active after N days. Change Day N to calculate Day 1, 7, 30, or 90 retention.</p>
            <div className="rounded-3xl border border-border bg-surface p-6">
              <div className="space-y-3">
                <Field label="Original cohort size"          id="cohort" value={cohort} onChange={setCohort} />
                <Field label="Users still active on Day N"   id="active" value={active} onChange={setActive} />
                <Field label="Day N"                         id="dayn"   value={dayN}   onChange={setDayN}   />
              </div>
              <div className="mt-5 flex items-center gap-5 border-t border-border pt-5">
                <Num value={`${ret.toFixed(1)}%`} label={`Day-${dayN} retention`} tier={retTier} />
              </div>
            </div>
          </DetailSection>

          <DetailSection title="Conversion rate">
            <p className="mb-4 text-sm text-muted-foreground">Measures what percentage of users who had the opportunity completed the desired action. Always specify which funnel step this applies to.</p>
            <div className="rounded-3xl border border-border bg-surface p-6">
              <div className="space-y-3">
                <Field label="Users who had the opportunity" id="opp"  value={opp}  onChange={setOpp}  />
                <Field label="Users who converted"           id="conv" value={conv} onChange={setConv} />
              </div>
              <div className="mt-5 flex items-center gap-5 border-t border-border pt-5">
                <Num value={`${cvr.toFixed(2)}%`} label="Conversion rate" tier={cvrTier} />
              </div>
            </div>
          </DetailSection>

          <DetailSection title="Monthly churn rate + MRR impact">
            <p className="mb-4 text-sm text-muted-foreground">Churn is calculated on the opening customer base. New customers gained that month do not offset the churn rate — they are a separate acquisition metric.</p>
            <div className="rounded-3xl border border-border bg-surface p-6">
              <div className="space-y-3">
                <Field label="Customers at start of month"  id="custStart" value={custStart} onChange={setCustStart} />
                <Field label="Customers lost during month"  id="custLost"  value={custLost}  onChange={setCustLost}  />
                <Field label="Avg MRR per customer ($)"     id="avgMrr"    value={avgMrr}    onChange={setAvgMrr}    />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-6 border-t border-border pt-5">
                <Num value={`${churnRate.toFixed(1)}%`} label="Monthly churn rate" tier={churnTier} />
                <div className="flex flex-col gap-1">
                  <div className="font-display text-3xl font-bold text-foreground">${mrrLost.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">MRR lost / month</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-display text-3xl font-bold text-foreground">${(mrrLost * 12).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Projected annual MRR lost</div>
                </div>
              </div>
            </div>
          </DetailSection>

          <DetailSection title="Monthly → annual churn converter">
            <p className="mb-4 text-sm text-muted-foreground">A 3% monthly churn sounds modest, but compounds to 31% annual churn — losing nearly a third of your customer base each year.</p>
            <div className="rounded-3xl border border-border bg-surface p-6">
              <div className="space-y-3">
                <Field label="Monthly churn rate (%)" id="moChurn" value={moChurn} onChange={setMoChurn} step={0.1} />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-6 border-t border-border pt-5">
                <Num value={`${annChurn.toFixed(1)}%`} label="Effective annual churn" tier={annTier} />
                <div className="flex flex-col gap-1">
                  <div className="font-display text-3xl font-bold text-foreground">{(100 - annChurn).toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Annual retention</div>
                </div>
              </div>
            </div>
          </DetailSection>
        </>
      )}

      {/* ── FUNNEL ── */}
      {tab === "funnel" && (
        <DetailSection title="Funnel visualiser">
          <p className="mb-6 text-sm text-muted-foreground">Edit each stage to model your product's acquisition funnel. The visualiser auto-identifies your biggest drop-off and estimates the impact of a 10% relative improvement.</p>
          <div className="rounded-3xl border border-border bg-surface p-6">
            <h3 className="mb-4 font-display font-semibold">Stage inputs</h3>
            <div className="space-y-3">
              {stages.map((s, i) => <Field key={s.name} label={s.name} id={`fs-${i}`} value={s.val} onChange={(v) => updateStage(i, v)} />)}
            </div>
          </div>
          <div className="mt-5 rounded-3xl border border-border bg-surface p-6">
            <h3 className="mb-5 font-display font-semibold">Visualisation</h3>
            <div className="space-y-3">
              {stages.map((s, i) => {
                const pct  = Math.round((s.val / top) * 100);
                const drop = i > 0 ? Math.round((1 - s.val / (stages[i - 1]?.val || 1)) * 100) : 0;
                return (
                  <div key={s.name} className="flex items-center gap-3">
                    <div className="min-w-[160px] text-xs text-muted-foreground">{s.name}</div>
                    <div className="flex-1 overflow-hidden rounded-lg bg-secondary" style={{ height: 36 }}>
                      <div className="flex h-full items-center rounded-lg px-3 text-xs font-semibold text-white transition-all duration-500" style={{ width: `${Math.max(pct, 4)}%`, background: fColors[i] }}>
                        {s.val.toLocaleString()}
                      </div>
                    </div>
                    <div className="min-w-[48px] text-right text-xs text-muted-foreground">{i > 0 ? `-${drop}%` : "100%"}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 rounded-2xl border border-border bg-secondary p-4 text-sm">
              <strong>Biggest drop-off:</strong> {stages[bigIdx - 1]?.name} → {stages[bigIdx]?.name} ({Math.round(bigDrop)}% lost). Even a 10% relative improvement here adds {Math.round((stages[bigIdx]?.val ?? 0) * 0.1).toLocaleString()} more users to the next stage.
            </div>
          </div>
        </DetailSection>
      )}

      {/* ── CASE STUDIES ── */}
      {tab === "cases" && (
        <DetailSection title="Case studies">
          <p className="mb-6 text-sm text-muted-foreground">Real-world examples from leading products — showing how DAU/MAU, retention, conversion, and churn are used to drive decisions.</p>
          <div className="mb-6 flex overflow-x-auto rounded-2xl border border-border">
            {[
              { icon: "📣", name: "Acquire",  metric: "Conversion rate"   },
              { icon: "🚀", name: "Activate", metric: "Day-1 retention"   },
              { icon: "🔁", name: "Retain",   metric: "DAU / MAU ratio"   },
              { icon: "💰", name: "Revenue",  metric: "MRR churn"         },
              { icon: "📢", name: "Refer",    metric: "Viral coefficient"  },
            ].map((step, i, arr) => (
              <div key={step.name} className={`flex flex-1 flex-col items-center gap-1 px-4 py-4 text-center text-xs ${i < arr.length - 1 ? "border-r border-border" : ""}`}>
                <span className="text-base">{step.icon}</span>
                <span className="font-semibold text-foreground">{step.name}</span>
                <span className="text-muted-foreground">{step.metric}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { company: "Facebook (Meta)", focus: "DAU/MAU — stickiness north star", stat: "66%", desc: "The 66% rule became an internal north star. Every feature decision was structured around increasing daily habit formation, not monthly reach. If a feature did not increase DAU/MAU, it was deprioritised." },
              { company: "Duolingo",        focus: "Retention through streak mechanics", stat: "Day-30: 40%+", desc: "Redesigned onboarding and introduced streak mechanics to lift Day-7 retention. A 1 pp improvement in Day-1 retention correlated with a 5 pp lift in Day-30." },
              { company: "Slack",           focus: "Activation magic number", stat: "2,000 messages", desc: "Teams who exchanged 2,000+ messages had 93% retention. This magic number reshaped all onboarding flows — every screen pushed teams toward reaching that milestone within the first two weeks." },
              { company: "Netflix",         focus: "Churn — best-in-class", stat: "<2%/month", desc: "Monthly churn below 2% vs 5-7% industry average. Drivers: algorithmic personalisation, just-one-more-episode UX, and proactive cancel-flow interventions that offer pauses instead of cancellations." },
              { company: "Dropbox",         focus: "Referral-driven conversion", stat: "+60% uplift", desc: "Referral program converted free users to paid at 4-5%. Referred users had higher Day-30 retention than non-referred users, proving that acquisition channel directly impacts downstream retention." },
              { company: "Spotify",         focus: "Freemium conversion funnel", stat: "~26% paid", desc: "~26% of MAU convert to Premium. Free tier friction (ads, no offline) is intentional funnel pressure. Wrapped campaign lifts MAU every December and re-activates dormant users." },
            ].map((c) => (
              <div key={c.company} className="rounded-2xl border border-border bg-surface p-5">
                <div className="font-display text-base font-semibold text-foreground">{c.company}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{c.focus}</div>
                <div className="mt-3 font-display text-2xl font-bold text-brand">{c.stat}</div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {/* ── BENCHMARKS ── */}
      {tab === "benchmarks" && (
        <DetailSection title="KPI benchmark table">
          <p className="mb-5 text-sm text-muted-foreground">Industry-standard thresholds across all core KPIs. Always compare within your vertical — a healthy number for a social app may be poor for a B2B SaaS tool.</p>
          <div className="overflow-x-auto rounded-3xl border border-border bg-surface">
            <table className="w-full min-w-[580px] text-left text-sm">
              <thead className="bg-surface-muted text-xs uppercase tracking-wider text-muted-foreground">
                <tr>{["KPI", "Good", "Average", "Poor"].map((h) => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["DAU/MAU stickiness (consumer)",  "≥ 50%",  "20–50%",   "< 20%"  ],
                  ["DAU/MAU stickiness (B2B SaaS)",  "≥ 25%",  "10–25%",   "< 10%"  ],
                  ["Day-1 retention",                "≥ 40%",  "25–40%",   "< 25%"  ],
                  ["Day-7 retention",                "≥ 20%",  "10–20%",   "< 10%"  ],
                  ["Day-30 retention",               "≥ 10%",  "5–10%",    "< 5%"   ],
                  ["Visitor → sign-up CVR",          "≥ 5%",   "2–5%",     "< 2%"   ],
                  ["Freemium → paid CVR",            "≥ 5%",   "2–5%",     "< 2%"   ],
                  ["Free trial → paid (SaaS)",       "≥ 25%",  "15–25%",   "< 15%"  ],
                  ["Monthly churn (SaaS)",           "< 1%",   "1–3%",     "> 3%"   ],
                  ["Annual churn (SaaS)",            "< 6%",   "6–15%",    "> 15%"  ],
                  ["Net Revenue Retention",          "≥ 120%", "100–120%", "< 100%" ],
                  ["LTV : CAC ratio",                "≥ 3:1",  "1–3:1",    "< 1:1"  ],
                ].map(([kpi, good, avg, poor]) => (
                  <tr key={kpi} className="hover:bg-surface-muted">
                    <td className="px-5 py-3 font-medium text-foreground">{kpi}</td>
                    <td className="px-5 py-3 font-medium text-[oklch(0.4_0.15_145)]">{good}</td>
                    <td className="px-5 py-3 font-medium text-[oklch(0.5_0.15_65)]">{avg}</td>
                    <td className="px-5 py-3 font-medium text-[oklch(0.5_0.18_25)]">{poor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DetailSection>
      )}

      {/* ── FORMULA SHEET ── */}
      {tab === "formulas" && (
        <DetailSection title="Formula sheet">
          <p className="mb-5 text-sm text-muted-foreground">All core KPI formulas with the signal each one carries. Bookmark for quick reference.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { kpi: "DAU",                  formula: "Unique users with ≥1 qualifying event in a single day",                              signal: "Signals daily habit strength. Segment by channel to find highest-quality cohorts." },
              { kpi: "MAU",                  formula: "Unique users with ≥1 qualifying event in rolling 30 days",                           signal: "Signals total reach and growth trend. Base denominator for all engagement ratios." },
              { kpi: "Stickiness",           formula: "(DAU ÷ MAU) × 100%",                                                                 signal: "World-class: 60%+. Healthy: 20–50%. Below 20%: daily habit not yet formed." },
              { kpi: "Day-N retention",      formula: "(Active on Day N ÷ cohort size) × 100%",                                             signal: "Track as a curve. A flattening curve at any level signals PMF for a segment." },
              { kpi: "Conversion rate",      formula: "(Converted ÷ Opportunity) × 100%",                                                   signal: "Always state the funnel step. End-to-end = product of all step CVRs." },
              { kpi: "Monthly churn",        formula: "(Lost ÷ Start of month) × 100%",                                                     signal: "3%/month ≈ 31% annual. New customers don't offset the churn calculation." },
              { kpi: "Annual churn",         formula: "1 − (1 − monthly churn)^12",                                                         signal: "Compounding: 5%/month = 46% annual loss of customer base." },
              { kpi: "MRR churn",            formula: "(MRR lost ÷ MRR at start) × 100%",                                                   signal: "More critical than user churn for subscription businesses. Track both." },
              { kpi: "LTV (simple)",         formula: "ARPU ÷ monthly churn rate",                                                          signal: "Lower churn = exponentially higher LTV. The core compounding lever." },
              { kpi: "Net Revenue Retention",formula: "(Start MRR + expansion − churn − contraction) ÷ start MRR × 100%",                  signal: "NRR >100% = growth from existing customers alone. Most powerful SaaS metric." },
            ].map((f) => (
              <div key={f.kpi} className="rounded-2xl border border-border bg-surface p-5">
                <div className="font-display text-sm font-semibold text-brand">{f.kpi}</div>
                <div className="mt-2 rounded-lg border border-border bg-secondary px-3 py-2 font-mono text-xs leading-relaxed text-foreground">{f.formula}</div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{f.signal}</p>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {/* ── DIAGNOSTICS ── */}
      {tab === "diagnostics" && (
        <DetailSection title="Diagnostics guide">
          <p className="mb-5 text-sm text-muted-foreground">Eight symptom patterns that tell you what your numbers mean and exactly where to focus first.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { symptom: "High MAU, low DAU/MAU",            meaning: "You are reaching people but not building a daily habit. The product is used occasionally, not routinely.",                                                              fix: "Identify daily use cases, add streak or notification mechanics, redesign for habitual triggers." },
              { symptom: "High conversion, high churn",       meaning: "Strong top-of-funnel but broken product experience. You are efficiently acquiring users who quickly find the product does not deliver on its promise.",               fix: "Audit onboarding, redefine the aha moment, align marketing copy with actual product value." },
              { symptom: "High retention, low conversion",    meaning: "Product-market fit exists for a segment, but you are failing to get new users to experience it. Friction before first value is too high.",                           fix: "Reduce sign-up friction, accelerate time-to-value in onboarding, improve landing page messaging." },
              { symptom: "Growing MAU, flat DAU",             meaning: "New users are being acquired but not activating into daily habits. Stickiness is declining even as reach grows.",                                                    fix: "Segment by cohort — newer cohorts likely have worse Day-1 retention. Investigate recent onboarding changes." },
              { symptom: "Low Day-1, decent Day-30",          meaning: "Users who survive Day 1 are loyal, but too many are lost before they get a chance. The problem is first-session value delivery.",                                    fix: "Compress time-to-first-value in session 1. Remove setup steps before the core experience begins." },
              { symptom: "Churn higher in recent cohorts",    meaning: "Something changed — product, pricing, marketing targeting, or the competitive landscape. Recent acquirees are lower quality or the product regressed.",             fix: "Cohort-compare onboarding completion, feature adoption, and support tickets. Isolate the inflection point." },
              { symptom: "High user churn, low MRR churn",   meaning: "Losing many low-value users but retaining high-value customers. May be healthy if the product is designed for a premium segment.",                                  fix: "Confirm churning users are truly low-value before investing in re-engagement. This pattern may be acceptable." },
              { symptom: "NRR >100% despite user churn",     meaning: "Expansion revenue from existing accounts exceeds cancellation losses. Your best customers are growing — a powerful position to be in.",                             fix: "Double down on expansion playbooks (upsells, seat growth, cross-sells). Protect and nurture the expanding segment." },
            ].map((d) => (
              <div key={d.symptom} className="rounded-2xl border border-border bg-surface p-5">
                <div className="font-display text-sm font-semibold text-foreground">{d.symptom}</div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{d.meaning}</p>
                <div className="mt-3 flex items-start gap-2 border-t border-border pt-3">
                  <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                  <p className="text-xs leading-relaxed text-brand">{d.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {/* CTA */}
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
        <div className="text-xs font-semibold uppercase tracking-widest text-brand">Go deeper</div>
        <h3 className="mt-3 font-display text-xl font-semibold">Product KPIs — the full course</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Five interactive modules covering DAU/MAU, Retention, Conversion, Churn, and how to read them together — with knowledge checks.</p>
        <Link to="/courses/product-kpis" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
          Start course <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </ContentDetail>
  );
}
