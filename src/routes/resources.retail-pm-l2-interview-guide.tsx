import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BookOpen,
  Boxes,
  Briefcase,
  ClipboardList,
  Gauge,
  MessageCircleQuestion,
  Sparkles,
  Users,
} from "lucide-react";
import { ContentDetail, DetailSection } from "@/components/content-detail";

export const Route = createFileRoute("/resources/retail-pm-l2-interview-guide")({
  head: () => ({
    meta: [
      { title: "PM L2 (Retail Store Tech) Interview Guide — ProductPath" },
      {
        name: "description",
        content:
          "Level 2 technical interview prep for Product Manager — Retail Store Technology: domain deep-dives (POS, SCO, Inventory, Loyalty, BOPIS, SFS, OMS), PM craft, Agile delivery, stakeholder management, KPIs, and behavioral frameworks.",
      },
    ],
  }),
  component: RetailPML2Guide,
});

type Tab = "foundations" | "domain" | "case" | "agile" | "stakeholders" | "kpis" | "behavioral" | "ask" | "cheatsheet";
const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "foundations", label: "PM Foundations", icon: <BookOpen className="h-4 w-4" /> },
  { id: "domain", label: "Domain Deep-Dives", icon: <Boxes className="h-4 w-4" /> },
  { id: "case", label: "Product Sense", icon: <Sparkles className="h-4 w-4" /> },
  { id: "agile", label: "Agile / Delivery", icon: <ClipboardList className="h-4 w-4" /> },
  { id: "stakeholders", label: "Stakeholders", icon: <Users className="h-4 w-4" /> },
  { id: "kpis", label: "KPIs", icon: <Gauge className="h-4 w-4" /> },
  { id: "behavioral", label: "Behavioral", icon: <Briefcase className="h-4 w-4" /> },
  { id: "ask", label: "Ask Them", icon: <MessageCircleQuestion className="h-4 w-4" /> },
  { id: "cheatsheet", label: "Cheat Sheet", icon: <ClipboardList className="h-4 w-4" /> },
];

function QA({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h3 className="mb-2 font-display text-base font-semibold text-foreground">{q}</h3>
      <div className="text-sm leading-7 text-muted-foreground">{a}</div>
    </div>
  );
}

const FOUNDATIONS = [
  {
    q: "PRD vs BRD vs User Story — what's the difference?",
    a: (
      <>
        <p><strong className="text-foreground">BRD</strong> captures the <em>why</em> — business problem, objectives, scope, stakeholders, success metrics. Written for a business/exec audience. Example: "Reduce checkout abandonment at Self-Checkout kiosks by 15%."</p>
        <p className="mt-2"><strong className="text-foreground">PRD</strong> captures the <em>what</em> — functional/non-functional requirements, user flows, edge cases, dependencies, UI references. Written for engineering/design/QA.</p>
        <p className="mt-2"><strong className="text-foreground">User Story</strong> is a small, testable slice of the PRD written from the user's perspective: "As a store associate, I want to override a price at SCO so that I can resolve a customer dispute without calling a manager."</p>
        <p className="mt-2">In retail tech, BRDs often originate from Store Ops/Merchandising; PRDs translate them for engineering; user stories break them into sprint-sized work.</p>
      </>
    ),
  },
  {
    q: "How do you write good acceptance criteria?",
    a: (
      <>
        <p>Use Given/When/Then (Gherkin) format:</p>
        <pre className="my-3 overflow-x-auto rounded-r-xl border border-border border-l-4 border-l-brand bg-secondary px-5 py-4 font-mono text-xs leading-relaxed text-brand">{`Feature: SCO Age Verification
Scenario: Cashier confirms customer age for restricted item
  Given a restricted item (alcohol) is scanned at SCO
  When the system detects the item category
  Then SCO pauses checkout and displays "Attendant verification required"
  And the transaction cannot resume until an attendant overrides with employee badge scan`}</pre>
        <p>Good AC is testable, unambiguous, covers happy path + edge cases (e.g. network drop mid-override, multiple restricted items in one basket), and ties back to a business rule.</p>
      </>
    ),
  },
  {
    q: "Your process for requirement gathering with Store Ops/Merchandising?",
    a: (
      <ol className="list-decimal space-y-1 pl-5">
        <li>Identify stakeholder groups (Store Ops, Merchandising, Engineering, UX, Payments, QA, Loss Prevention).</li>
        <li>Run discovery sessions/shadowing (e.g. observe SCO usage on the floor).</li>
        <li>Document current-state vs desired-state process flows.</li>
        <li>Translate pain points into a BRD → prioritized backlog.</li>
        <li>Validate with a walkthrough/demo before build starts (reduces rework).</li>
        <li>Close the loop with UAT sign-off from the same stakeholders.</li>
      </ol>
    ),
  },
];

