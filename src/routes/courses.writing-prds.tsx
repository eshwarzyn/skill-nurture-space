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

export const Route = createFileRoute("/courses/writing-prds")({
  head: () => ({
    meta: [
      { title: "Writing PRDs that ship — ProductPath" },
      { name: "description", content: "Five interactive modules: what a PRD is for, defining the problem, writing requirements, stakeholder alignment, and shipping." },
    ],
  }),
  component: WritingPRDsCourse,
});

interface Module {
  id: number;
  title: string;
  tag: string;
  eyebrow: string;
  duration: string;
  desc: string;
  body: string[];
  examples?: { label: string; text: string }[];
  keys: string[];
  quiz: { q: string; opts: { t: string; c: boolean }[]; ok: string; bad: string };
}

const MODULES: Module[] = [
  {
    id: 0,
    title: "What a PRD is (and is not) for",
    tag: "Purpose",
    eyebrow: "Module 1 of 5",
    duration: "20 min",
    desc: "A PRD is not a feature specification. It is an alignment document — a shared source of truth that answers why before how. This distinction determines whether your PRD drives decisions or collects dust.",
    body: [
      "A Product Requirements Document answers one question: 'What problem are we solving, for whom, and how will we know we solved it?' Every other section exists to answer some part of that question in more detail.",
      "The most common PRD failure is writing a solution disguised as a problem. 'We need a filter' is not a problem — it is a proposed solution. The problem is 'users cannot find their past invoices without scrolling through hundreds of records, which causes them to miss payment dates.' That opens solution space; 'we need a filter' closes it prematurely.",
      "A PRD has three audiences. Engineers need enough precision to build without 40 clarifying questions. Designers need enough context about user goals to make good UX decisions. Leadership needs enough scope clarity to resource and prioritise the work.",
      "A PRD is a living document — not a contract. Requirements change as you learn. A PRD that cannot be updated is a historical artefact. The changelog section exists because the document will evolve, and stakeholders need to know what changed and when.",
    ],
    examples: [
      { label: "Problem (do this)", text: "\"New mobile sign-ups drop off at the team invite step at 68% — vs 29% on desktop — causing them to never reach core product value.\"" },
      { label: "Solution disguised as problem (don't)", text: "\"We need to redesign the invite step. The current UX is confusing.\"" },
    ],
    keys: [
      "A PRD answers why before how. The what and how are downstream of the why.",
      "Three audiences: engineers (precision), designers (context), leadership (scope). Write for all three.",
      "A solution disguised as a requirement forecloses design thinking before it starts. Always ask: is this describing the problem or prescribing the solution?",
      "PRDs are alignment tools, not approval documents. Their job is to prevent ambiguity, not grant permission.",
      "A PRD that is never updated signals the team has stopped using it as a source of truth. Maintain a changelog.",
    ],
    quiz: {
      q: "A PM writes: \"Users need a way to export their data as a CSV.\" Which statement best describes this requirement?",
      opts: [
        { t: "It is well-formed — it names a specific need and an output format.", c: false },
        { t: "It is a solution masquerading as a requirement — the underlying problem has not been stated.", c: true },
        { t: "It is too vague — it needs acceptance criteria before it is a requirement.", c: false },
        { t: "It is correct — requirements should specify technical format to avoid ambiguity.", c: false },
      ],
      ok: "Correct. 'Users need a CSV export' describes a proposed solution, not a problem. What can't users do today? Why does that matter? Until those questions are answered, the team cannot evaluate whether CSV export is the right solution — or whether the problem needs solving at all.",
      bad: "This is a solution, not a problem statement. It specifies a mechanism (CSV export) without explaining what users cannot do today or why that matters. A PM who receives this requirement cannot evaluate whether CSV is the right answer — only the problem statement creates that context.",
    },
  },
  {
    id: 1,
    title: "Defining the problem precisely",
    tag: "Problem definition",
    eyebrow: "Module 2 of 5",
    duration: "25 min",
    desc: "The quality of a PRD is determined almost entirely by the quality of the problem definition. A sharp problem statement makes every downstream decision easier — requirements, scope, success metrics, and trade-offs all fall out of it naturally.",
    body: [
      "A good problem statement has four components: the affected user segment, the specific thing they cannot do today, the evidence that this is real and common, and the consequence of leaving it unsolved. All four must be present. A problem statement missing any of them is incomplete.",
      "Evidence is what separates a product hypothesis from a product requirement. '68% of mobile sign-ups exit at the invite step (Mixpanel, Q3) and exit surveys cite confusion (N=87)' is evidence. Evidence tells you the size and severity of the problem; hypotheses do not.",
      "Opportunity sizing makes the problem defensible in prioritisation. How many users are affected? How often? What is the revenue or retention impact if the problem is solved? A problem that affects 5 users once a year does not belong on the roadmap.",
      "The success metric is latent in the problem statement. If your problem is 'mobile onboarding drop-off at the invite step,' your success metric is Day-7 retention for mobile cohorts — not NPS. If you cannot read the success metric off the problem statement, the problem is not specific enough.",
    ],
    examples: [
      { label: "Sharp problem statement", text: "\"B2B users on the Starter plan who manage 5+ projects cannot see a consolidated view of deadlines across projects. They currently maintain spreadsheets outside the product (cited by 43% of churned Starter users in exit surveys, N=210, Q2). This is the #1 cited reason for downgrade from Growth to Starter.\"" },
      { label: "Weak problem statement", text: "\"Project management users want better visibility into their work. We should improve the overview experience.\"" },
    ],
    keys: [
      "Four components: affected user segment, what they cannot do today, evidence, consequence of not solving.",
      "Evidence separates hypotheses from requirements. Qualitative and quantitative evidence together are stronger than either alone.",
      "Opportunity sizing — how many users, how often, what impact — makes the problem defensible in any prioritisation conversation.",
      "The success metric is latent in the problem statement. A specific enough problem implies its own measure of success.",
      "A problem statement that could justify any solution is not a problem statement — it is a vague direction.",
    ],
    quiz: {
      q: "A PM writes: \"Power users are frustrated with the search experience.\" What is the most critical thing missing from this problem statement?",
      opts: [
        { t: "A proposed solution — the PM should suggest what the search experience should look like.", c: false },
        { t: "A timeline — the PM should say when this problem started occurring.", c: false },
        { t: "Evidence of the problem's existence and size, plus the specific thing users cannot do today.", c: true },
        { t: "Acceptance criteria — the PM should define what 'not frustrated' looks like.", c: false },
      ],
      ok: "Correct. 'Power users are frustrated' names a sentiment but not a problem. What specifically can't they do? How many users are affected? What is the evidence? What happens as a result? Without these, the PM cannot size the opportunity, the team cannot evaluate solutions, and leadership cannot prioritise.",
      bad: "The most critical gaps are evidence and specificity. 'Frustrated' is a sentiment, not a problem. The statement needs: what specifically cannot users do, how many are affected, what is the evidence, and what is the consequence.",
    },
  },
  {
    id: 2,
    title: "Writing requirements engineers can build from",
    tag: "Requirements",
    eyebrow: "Module 3 of 5",
    duration: "25 min",
    desc: "A requirement is a contract between PM and engineer. It must be specific enough to remove ambiguity, testable enough to know when it is met, and purposeful enough to explain why it exists.",
    body: [
      "The MoSCoW framework (Must / Should / Could / Won't) is the most practical way to encode priority into requirements. 'Must' means the feature cannot ship without it. 'Should' means it is important but can be deferred under time pressure. 'Could' means it is a nice-to-have. 'Won't' — explicitly stating what you are not building — is often more valuable than the other three categories combined.",
      "Functional requirements describe what the system does. Non-functional requirements describe how the system performs: response time, uptime, accessibility compliance, data retention policies, security constraints. Non-functional requirements are the most commonly skipped section of a PRD, and the most commonly blamed section when something goes wrong in production.",
      "Every requirement should answer three questions: What must the system do? Under what conditions? With what observable result? 'The search must return results within 500ms for queries of up to 100 characters on a standard 4G connection' passes all three.",
      "Edge cases are requirements too. What happens when a user submits an empty form? When an API call fails? When a user has no historical data? Edge cases left out of the PRD become bugs in sprint review. The PM's job is to pre-solve them in writing.",
    ],
    examples: [
      { label: "Testable requirement (do this)", text: "\"The invite modal must close and return focus to the project view within 200ms of the user clicking Dismiss. On mobile viewports (<768px), the modal must be full-screen.\"" },
      { label: "Untestable requirement (don't)", text: "\"The invite modal should be easy to dismiss and work well on mobile.\"" },
    ],
    keys: [
      "MoSCoW: Must (non-negotiable), Should (high priority, deferrable), Could (nice-to-have), Won't (explicit non-goals). Won't is the most underused.",
      "Non-functional requirements — performance, accessibility, security, data — are the most skipped and most blamed. Always include them.",
      "A testable requirement specifies: what the system does, under what conditions, with what observable result.",
      "Vague language ('simple', 'intuitive', 'fast', 'easy to use') cannot be tested and must never appear in a requirement.",
      "Edge cases are requirements. Pre-solve them in writing, or discover them as production bugs.",
    ],
    quiz: {
      q: "A requirement states: \"The dashboard should load quickly and display the user's most important data.\" Why does this fail as a requirement?",
      opts: [
        { t: "It uses 'should' instead of 'must' — all requirements must be mandatory.", c: false },
        { t: "'Load quickly' and 'most important data' are subjective and untestable — there is no way to know when this requirement is met.", c: true },
        { t: "It is too short — requirements need more detail about the technical implementation.", c: false },
        { t: "It combines two requirements in one sentence — they must be separated.", c: false },
      ],
      ok: "Correct. 'Quickly' has no measurable threshold, so it cannot be tested. 'Most important data' is subjective — whose importance? By what criteria? The requirement needs a specific load time target (e.g. <1.5s at P95 on a 4G connection), and a defined list of which data elements must appear above the fold.",
      bad: "'Quickly' is not a specification — it is an aspiration. 'Most important data' cannot be tested without knowing whose definition of important applies. Requirements must be verifiable: a QA engineer must be able to write a failing test before the feature is built.",
    },
  },
  {
    id: 3,
    title: "Stakeholder alignment and the review process",
    tag: "Stakeholders",
    eyebrow: "Module 4 of 5",
    duration: "20 min",
    desc: "A PRD that no one has reviewed is a PRD that will be rejected at the worst possible moment. Alignment is not a step that happens after the PRD is written — it is built into the writing process from the first draft.",
    body: [
      "The review process is where PRDs die most often — not because they are poorly written, but because the wrong people review them in the wrong order. The right order is: domain experts first (legal, security, data, platform), then functional peers (design, engineering leads, data science), then leadership.",
      "Asynchronous review is faster than synchronous review for complex PRDs. Sending the document 48 hours before a review meeting allows reviewers to think carefully and arrive with specific, actionable feedback rather than vague concerns raised in real time.",
      "Disagreements in the review process are a feature, not a bug. A PRD that generates no disagreement was either too vague to have an opinion on, or was not read carefully. Real alignment means reviewers understand the trade-offs and have had the opportunity to object.",
      "The RACI model (Responsible / Accountable / Consulted / Informed) prevents two categories of failure: over-consulting (too many people with veto power slow everything down) and under-consulting (a key stakeholder who was not consulted blocks the launch).",
    ],
    examples: [
      { label: "Effective review request", text: "\"Please review Sections 3 and 4 by Thursday. Specifically: (1) Is the data retention policy in 4.2 compatible with GDPR? (2) Does the API design in 4.5 require a breaking change? Comments in the doc, or reply here.\"" },
      { label: "Ineffective review request", text: "\"Please take a look at the PRD and let me know your thoughts when you get a chance.\"" },
    ],
    keys: [
      "Review order matters: domain experts → functional peers → leadership. Never bring leadership an unreviewed PRD.",
      "Async review with 48-hour lead time produces better feedback than live PRD walkthroughs.",
      "Disagreements during review are healthy — they surface false assumptions before they become expensive bugs.",
      "RACI: Responsible (who writes), Accountable (who decides), Consulted (who provides input), Informed (who needs to know). More than two Accountable owners is a red flag.",
      "Silent approval is not alignment. Alignment means reviewers have understood the trade-offs and had a real opportunity to object.",
    ],
    quiz: {
      q: "A PM finishes a PRD and schedules a 60-minute review meeting the next morning, sharing the doc in the calendar invite. What is the most significant problem with this approach?",
      opts: [
        { t: "60 minutes is too short for a thorough review of a complex PRD.", c: false },
        { t: "Reviewers have no time to read carefully before the meeting, so feedback will be shallow, reactive, and incomplete — reducing the review to a performance of alignment rather than real alignment.", c: true },
        { t: "The PM should not share the doc before the meeting — it should be read live together.", c: false },
        { t: "Review meetings should always be run by the engineering lead, not the PM.", c: false },
      ],
      ok: "Correct. A complex PRD read for the first time in a meeting produces surface-level reactions, not careful analysis. Reviewers cannot check data sources, consult colleagues, or think through edge cases in real time. 48 hours of async reading time consistently produces more specific, actionable feedback.",
      bad: "The core issue is time. Reading a PRD carefully enough to give actionable feedback requires focused time. Async review with 48 hours lead time is the standard for a reason: it gives reviewers the time to think and check, rather than react.",
    },
  },
  {
    id: 4,
    title: "Shipping with alignment — from PRD to launch",
    tag: "Shipping",
    eyebrow: "Module 5 of 5",
    duration: "20 min",
    desc: "A PRD's job is not finished when engineering starts. It evolves through development, shapes the QA process, and drives the go-to-market strategy.",
    body: [
      "PRDs change during development — and that is normal. What is not normal is changing them without documentation. Every material change to a PRD after engineering begins must be logged in the changelog with a date, what changed, and why. Changes without changelogs create confusion about what the final requirement was.",
      "A launch readiness checklist is the operational continuation of the PRD. It answers: has QA signed off on the acceptance criteria? Has legal reviewed the copy? Has the support team been briefed? Has the data team confirmed the tracking events are firing? A PRD without a launch checklist is a design that has never been operationalised.",
      "The success metrics in the PRD become the post-launch review agenda. Two to four weeks after launch, the PM should present: did we hit the target metric? What moved unexpectedly, including counter-metrics? What did we learn that we did not anticipate?",
      "Feature flags and staged rollouts change how PRDs are written. If a feature will be rolled out to 5% of users first, the PRD must specify what 'success at 5%' looks like — not just 'success at 100%.' Omitting it means the team has no agreed criteria for expanding the rollout.",
    ],
    examples: [
      { label: "Good staged success criteria", text: "\"5% rollout success: invite step completion rate ≥50% (vs 32% baseline), no increase in support tickets related to invites. If met after 7 days, expand to 25%.\"" },
      { label: "Missing staged criteria (don't)", text: "\"We will roll out gradually and monitor before going to 100%.\"" },
    ],
    keys: [
      "Changelog every material PRD change after engineering begins — date, what changed, why. Undocumented changes become disputed requirements.",
      "A launch readiness checklist operationalises the PRD: QA sign-off, legal review, support briefing, tracking verification, rollout plan.",
      "Post-launch review closes the loop: did we hit the target? What moved unexpectedly? What do we carry into the next PRD?",
      "Staged rollouts require staged success criteria in the PRD. What does success at 5% look like? At 50%? At 100%?",
      "The PM's job during development is to resolve ambiguity in real time, not to gate-keep. Be reachable.",
    ],
    quiz: {
      q: "During development, engineering discovers the proposed solution requires a third-party API that adds $0.02 per user action. The PM quietly updates the requirements without noting the change. What is the primary risk?",
      opts: [
        { t: "The change may not be technically feasible.", c: false },
        { t: "Stakeholders who approved the original PRD — finance, legal, leadership — are now operating on outdated information without knowing it, creating misaligned expectations at launch.", c: true },
        { t: "The PRD will be too long if every change is logged.", c: false },
        { t: "Engineers may use the wrong version of the document.", c: false },
      ],
      ok: "Correct. A $0.02-per-action cost implication is material information for finance, product leadership, and potentially legal. Stakeholders who approved the PRD based on the original approach are now implicitly approving a changed approach they have not seen. The changelog is the mechanism for maintaining the trust that alignment depends on.",
      bad: "The risk is misalignment, not version control. Stakeholders who approved the PRD approved it based on specific assumptions — cost being one of them. A material change without notification means those stakeholders are now acting on outdated information.",
    },
  },
];

