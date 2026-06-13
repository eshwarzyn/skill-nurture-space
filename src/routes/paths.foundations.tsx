import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock, Layers, PlayCircle } from "lucide-react";
import { ContentDetail, DetailSection, Takeaway } from "@/components/content-detail";

const modules = [
  ["The product manager's real job", "Set outcomes, create clarity, and help teams make better decisions."],
  ["Customers and problems", "Turn interviews, support signals, and behavior into useful problem statements."],
  ["Discovery that fits the week", "Use lightweight research and experiments before committing a roadmap."],
  ["Strategy and prioritization", "Connect company direction to explicit product bets and trade-offs."],
  ["Writing and alignment", "Create briefs, PRDs, and decision notes people will actually read."],
  ["Working with design and engineering", "Build trust through shared context, constraints, and ownership."],
  ["Metrics and learning", "Choose signals that reveal whether customer behavior is changing."],
  ["Your first 30-day operating rhythm", "Put the tools together in a repeatable weekly practice."],
];

export const Route = createFileRoute("/paths/foundations")({
  head: () => ({ meta: [{ title: "Product Management Foundations — ProductPath" }, { name: "description", content: "A practical 8-module learning path covering the essential craft and operating rhythm of modern product managers." }] }),
  component: FoundationsPath,
});

function FoundationsPath() {
  return (
    <ContentDetail backTo="/paths" backLabel="Back to learning paths" eyebrow="Beginner · Start here" title="Product Management Foundations" description="Build the mental models, vocabulary, and day-to-day rituals you need to contribute confidently on a modern product team." meta="8 modules · 12 hours · Self-paced">
      <DetailSection title="The foundation for work that matters">
        <p>This path is designed for new PMs, aspiring product managers, and cross-functional partners who want a clear view of how strong teams discover, decide, and deliver.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2"><Takeaway>Frame customer problems before proposing features.</Takeaway><Takeaway>Turn strategy into focused product bets.</Takeaway><Takeaway>Collaborate with design and engineering.</Takeaway><Takeaway>Measure outcomes and learn after launch.</Takeaway></ul>
      </DetailSection>
      <DetailSection title="Your 8-module roadmap">
        <ol className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface">
          {modules.map(([title, copy], index) => <li key={title} className="flex gap-4 p-5 sm:p-6"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary font-display text-sm font-semibold text-brand">{index + 1}</span><div><h3 className="font-display font-semibold text-foreground">{title}</h3><p className="mt-1 text-sm leading-6">{copy}</p></div></li>)}
        </ol>
      </DetailSection>
      <DetailSection title="Your capstone">
        <div className="rounded-3xl border border-border bg-surface p-7 shadow-[var(--shadow-soft)]"><div className="flex items-center gap-2 text-sm font-semibold text-brand"><BookOpen className="h-4 w-4" /> Product brief</div><p className="mt-3">Finish the path by turning a real customer problem into a concise brief with evidence, outcomes, constraints, and a learning plan.</p></div>
      </DetailSection>
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]"><div className="text-xs font-semibold uppercase tracking-widest text-brand">Path summary</div><div className="mt-5 space-y-3 text-sm"><p className="flex items-center gap-2"><Layers className="h-4 w-4 text-brand" /> 8 guided modules</p><p className="flex items-center gap-2"><Clock className="h-4 w-4 text-brand" /> 12 hours total</p><p className="flex items-center gap-2"><PlayCircle className="h-4 w-4 text-brand" /> Video, templates, exercises</p></div><Link to="/courses" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background">Start with a course <ArrowRight className="h-4 w-4" /></Link></div>
    </ContentDetail>
  );
}