"use client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  FileText,
  Layers,
  LayoutList,
  Lightbulb,
  ListChecks,
} from "lucide-react";
import { ContentDetail, DetailSection } from "@/components/content-detail";

export const Route = createFileRoute("/resources/writing-prds")({
  head: () => ({
    meta: [
      { title: "PRD Writing Toolkit — ProductPath" },
      { name: "description", content: "Templates, examples, sample PRDs, checklist, anatomy, and case studies for writing PRDs that ship." },
    ],
  }),
  component: WritingPRDsResource,
});

type Tab = "templates" | "examples" | "sample-prds" | "dodont" | "checklist" | "anatomy" | "cases";
const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "templates",   label: "Templates",   icon: <FileText className="h-4 w-4" />    },
  { id: "examples",    label: "Examples",    icon: <Lightbulb className="h-4 w-4" />   },
  { id: "sample-prds", label: "Sample PRDs", icon: <Layers className="h-4 w-4" />      },
  { id: "dodont",      label: "Do / Don't",  icon: <LayoutList className="h-4 w-4" />  },
  { id: "checklist",   label: "Checklist",   icon: <ListChecks className="h-4 w-4" />  },
  { id: "anatomy",     label: "Anatomy",     icon: <BookOpen className="h-4 w-4" />    },
  { id: "cases",       label: "Case Studies",icon: <CheckSquare className="h-4 w-4" /> },
];