function WritingPRDsCourse() {
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const [done, setDone] = useState(false);

  const mod = MODULES[current]!;
  const totalMods = MODULES.length;
  const completedCount = Object.values(completed).filter(Boolean).length;
  const progress = Math.round((completedCount / totalMods) * 100);

  function answer(idx: number) {
    if (answered[current] !== undefined) return;
    setAnswered((prev) => ({ ...prev, [current]: idx }));
    if (mod.quiz.opts[idx]?.c) setCompleted((prev) => ({ ...prev, [current]: true }));
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
          <p className="mt-4 text-muted-foreground">You've worked through all five modules: what a PRD is for, defining the problem, writing requirements, stakeholder alignment, and shipping.</p>
          <div className="mt-8 inline-block rounded-2xl border border-border bg-surface px-10 py-6 text-center">
            <div className="font-display text-4xl font-bold text-foreground">{completedCount}/{totalMods}</div>
            <div className="mt-1 text-sm text-muted-foreground">Modules passed</div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground disabled:opacity-40">
              <RotateCcw className="h-4 w-4" /> Restart course
            </button>
            <Link to="/resources/writing-prds" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background">
              PRD toolkit <ArrowRight className="h-4 w-4" />
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
          <span className="text-sm font-medium text-foreground">Writing PRDs that ship</span>
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
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
              {MODULES.map((m, i) => (
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
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            {mod.eyebrow} · {mod.tag} · {mod.duration}
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{mod.title}</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{mod.desc}</p>

          {/* Body */}
          <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
            <div className="space-y-4">
              {mod.body.map((p, i) => (
                <p key={i} className="text-sm leading-7 text-muted-foreground">{p}</p>
              ))}
            </div>
            {mod.examples && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {mod.examples.map((e) => (
                  <div key={e.label} className={`rounded-xl border p-4 ${e.label.toLowerCase().includes("don") ? "border-[oklch(0.9_0.07_25)] bg-[oklch(0.97_0.03_25)]" : "border-[oklch(0.88_0.08_145)] bg-[oklch(0.96_0.04_145)]"}`}>
                    <div className={`mb-2 text-xs font-semibold uppercase tracking-wider ${e.label.toLowerCase().includes("don") ? "text-[oklch(0.5_0.18_25)]" : "text-[oklch(0.4_0.15_145)]"}`}>{e.label}</div>
                    <p className={`text-sm italic leading-relaxed ${e.label.toLowerCase().includes("don") ? "text-[oklch(0.45_0.15_25)]" : "text-[oklch(0.35_0.12_145)]"}`}>{e.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Key principles */}
          <div className="mt-4 rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">Key principles</h2>
            <ul className="mt-4 space-y-3">
              {mod.keys.map((k) => (
                <li key={k} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[oklch(0.4_0.15_145)]" />
                  <span className="text-sm leading-6 text-muted-foreground">{k}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quiz */}
          <div className="mt-4 rounded-2xl border border-border bg-surface p-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-brand">Knowledge check</div>
            <p className="mt-3 font-display text-base font-semibold text-foreground">{mod.quiz.q}</p>
            <div className="mt-4 space-y-2">
              {mod.quiz.opts.map((opt, i) => {
                const sel = answered[current];
                const picked = sel === i;
                const correct = opt.c;
                const revealed = sel !== undefined;
                let cls = "border-border bg-surface text-foreground hover:border-foreground/30";
                if (revealed && picked && correct) cls = "border-[oklch(0.4_0.15_145)] bg-[oklch(0.96_0.06_145)] text-[oklch(0.3_0.15_145)]";
                else if (revealed && picked && !correct) cls = "border-[oklch(0.5_0.18_25)] bg-[oklch(0.97_0.05_25)] text-[oklch(0.4_0.18_25)]";
                else if (revealed && correct) cls = "border-[oklch(0.4_0.15_145)] bg-[oklch(0.96_0.06_145)] text-[oklch(0.3_0.15_145)]";
                return (
                  <button key={opt.t} onClick={() => answer(i)} disabled={revealed} className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${cls} ${revealed ? "cursor-default" : "cursor-pointer"}`}>
                    <span className="mr-2 font-semibold">{String.fromCharCode(65 + i)}.</span>{opt.t}
                  </button>
                );
              })}
            </div>
            {answered[current] !== undefined && (
              <div className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-6 ${mod.quiz.opts[answered[current]]?.c ? "border-[oklch(0.88_0.08_145)] bg-[oklch(0.96_0.06_145)] text-[oklch(0.35_0.15_145)]" : "border-[oklch(0.9_0.07_25)] bg-[oklch(0.97_0.05_25)] text-[oklch(0.4_0.18_25)]"}`}>
                <strong>{mod.quiz.opts[answered[current]]?.c ? "Correct! " : "Not quite. "}</strong>
                {mod.quiz.opts[answered[current]]?.c ? mod.quiz.ok : mod.quiz.bad}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground disabled:opacity-40">
              <ArrowLeft className="h-4 w-4" /> Previous
            </button>
            <button onClick={next} className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background">
              {current < totalMods - 1 ? "Next module" : "Finish course"} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