const DOMAIN = [
  { area: "POS (Point of Sale)", q: "Walk me through the core components of a modern POS system.", a: "A POS stack typically includes: (1) the POS client/UI at the register, (2) transaction engine (cart, pricing, tax calc), (3) payment integration (tender types, EMV/chip processing), (4) inventory sync (real-time or near-real-time stock decrement), (5) loyalty/promotions engine hooks, (6) receipt/printer services, and (7) offline mode for store-network outages with later reconciliation. The trickiest part as PM is usually the offline/online sync logic and pricing/promo conflict resolution." },
  { area: "POS (Point of Sale)", q: "How would you handle a requirement where price at POS doesn't match price on shelf/app?", a: "Frame it as a price integrity problem: identify root cause (stale price file sync, regional pricing rules, promo timing mismatch), define a single source of truth (usually the pricing engine/ERP), set SLAs for price-file propagation to stores, and add a price-match/override workflow for associates as a stopgap while engineering fixes sync latency. Tie resolution to a KPI like \"price discrepancy incidents per week.\"" },
  { area: "Self-Checkout (SCO)", q: "Biggest UX and shrink challenges in SCO — how do you balance them?", a: "Core tension: friction vs. shrink. More verification steps (weight checks, item-recognition cameras, age verification) reduce theft but increase abandonment and queue time. As PM: segment by risk (apply AI-vision/weight-check only to top shrink SKU categories, not every item), use randomized/sampled audits instead of checking every basket, and measure both shrink rate and transaction time/NPS as paired metrics so one doesn't get optimized at the other's expense." },
  { area: "Self-Checkout (SCO)", q: "Design the flow for an item that fails barcode scan repeatedly at SCO.", a: "Scan retry (3 attempts) → manual SKU/PLU lookup option → \"Look it up\" search by image/category → escalate to attendant call button → attendant remote-resolves via handheld. Each step needs a timeout and fallback, and the design should minimize attendant trips to the kiosk." },
  { area: "Inventory Management", q: "How do you ensure inventory accuracy across online and in-store channels?", a: "Discuss the single inventory ledger concept — real-time (event-driven) updates from POS, SCO, OMS, e-commerce, and warehouse systems feeding a centralized inventory service, vs. legacy batch syncs that cause overselling. Mention safety stock buffers, cycle counts, RFID/IoT sensors for high-shrink categories, and reconciliation jobs to catch drift between physical and system counts." },
  { area: "Inventory Management", q: "A store consistently shows inventory mismatches against POS sales — how do you investigate?", a: "Data-driven RCA: pull sales vs. on-hand deltas by SKU/store, check if mismatch correlates with a specific event (SFS picks not decrementing, returns without restock flag, vendor receiving lag, shrink). Loop in Engineering for sync logs, Ops for process audit, and propose either a system fix (event-driven decrement) or a process fix (mandatory cycle count cadence)." },
  { area: "Loyalty & Rewards", q: "How would you design a tiered loyalty program's technical requirements?", a: "Define: enrollment/identification at POS/SCO (phone, card, app QR), points accrual rules engine (tied to the pricing engine at line-item level), tier calculation (rolling 12-month spend), redemption rules (stacking with promotions — usually not stackable, define explicitly), and real-time balance lookup at checkout. Key non-functional requirement: sub-second latency at POS, since loyalty lookups can't slow the checkout line." },
  { area: "Promotions & Coupons", q: "What's the hardest part of building a promotions engine?", a: "Conflict resolution and stacking rules — e.g. a customer has a loyalty discount, a manufacturer coupon, and a storewide % off. You need a deterministic priority/stacking matrix (which discounts apply first, which are mutually exclusive, max discount caps) defined with Merchandising/Finance before writing a single user story, or engineering will hardcode ad-hoc logic that breaks with the next promo." },
  { area: "Payments & Tendering", q: "What should a PM know about PCI compliance?", a: "Cardholder data should never touch unencrypted app/POS layers (tokenization via the payment processor); scope of PCI-DSS shrinks if card data stays fully outside your environment (P2PE devices); any new tender type (wallets, BNPL) needs a security/compliance review gate in your roadmap — budget time for it, don't treat it as a fast follow." },
  { area: "Payments & Tendering", q: "How do you scope adding a new payment method (e.g. a BNPL provider) across the fleet?", a: "Capture: certification/integration timeline with the processor, hardware compatibility (existing PIN pads may need firmware/SDK updates), fallback flow if the BNPL service times out, receipt/reconciliation changes for Finance, and a phased rollout (pilot stores → regional → national) with rollback criteria." },
  { area: "BOPIS", q: "Key product decisions in a BOPIS flow?", a: "Inventory reservation logic (real-time hold vs. soft allocation), pick/pack SLA and store associate task queue, customer notification triggers (order ready, delayed, substitution needed), pickup verification (ID/QR/order number), curbside vs. counter UX. The riskiest failure mode: item is out of stock after order placed — define substitution and refund rules clearly." },
  { area: "Ship From Store (SFS)", q: "How does SFS change store associate workflows, and what should the product support?", a: "Turns store staff into fulfillment workers — needs pick task prioritization (don't let SFS picks starve in-store customer service), real-time inventory decrement at \"pick\" not just \"ship\" (avoid overselling), and carrier/label integration at store level. Also needs reporting so Ops can see SFS volume's labor impact per store." },
  { area: "Endless Aisle", q: "What problem does Endless Aisle solve, and what are its dependencies?", a: "Lets associates/kiosks sell SKUs not physically stocked in that store by ordering from a DC/other location. Depends on accurate network-wide inventory visibility, a unified catalog (including online-only SKUs), and a checkout flow that handles \"ship to customer\" / \"ship to store\" alongside in-hand items in the same basket/payment transaction." },
  { area: "Store-to-Store Transfers", q: "What requirements would you define for an inter-store transfer feature?", a: "Trigger conditions (manual request vs. automated rebalancing from demand forecasting), transfer approval workflow, in-transit inventory state (neither store's on-hand count until received), and discrepancy handling on receipt (damaged/missing items). Tie to a KPI like reduced \"lost sale due to OOS\" rate." },
  { area: "Returns & Exchanges", q: "How do you handle omnichannel returns (bought online, returned in store)?", a: "Order lookup by receipt/email/loyalty ID (no physical receipt for an online order), refund-to-original-tender logic, restock vs. write-off decision rules (item condition/category), and fraud controls (serial returners, receipt reuse). Mention \"returnless refund\" as an emerging cost-tradeoff for low-value items." },
  { area: "Order Management (OMS)", q: "What's the role of an OMS, and where does it sit relative to POS/Inventory?", a: "OMS is the orchestration layer — it decides where an order is fulfilled from (store vs. DC) using inventory and proximity/cost rules, manages order status across its lifecycle (placed → allocated → picked → shipped/picked-up → delivered), and is the system of record for omnichannel fulfillment. OMS sits \"above\" POS/Inventory — it consumes their data, it doesn't replace them." },
];