/* ── helpers ── */
function FormulaBlock({ children }: { children: string }) {
  return (
    <pre className="my-4 overflow-x-auto rounded-r-xl border border-border border-l-4 border-l-brand bg-secondary px-5 py-4 font-mono text-xs leading-relaxed text-brand">
      {children}
    </pre>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 flex gap-3 rounded-xl border border-[oklch(0.88_0.05_210)] bg-[oklch(0.97_0.02_210)] px-4 py-3 text-sm leading-relaxed text-[oklch(0.45_0.08_210)]">
      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

function DoDont({ doText, dontText }: { doText: string; dontText: string }) {
  return (
    <div className="my-4 grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-[oklch(0.88_0.08_145)] bg-[oklch(0.96_0.04_145)] p-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[oklch(0.4_0.15_145)]">Do</div>
        <p className="text-sm italic leading-relaxed text-[oklch(0.35_0.12_145)]">{doText}</p>
      </div>
      <div className="rounded-xl border border-[oklch(0.9_0.07_25)] bg-[oklch(0.97_0.03_25)] p-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[oklch(0.5_0.18_25)]">Don't</div>
        <p className="text-sm italic leading-relaxed text-[oklch(0.45_0.15_25)]">{dontText}</p>
      </div>
    </div>
  );
}

/* ── CHECKLIST DATA ── */
const CHECKLIST = [
  { section: "Problem", items: ["Problem statement names a specific user segment", "Evidence (qualitative and quantitative) is cited", "Opportunity is sized: how many users, how often", "Consequence of not solving is stated"] },
  { section: "Goals", items: ["Primary metric has a baseline and a numeric target", "A counter-metric is defined", "Non-goals are explicitly named and linked to future work"] },
  { section: "Requirements", items: ["All requirements use MoSCoW priority language", "Non-functional requirements included (performance, accessibility, security)", "Every requirement is independently testable", "Edge cases are documented"] },
  { section: "Alignment", items: ["RACI is mapped", "Domain experts have reviewed (legal, security, data)", "Open questions have named owners and deadlines", "Changelog section exists"] },
  { section: "Shipping", items: ["Acceptance criteria exist for every user story", "Launch readiness checklist is attached or linked", "Staged rollout success criteria are defined", "Post-launch review date is booked"] },
];

/* ── EXAMPLES DATA ── */
const EXAMPLES = [
  {
    tab: "Purpose",
    items: [
      { q: "Weak vs strong: purpose statement", weak: "We are building a filter feature because users asked for it in support tickets.", strong: "This PRD exists to align engineering, design, and leadership on the problem we are solving (invoice discovery friction), the evidence for its severity, and the criteria by which we will declare success. The filter feature is one proposed solution — not the requirement itself.", note: "The strong version makes clear the PRD is an alignment document and that the solution is still open for design." },
      { q: "Weak vs strong: TL;DR", weak: "This PRD is about improving the onboarding experience for mobile users.", strong: "New users who sign up via mobile exit before completing their first project at 68% — vs 29% on desktop. The primary drop-off point is the mandatory invite step. This PRD covers making the step skippable with deferred re-surface, targeting a 15 pp improvement in mobile Day-7 retention within 60 days of launch.", note: "The strong TL;DR names the problem, the evidence, the scope, and the target. An executive can read it in 20 seconds." },
    ],
  },
  {
    tab: "Problem",
    items: [
      { q: "Weak vs strong: problem statement", weak: "Users are unhappy with search. We want to make it better.", strong: "Enterprise users managing ≥20 active projects cannot search across projects simultaneously. They navigate into each project individually, averaging 4.2 project visits per search session (FullStory, Q2). Support analysis shows 340 'find content' tickets in Q2, 78% from Enterprise users. 'Can't find things' is the second most cited reason for Enterprise churn (exit interviews Q1, N=31).", note: "The strong version names the segment, quantifies the friction, cites three independent evidence sources, and connects to churn." },
      { q: "Weak vs strong: opportunity sizing", weak: "This affects a lot of users so it is high priority.", strong: "18% of users are on Growth/Enterprise plans (affected segment). 'Find content' friction contributes to ~22% of Enterprise churn — approximately $180K ARR annually at average Enterprise ACV of $8,200. Solving it fully would recover ~$40K ARR at current churn attribution rates.", note: "Quantified opportunity sizing gives leadership a number to compare against engineering cost. 'Affects a lot of users' cannot be compared to a sprint estimate." },
    ],
  },
  {
    tab: "Requirements",
    items: [
      { q: "Weak vs strong: user story", weak: "As a user, I want to search easily so that I can find things quickly.", strong: "As an enterprise user managing ≥20 projects, I want to search by keyword across all projects simultaneously. AC: Given I type ≥2 characters, then results appear within 800ms with matched text highlighted. Given I have no access to a project, then its items do not appear in my results.", note: "The strong story names a specific user type with context. The acceptance criteria are independently testable — a QA engineer can write a failing test before a single line of code is written." },
      { q: "Weak vs strong: edge case", weak: "The search should handle errors gracefully.", strong: "(Edge case) If the search index returns a timeout after 1.5s: display 'Search is taking longer than usual — try again' with a retry button. Do not show an empty results page. Log the timeout event to Datadog with query length and user_id.", note: "The strong edge case tells engineering what to build, QA how to test it, and the data team what to instrument." },
    ],
  },
  {
    tab: "Stakeholders",
    items: [
      { q: "Weak vs strong: open question", weak: "We need to figure out the permissions model.", strong: "Open question: Should cross-project search respect project-level access controls only, or also task-level? Owner: Security lead. Decision required by: 19 June 2026. If task-level access control is required, engineering estimates +2 weeks.", note: "The strong open question defines the decision to be made, names an owner, sets a deadline, and quantifies the impact." },
      { q: "Weak vs strong: RACI", weak: "The team will review this together.", strong: "Responsible: Daniel Osei (PM). Accountable: VP Product. Consulted: Eng lead (feasibility), Security (permissions model), Enterprise CS (customer impact). Informed: Marketing (go-to-market timing), Support (launch briefing). Only the VP Product can approve changes to launch scope after engineering has begun.", note: "The strong RACI prevents two failure modes: scope changes approved by people without authority, and key stakeholders blindsided at launch." },
    ],
  },
  {
    tab: "Shipping",
    items: [
      { q: "Weak vs strong: changelog entry", weak: "Updated requirements section.", strong: "14 June 2026 — Priya Menon, PM Growth: Removed 'contacts permission / pre-fill' story (was Could) from v1 scope. Legal review (13 June) determined iOS contacts permission requires updated App Store privacy disclosure — timeline risk. Moved to v2 backlog (JIRA PRD-47).", note: "The strong changelog records what changed, why it changed, who made the decision, and where the dropped work went." },
      { q: "Weak vs strong: staged rollout criteria", weak: "We will start with 5% and expand if things look good.", strong: "5% rollout gate (Day 7): Invite step completion ≥50% (baseline 32%). No increase in support tickets. P95 skip-action response time <300ms. Desktop Day-7 retention ≥71%. If all met: expand to 25%. If primary metric not met but no regressions: hold 7 more days. If counter metric regresses: rollback.", note: "The strong criteria define exactly what 'things look good' means, who decides, and the decision tree for every outcome." },
    ],
  },
];

function WritingPRDsResource() {
  const [tab, setTab] = useState<Tab>("templates");
  const [exTab, setExTab] = useState(0);
  const [prdTab, setPrdTab] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const totalChecks = CHECKLIST.reduce((a, s) => a + s.items.length, 0);
  const doneChecks = Object.values(checked).filter(Boolean).length;

  function toggle(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <ContentDetail
      backTo="/resources"
      backLabel="Back to resources"
      eyebrow="Reference · Craft"
      title="PRD Writing Toolkit"
      description="Templates, examples, sample PRDs, Do/Don't comparisons, an interactive checklist, PRD anatomy, and case studies — everything you need to write PRDs that engineers can build from."
      meta="Free · No sign-up · 7 tools"
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

      {/* ── TEMPLATES ── */}
      {tab === "templates" && (
        <>
          <DetailSection title="Problem statement">
            <p className="mb-3 text-sm text-muted-foreground">Fill every bracket with specifics. A problem statement with placeholders still in it is not a problem statement — it is a prompt that hasn't been answered yet.</p>
            <FormulaBlock>{`[User segment] struggle to [pain point] when [context / trigger].
Today they [current workaround], which causes [consequence].
We believe that [proposed solution] will [measurable outcome]
because [insight or evidence].`}</FormulaBlock>
            <Tip><strong>Completed example:</strong> "B2B Starter users managing 5+ projects struggle to track deadlines across projects when switching between project views. Today they maintain external spreadsheets, which causes missed deadlines and is the #1 reason cited for downgrade (43% of churned Starter users, N=210, Q2). We believe that a cross-project deadline view will reduce Starter plan churn by 12% because the problem is specific, evidenced, and no workaround exists inside the product."</Tip>
          </DetailSection>

          <DetailSection title="User story + acceptance criteria">
            <p className="mb-3 text-sm text-muted-foreground">The acceptance criteria row is where user stories do their actual work. Stories without AC are wishes, not requirements.</p>
            <FormulaBlock>{`As a [specific user type],
I want to [action / capability],
so that [benefit / outcome].

Acceptance criteria:
  · Given [precondition], when [action], then [expected result].
  · Given [precondition], when [action], then [expected result].
  · (Edge case) Given [precondition], when [action], then [expected result].`}</FormulaBlock>
            <Tip><strong>Completed example:</strong> "As a new mobile user who cannot invite teammates right now, I want to skip the invite step without losing progress. AC: Given I am on the invite step, when I tap 'Skip for now,' then I am taken directly to new project creation with no data loss. Given I skipped, when I open the Members tab for the first time, then I see an empty-state prompt surfacing the invite flow."</Tip>
          </DetailSection>

          <DetailSection title="Success metrics">
            <p className="mb-3 text-sm text-muted-foreground">The counter metric is what prevents you from gaming the primary metric. Always include one.</p>
            <FormulaBlock>{`Primary metric:   [metric name] — baseline [X], target [Y] by [date]
Secondary metric: [metric name] — baseline [X], target [Y] by [date]
Counter metric:   [metric name] — must not drop below [Z]

Measurement method: [how you will track this — tool, query, dashboard]
Review cadence:     [how often you will evaluate — weekly / biweekly]`}</FormulaBlock>
            <Tip><strong>Completed example:</strong> "Primary: Mobile Day-7 retention — baseline 31%, target 46% within 60 days. Secondary: Invite step completion within 7 days — baseline 32%, target 52%. Counter: Desktop Day-7 retention must not fall below 71%. Measurement: Mixpanel cohort report, updated daily. Review: Weekly for first 60 days post-launch."</Tip>
          </DetailSection>

          <DetailSection title="Assumption log">
            <p className="mb-3 text-sm text-muted-foreground">An assumption log forces you to be honest about what your PRD is standing on. Prioritise by risk if wrong.</p>
            <FormulaBlock>{`Assumption: [what you are assuming to be true]
Risk if wrong: High / Medium / Low
How to validate: [experiment, interview, data pull]
Validated by: [date / person / method]
Status: Open / Validated / Invalidated`}</FormulaBlock>
            <Tip><strong>Completed example:</strong> "Assumption: Users who skip the invite step will still complete invites within 7 days if surfaced in the Members tab empty-state. Risk if wrong: High — if they don't, our secondary metric fails and team collaboration never gets bootstrapped. How to validate: A/B test deferred surface vs no deferred surface with 10% of skipped users. Validated by: Launch +14 days."</Tip>
          </DetailSection>

          <DetailSection title="Changelog entry">
            <p className="mb-3 text-sm text-muted-foreground">Every material PRD change after engineering begins must be logged. Undocumented changes become disputed requirements.</p>
            <FormulaBlock>{`[Date] — [Author name, role]:
  Changed: [what changed, from what to what]
  Reason: [why the change was made]
  Impact: [engineering / timeline / cost implications]
  Stakeholders notified: [names and roles]`}</FormulaBlock>
            <Tip><strong>Completed example:</strong> "14 June 2026 — Priya Menon, PM Growth: Removed 'contacts permission / pre-fill' story (was Could) from v1 scope. Legal review (13 June) determined iOS contacts permission requires updated App Store privacy disclosure — timeline risk. Moved to v2 backlog (JIRA PRD-47). Notified: Eng lead, Design lead."</Tip>
          </DetailSection>
        </>
      )}

      {/* ── EXAMPLES ── */}
      {tab === "examples" && (
        <DetailSection title="Weak vs strong comparisons">
          <p className="mb-4 text-sm text-muted-foreground">Side-by-side comparisons for every major PRD component, with annotations explaining exactly what the difference achieves.</p>
          <div className="mb-5 flex flex-wrap gap-2">
            {EXAMPLES.map((e, i) => (
              <button
                key={e.tab}
                onClick={() => setExTab(i)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${i === exTab ? "border-foreground bg-foreground text-background" : "border-border bg-surface text-muted-foreground hover:border-foreground/30 hover:text-foreground"}`}
              >
                {e.tab}
              </button>
            ))}
          </div>
          <div className="space-y-5">
            {EXAMPLES[exTab]?.items.map((item) => (
              <div key={item.q} className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="mb-3 font-display text-base font-semibold text-foreground">{item.q}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[oklch(0.9_0.07_25)] bg-[oklch(0.97_0.03_25)] p-4">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[oklch(0.5_0.18_25)]">Weak</div>
                    <p className="text-sm italic leading-relaxed text-[oklch(0.45_0.15_25)]">{item.weak}</p>
                  </div>
                  <div className="rounded-xl border border-[oklch(0.88_0.08_145)] bg-[oklch(0.96_0.04_145)] p-4">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[oklch(0.4_0.15_145)]">Strong</div>
                    <p className="text-sm italic leading-relaxed text-[oklch(0.35_0.12_145)]">{item.strong}</p>
                  </div>
                </div>
                <Tip>{item.note}</Tip>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {/* ── SAMPLE PRDs ── */}
      {tab === "sample-prds" && (
        <DetailSection title="Sample PRDs">
          <p className="mb-4 text-sm text-muted-foreground">Two complete, annotated PRDs you can use as templates. Blue callout boxes explain why each section is written the way it is.</p>
          <div className="mb-5 flex gap-2 flex-wrap">
            {["PRD 1 — Mobile onboarding", "PRD 2 — B2B search & filter"].map((label, i) => (
              <button key={label} onClick={() => setPrdTab(i)} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${i === prdTab ? "border-foreground bg-foreground text-background" : "border-border bg-surface text-muted-foreground hover:border-foreground/30 hover:text-foreground"}`}>
                {label}
              </button>
            ))}
          </div>

          {prdTab === 0 && (
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="border-b border-border bg-secondary px-6 py-5">
                <h2 className="font-display text-base font-semibold text-foreground">PRD: Mobile onboarding — invite step redesign</h2>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span><strong className="text-foreground">Author:</strong> Priya Menon, PM Growth</span>
                  <span><strong className="text-foreground">Status:</strong> Approved</span>
                  <span><strong className="text-foreground">Last updated:</strong> 14 June 2026</span>
                  <span><strong className="text-foreground">Reviewers:</strong> Eng lead, Design lead, Legal, Data</span>
                </div>
              </div>
              <div className="divide-y divide-border p-6">
                {[
                  { title: "TL;DR", body: "New users who sign up via mobile device drop off before completing their first project at 68%, compared to 29% on desktop. The primary exit point is the mandatory 'invite your team' step. This PRD covers a redesign of that step to make it skippable, with a deferred re-surface mechanism, targeting a 15 pp improvement in mobile Day-7 retention within 60 days of launch.", tip: "Five sentences. Names the user, the problem, the evidence, the scope, and the target. If you cannot write the TL;DR, the scope is not clear yet." },
                  { title: "Problem", body: "Who is affected: New users who sign up via iOS or Android (34% of all sign-ups, Q2 2026). What they cannot do: Complete onboarding without inviting teammates — a step that requires switching apps, copying emails, and returning. Evidence: Mixpanel funnel (Q2 2026): 68% exit at invite step on mobile vs 29% on desktop. Exit survey (N=312): 41% cite 'I couldn't invite my team right then.' Consequence: ~1,400 mobile users per month never reach core product value. At $49 ARPU that is ~$68,600/month in lost potential MRR.", tip: "All four components present — segment, what they can't do, evidence (three independent sources), consequence quantified in MRR." },
                  { title: "Goals", body: "Primary: Mobile Day-7 retention +15 pp (31% → 46%). Secondary: Invite step completion within 7 days +20 pp. Counter: Desktop Day-7 retention must not fall below 71%. Timeframe: 60 days post full rollout. Non-goals: Redesigning the invite email template; SSO/SAML onboarding flows; admin-provisioned accounts.", tip: "Primary, secondary, and counter metric all defined with baselines. Non-goals are specific and explicit." },
                  { title: "Edge cases", body: "Offline state: Show cached screen with 'Connect to continue' — do not block navigation to skip. Solo plan user: Users on Solo plan cannot invite teammates. Invite step must not appear in their onboarding flow. Re-onboarding: Users who delete and reinstall must not see the invite step again if they already invited ≥1 teammate. Nudge limit: The 48hr nudge must fire at most once per user.", tip: "Each edge case names the trigger condition and expected system behaviour. Pre-solving them here prevents production bugs." },
                  { title: "Launch plan", body: "Staged rollout: 5% of mobile sign-ups → 25% → 100%. Each gate requires 7 days of data. 5% success gate: Invite step completion ≥50% (vs 32% baseline). No increase in mobile support tickets. No regression in desktop metrics. P95 skip-action response time <300ms confirmed. Post-launch review: Day 30 and Day 60 after full rollout.", tip: "" },
                ].map((s) => (
                  <div key={s.title} className="py-5 first:pt-0 last:pb-0">
                    <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.title}</div>
                    <p className="text-sm leading-7 text-muted-foreground">{s.body}</p>
                    {s.tip && <Tip><strong>Why this works:</strong> {s.tip}</Tip>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {prdTab === 1 && (
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="border-b border-border bg-secondary px-6 py-5">
                <h2 className="font-display text-base font-semibold text-foreground">PRD: Advanced search and filter — B2B project management</h2>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span><strong className="text-foreground">Author:</strong> Daniel Osei, PM Platform</span>
                  <span><strong className="text-foreground">Status:</strong> In review</span>
                  <span><strong className="text-foreground">Last updated:</strong> 12 June 2026</span>
                  <span><strong className="text-foreground">Reviewers:</strong> Eng lead, Design lead, Enterprise CS, Security</span>
                </div>
              </div>
              <div className="divide-y divide-border p-6">
                {[
                  { title: "TL;DR", body: "Enterprise users managing 20+ projects cannot find specific tasks, documents, or comments without navigating into each project individually, causing them to use external tools or miss deliverables. This PRD covers a structured search and filter system across projects, tasks, and files, targeting a 25% reduction in 'can't find it' support tickets within 90 days of launch." },
                  { title: "Problem", body: "Who is affected: Enterprise plan users managing ≥20 active projects. 18% of our user base, generating 61% of MRR. Evidence: Support analysis (Q1–Q2 2026): 340 tickets tagged 'find content' — 78% from Growth/Enterprise users. NPS verbatims (Q2, N=214 detractors): 'search' mentioned in 38% of negative responses. Usage data: users with ≥20 projects have 41% lower weekly session depth. Churn analysis: 'can't find things' cited by 22% of Enterprise churned accounts.", tip: "The segment is precisely defined (18% of users, 61% of MRR). Evidence draws on four independent sources. The consequence anchors to ARR, not sentiment." },
                  { title: "Goals", body: "Primary: 'Find content' support tickets −25% (340 → ≤255 per quarter). Secondary: Search-initiated session depth for 20+ project users +30%. Counter: P95 search result latency must not exceed 1.5s. Timeframe: 90 days post full rollout. Non-goals: AI-powered semantic search (next quarter); full-text search within file attachments; search within subtask comments; public API for search." },
                  { title: "Launch plan", body: "Staged rollout: Enterprise beta (opt-in, 20 accounts) → 10% of Growth/Enterprise → 100%. Each gate: 14 days of data. Beta success gate: P95 latency <1.5s confirmed. Zero permission-bleed incidents. NPS verbatim mentions of search shift from negative to neutral/positive in beta cohort. Post-launch review: Day 45 and Day 90." },
                ].map((s) => (
                  <div key={s.title} className="py-5 first:pt-0 last:pb-0">
                    <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.title}</div>
                    <p className="text-sm leading-7 text-muted-foreground">{s.body}</p>
                    {s.tip && <Tip><strong>Why this works:</strong> {s.tip}</Tip>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </DetailSection>
      )}

      {/* ── DO / DON'T ── */}
      {tab === "dodont" && (
        <DetailSection title="Do / Don't">
          <p className="mb-5 text-sm text-muted-foreground">The most commonly botched PRD sections, shown as side-by-side weak and strong examples.</p>
          {[
            { heading: "Writing the problem", doText: `"New mobile sign-ups exit at the invite step 68% of the time vs 29% on desktop. Exit surveys (N=312) cite inability to switch apps to find emails mid-onboarding."`, dontText: `"Users have trouble with onboarding. We need to improve the new user experience to increase retention."` },
            { heading: "Writing requirements", doText: `"The invite step must be skippable. Users who skip must see a single in-app nudge at 48 hours (not email). Nudge must not repeat. Skip action must complete within 300ms."`, dontText: `"Make the invite step simpler and more intuitive. Users should easily be able to invite their team."` },
            { heading: "Defining success", doText: `"Day-7 retention for mobile sign-ups increases from 31% to 46% within 60 days of launch. Counter metric: desktop Day-7 retention must not fall below current 71%."`, dontText: `"Improve retention. Users should feel better about the onboarding experience. We'll track NPS."` },
            { heading: "Scoping non-goals", doText: `"Out of scope: redesigning the invite email template; SSO/SAML onboarding; admin-created accounts. Each tracked as separate initiatives."`, dontText: `"We are only focused on the core experience." (What is the core experience? Who decides?)` },
            { heading: "Open questions", doText: `"Does requesting contacts permission on iOS require an updated App Store privacy disclosure? Owner: Legal. Decision required by: 20 June 2026. If yes: defer contacts pre-fill to v2."`, dontText: `"We need to figure out the permissions model." (No owner. No deadline. Never resolved.)` },
            { heading: "Staged rollout criteria", doText: `"5% gate (Day 7): invite completion ≥50%, no support ticket spike, P95 response <300ms, desktop retention ≥71%. If all met: expand to 25%. If counter metric regresses: rollback."`, dontText: `"We will start with 5% and expand if things look good." (What does 'good' mean? Who decides?)` },
          ].map((item) => (
            <div key={item.heading} className="mb-5 rounded-2xl border border-border bg-surface p-5">
              <h3 className="mb-3 font-display text-base font-semibold text-foreground">{item.heading}</h3>
              <DoDont doText={item.doText} dontText={item.dontText} />
            </div>
          ))}
        </DetailSection>
      )}

      {/* ── CHECKLIST ── */}
      {tab === "checklist" && (
        <DetailSection title="PRD readiness checklist">
          <p className="mb-5 text-sm text-muted-foreground">Work through every item before sharing the PRD with stakeholders. If you cannot check an item, that section needs more work.</p>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="space-y-5">
              {CHECKLIST.map((section) => (
                <div key={section.section}>
                  <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{section.section}</div>
                  <div className="space-y-2">
                    {section.items.map((item) => {
                      const key = `${section.section}:${item}`;
                      return (
                        <label key={item} className="flex cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            checked={!!checked[key]}
                            onChange={() => toggle(key)}
                            className="h-4 w-4 rounded accent-brand"
                          />
                          <span className={`text-sm leading-6 ${checked[key] ? "text-muted-foreground line-through" : "text-foreground"}`}>{item}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-border bg-secondary px-4 py-3">
              <div className="font-semibold text-foreground">{doneChecks} of {totalChecks} complete</div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                {doneChecks === totalChecks ? "PRD is ready for stakeholder review." : doneChecks >= totalChecks * 0.7 ? "Good progress — address remaining items before the review meeting." : "Work through each section before sharing the PRD with stakeholders."}
              </div>
            </div>
          </div>
        </DetailSection>
      )}

      {/* ── ANATOMY ── */}
      {tab === "anatomy" && (
        <DetailSection title="Anatomy of a PRD that ships">
          <p className="mb-5 text-sm text-muted-foreground">Each section serves a specific reader. Sections that don't serve a reader should not be in the PRD.</p>
          <div className="space-y-2">
            {[
              { num: "1.", section: "Header", reader: "For: everyone", desc: "Title, author, status (draft / review / approved), last updated date, reviewers. Exists so anyone who finds the doc in 6 months knows if it is still live and who owns it." },
              { num: "2.", section: "TL;DR", reader: "For: executives, late joiners", desc: "3–5 sentences: what is being built, for whom, and why now. If you cannot write the TL;DR, the scope is not clear yet. Executives read this and only this." },
              { num: "3.", section: "Problem", reader: "For: engineers, designers", desc: "Who is affected, what they cannot do today, what the evidence is, and what the cost of not solving it is. Engineers read this to understand why they're building what they're building." },
              { num: "4.", section: "Goals & non-goals", reader: "For: all stakeholders", desc: "What success looks like (with metrics and baselines) and what is explicitly out of scope. Non-goals are as important as goals — they prevent scope creep and scope arguments in sprint planning." },
              { num: "5.", section: "User stories", reader: "For: engineers, QA", desc: "The specific things users will be able to do, with acceptance criteria. Engineers refer to this section daily during development. Each story must be independently testable." },
              { num: "6.", section: "Requirements", reader: "For: engineers, QA, eng lead", desc: "Functional requirements (what the system does), non-functional requirements (performance, accessibility, security), and constraints. Use MoSCoW priority language: Must, Should, Could, Won't." },
              { num: "7.", section: "Edge cases", reader: "For: engineers, QA", desc: "What happens when things go wrong, inputs are unexpected, or the user is in a degraded state. Edge cases left undocumented become bugs discovered in production." },
              { num: "8.", section: "Open questions", reader: "For: PM, decision owners", desc: "Known unknowns with an owner and a due date for each. Open questions without owners are dead weight — they signal you haven't decided who is responsible for resolving them." },
              { num: "9.", section: "Launch plan", reader: "For: PM, eng, CS, support", desc: "Staged rollout criteria with explicit success gates, launch readiness checklist, and post-launch review schedule. This operationalises the PRD and closes the feedback loop." },
              { num: "10.", section: "Appendix", reader: "For: anyone who needs depth", desc: "Research, mockups, data, competing solutions, and changelog. Keeps the main doc readable while preserving the evidence trail for future PMs and reviewers." },
            ].map((row) => (
              <div key={row.section} className="flex gap-4 rounded-xl border border-border bg-surface p-4">
                <div className="flex flex-col gap-0.5 min-w-[140px]">
                  <span className="font-display text-sm font-semibold text-foreground">{row.num} {row.section}</span>
                  <span className="text-xs text-muted-foreground">{row.reader}</span>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{row.desc}</p>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {/* ── CASE STUDIES ── */}
      {tab === "cases" && (
        <DetailSection title="Case studies">
          <p className="mb-5 text-sm text-muted-foreground">How leading product organisations structure their PRD process — and the specific mechanism each uses to ship better products faster.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { company: "Amazon", focus: "Working backwards", stat: "Press release first", desc: "Amazon PMs write the customer-facing press release and FAQ before the PRD. This forces clarity on what the product is and who it is for before any engineering conversation starts." },
              { company: "Spotify", focus: "Opportunity sizing", stat: "Reach × Impact", desc: "Spotify PRDs quantify opportunity: how many users are affected, how often, and what the impact on a key metric would be if fully solved. This prevents teams from spending sprints on problems that affect 0.1% of users." },
              { company: "Airbnb", focus: "North star alignment", stat: "Nights booked", desc: "Every Airbnb PRD must articulate how the initiative moves 'nights booked' — the north star metric. Features that cannot draw a line to the north star require explicit leadership sign-off." },
              { company: "Google", focus: "Format discipline", stat: "No slides", desc: "Google product reviews use a written narrative, not slides. Prose requires you to make arguments that are complete and coherent — slides let you hide reasoning gaps behind bullet points." },
              { company: "Intercom", focus: "Jobs to be done", stat: "The job, not the feature", desc: "Intercom structures requirements around the 'job to be done' — the underlying goal the user is trying to achieve — rather than the feature request. This keeps solution space open longer." },
              { company: "Linear", focus: "Scope discipline", stat: "What we are NOT doing", desc: "Linear's spec format gives as much space to what they are not building as what they are. Their non-goals are explicit, named, and linked to future milestone documents." },
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

      {/* CTA */}
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
        <div className="text-xs font-semibold uppercase tracking-widest text-brand">Go deeper</div>
        <h3 className="mt-3 font-display text-xl font-semibold">Writing PRDs that ship — the full course</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Five interactive modules on what a PRD is for, defining the problem, writing requirements, stakeholder alignment, and shipping — with knowledge checks.</p>
        <Link to="/courses/writing-prds" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
          Start course <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </ContentDetail>
  );
}