const CASE = [
  { q: "\"Design a self-checkout experience that reduces both fraud and customer friction.\"", a: <ol className="list-decimal space-y-1 pl-5"><li>Clarify goals/constraints (which matters more — shrink reduction or throughput? what's the current baseline?)</li><li>Segment the problem (high-risk SKUs vs. low-risk, repeat customers vs. new)</li><li>Propose a layered solution (risk-based verification, not blanket friction)</li><li>Define success metrics (shrink %, avg transaction time, NPS)</li><li>Call out trade-offs and a phased rollout/test plan (A/B by store)</li></ol> },
  { q: "\"A regional VP says SCO abandonment is up 20% after a new release. How do you respond?\"", a: "Don't jump to a fix — investigate first: is it isolated to certain stores/SKUs/payment types? Pull data (funnel drop-off by step), check recent release notes for the suspect change, talk to store associates for anecdotal signal, then decide rollback vs. hotfix vs. monitor. Demonstrates you don't panic-ship a fix without diagnosis." },
  { q: "\"How would you prioritize a backlog containing: a POS crash bug, a loyalty feature exec wants, and a compliance deadline for payments?\"", a: "Use a framework (RICE or a simple urgency/impact matrix) but explicitly state: compliance deadlines are usually non-negotiable (legal/regulatory risk), crash bugs affecting revenue/checkout typically beat feature requests, and executive asks need expectation-setting with data, not blind compliance. Show you can push back diplomatically." },
  { q: "\"How would you measure success for a new Endless Aisle rollout?\"", a: "Leading indicators: associate adoption rate, basket size lift, conversion on \"out of stock\" interactions. Lagging: incremental revenue per store, return rate of Endless Aisle orders, NPS delta. Always pair adoption metrics with a guardrail metric (e.g. associate time-per-transaction shouldn't blow up)." },
];

const AGILE = [
  { q: "How do you run product work in Agile/Scrum for store technology specifically?", a: "Mention the added complexity of hardware + store rollout cadences — software sprints can ship every 2 weeks, but store hardware/firmware rollouts often follow a slower, phased release train (pilot → regional → national) with change-management and training considerations. Backlog grooming has to account for store readiness, not just code readiness." },
  { q: "How do you handle a sprint where a dependency (e.g. a payment processor's sandbox) is unavailable?", a: "Identify blocked stories early in sprint planning, keep a buffer of unblocked stories ready to pull in, and escalate dependency risk to stakeholders rather than letting the team idle — classic Scrum Master + PM collaboration." },
  { q: "What Agile/Scrum or SAFe ceremonies have you run or contributed to as PM?", a: "Backlog grooming/refinement, sprint planning (priority + clarifying AC), sprint review/demo (bring in Store Ops stakeholders to validate), retro (process improvement), and for SAFe environments, PI planning across multiple scrum teams (e.g. POS team + Inventory team + Payments team coordinating a shared release)." },
];

const STAKEHOLDERS = [
  { q: "Engineering says a request will take 3 sprints; Store Ops needs it in 2 weeks for a holiday rollout. How do you handle it?", a: "Don't just split the difference — get to root cause: can scope be reduced to an MVP that meets the deadline with a fast-follow for the rest? Facilitate a trade-off conversation with both sides present, document the decision and risk accepted, and communicate clearly to leadership rather than letting engineering and ops negotiate without you." },
  { q: "How do you handle conflicting priorities between Merchandising and Engineering?", a: "Use data/KPIs as the tie-breaker where possible, translate each side's language to the other (business impact ↔ technical feasibility/cost), and if it's truly a judgment call, escalate with a clear recommendation rather than just presenting the conflict upward." },
  { q: "How do you communicate technical trade-offs to non-technical store operations stakeholders?", a: "Use analogies and business-impact framing rather than jargon — e.g. instead of \"we need to refactor the sync service,\" say \"we're fixing the part of the system that sometimes shows wrong stock counts, which should reduce customer complaints by X%.\"" },
];

const KPIS = [
  { q: "How would you define success metrics for a store technology enhancement, generally?", a: "Tie every initiative to: store operational efficiency, customer checkout experience, shrink/friction reduction, on-time delivery of enhancements, adoption of new capabilities. For any feature, define a leading metric (adoption/usage), a lagging metric (business outcome), and a guardrail metric (don't break something else)." },
  { q: "Give an example of a north star metric you'd propose for a self-checkout overhaul.", a: "Something like \"checkout time per item\" or \"SCO conversion rate (started → completed transactions)\" as north star, with shrink rate and NPS as guardrails — show you understand metrics can conflict and need balancing, not just maximizing one." },
];

const BEHAVIORAL = [
  "Tell me about a time you had to write a PRD with incomplete requirements. What did you do?",
  "Describe a time a feature you shipped didn't perform as expected. What did you do next?",
  "Tell me about a conflict with an engineering lead over scope or feasibility.",
  "Describe how you've used data to change a stakeholder's mind.",
  "Tell me about the most technically complex feature you've managed — how did you get up to speed?",
];

const ASK = [
  "How is the product org structured across POS, Inventory, Payments, and OMS — are these separate pods or one integrated team?",
  "What's the current state of online/offline sync reliability at POS/SCO, and is that an active pain point?",
  "How does the team currently balance hardware rollout cadence with software release cadence?",
  "What does the roadmap prioritization process look like when Store Ops, Merchandising, and Engineering disagree?",
  "Which of the systems listed (OMS, CRM/Loyalty, Payment processors) are vendor/COTS platforms vs. built in-house?",
];

const CHEATSHEET = [
  { area: "POS", what: "Core transaction + payment engine at register", risk: "Offline mode & price sync accuracy" },
  { area: "SCO", what: "Self-service checkout", risk: "Friction vs. shrink" },
  { area: "Inventory Mgmt", what: "Tracks stock across channels", risk: "Real-time sync vs. batch drift" },
  { area: "Loyalty", what: "Identifies customer, accrues/redeems points", risk: "Latency at checkout" },
  { area: "Promotions/Coupons", what: "Applies discounts", risk: "Stacking/conflict rules" },
  { area: "Payments", what: "Tender processing", risk: "PCI compliance scope" },
  { area: "BOPIS", what: "Online order, in-store pickup", risk: "OOS substitution handling" },
  { area: "SFS", what: "Store fulfills online orders", risk: "Associate labor impact, overselling" },
  { area: "Endless Aisle", what: "Sell SKUs not in-store", risk: "Network inventory visibility" },
  { area: "Store-to-Store Transfer", what: "Rebalance stock between stores", risk: "In-transit inventory state" },
  { area: "Returns/Exchanges", what: "Omnichannel returns", risk: "Fraud control vs. customer ease" },
  { area: "OMS", what: "Orchestrates fulfillment", risk: "Sits above POS/Inventory, not a replacement" },
];

function RetailPML2Guide() {
  const [tab, setTab] = useState<Tab>("foundations");

  return (
    <ContentDetail
      backTo="/resources"
      backLabel="Back to resources"
      eyebrow="Interview Prep · Retail Tech"
      title="PM L2 (Retail Store Tech) Interview Guide"
      description="Level 2 technical interview prep for Product Manager — Retail Store Technology. Domain depth (POS, SCO, Inventory, Loyalty, Payments, BOPIS, SFS, Endless Aisle, Transfers, Returns, Promotions, OMS), PM craft, Agile delivery, stakeholder management, and KPIs — with model answers you can adapt with your own examples."
      meta="Free · No sign-up · 9 sections"
    >
      <p className="text-sm leading-7 text-muted-foreground">
        Congrats on clearing L1. This round digs into your <strong className="text-foreground">domain depth</strong>, your{" "}
        <strong className="text-foreground">PM craft</strong> (PRDs/BRDs, user stories, acceptance criteria, roadmaps), and your{" "}
        <strong className="text-foreground">delivery rigor</strong> (Agile, KPIs, stakeholder management). For every answer below, swap in a real
        project of yours — interviewers at L2 are testing judgment and depth, not memorized definitions. Use the model answers as a skeleton, not a script.
      </p>

      {/* Tab nav */}
      <div className="-mx-1 mb-2 flex flex-wrap gap-2">
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
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {tab === "foundations" && (
        <DetailSection title="Core PM foundations, refreshed for retail">
          <div className="space-y-4">
            {FOUNDATIONS.map((item) => (
              <QA key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </DetailSection>
      )}

      {tab === "domain" && (
        <DetailSection title="Domain-specific technical deep-dives">
          <p className="mb-4 text-sm text-muted-foreground">
            This is where L2 typically differentiates candidates — expect deep dives into 2–3 of these areas based on your resume.
          </p>
          <div className="space-y-4">
            {DOMAIN.map((item, i) => (
              <div key={i} className="rounded-2xl border border-border bg-surface p-5">
                <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand">{item.area}</div>
                <h3 className="mb-2 font-display text-base font-semibold text-foreground">{item.q}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {tab === "case" && (
        <DetailSection title="Product sense / case-study style questions">
          <p className="mb-4 text-sm text-muted-foreground">These test how you think, not what you've memorized.</p>
          <div className="space-y-4">
            {CASE.map((item) => (
              <QA key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </DetailSection>
      )}

      {tab === "agile" && (
        <DetailSection title="Agile / delivery process questions">
          <div className="space-y-4">
            {AGILE.map((item) => (
              <QA key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </DetailSection>
      )}

      {tab === "stakeholders" && (
        <DetailSection title="Stakeholder management questions">
          <div className="space-y-4">
            {STAKEHOLDERS.map((item) => (
              <QA key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </DetailSection>
      )}

      {tab === "kpis" && (
        <DetailSection title="KPIs / success measures questions">
          <div className="space-y-4">
            {KPIS.map((item) => (
              <QA key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </DetailSection>
      )}

      {tab === "behavioral" && (
        <DetailSection title="Behavioral / situational questions (still likely at L2)">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
            {BEHAVIORAL.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl border border-[oklch(0.88_0.05_210)] bg-[oklch(0.97_0.02_210)] px-4 py-3 text-sm leading-relaxed text-[oklch(0.45_0.08_210)]">
            <strong>Framework for all of these:</strong> STAR (Situation, Task, Action, Result) + a closing reflection
            ("what I'd do differently / what I learned"). Interviewers notice candidates who reflect, not just narrate.
          </div>
        </DetailSection>
      )}

      {tab === "ask" && (
        <DetailSection title="Smart questions to ask the interviewer">
          <p className="mb-4 text-sm text-muted-foreground">Asking sharp questions signals seniority. A few tailored to this role:</p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
            {ASK.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </DetailSection>
      )}

      {tab === "cheatsheet" && (
        <DetailSection title="Quick-reference cheat sheet (day-of review)">
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Area</th>
                  <th className="px-4 py-3">What it does</th>
                  <th className="px-4 py-3">Top risk/trade-off</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {CHEATSHEET.map((row) => (
                  <tr key={row.area} className="bg-surface">
                    <td className="px-4 py-3 font-medium text-foreground">{row.area}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.what}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-sm font-medium text-foreground">
            Good luck — go in ready to trade-off talk, not textbook definitions. That's what separates an L2 pass from a "good but junior" rating.
          </p>
        </DetailSection>
      )}

      <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
        <div className="text-xs font-semibold uppercase tracking-widest text-brand">How to use this guide</div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          For every answer, swap in a real project of yours. Interviewers at L2 are testing judgment and depth, not memorized definitions —
          use the model answers as a skeleton, not a script.
        </p>
        <Link to="/resources" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
          Back to resources
        </Link>
      </div>
    </ContentDetail>
  );
}
