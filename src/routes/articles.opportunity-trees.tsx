import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, GitBranch, Lightbulb, Target } from "lucide-react";
import { ContentDetail, DetailSection, Takeaway } from "@/components/content-detail";

export const Route = createFileRoute("/articles/opportunity-trees")({
  head: () => ({ meta: [{ title: "Opportunity Solution Trees, Simplified — ProductPath" }, { name: "description", content: "A practical walkthrough for mapping outcomes, customer opportunities, solutions, and experiments with your product team." }] }),
  component: OpportunityTreesArticle,
});

function OpportunityTreesArticle() {
  return (
    <ContentDetail backTo="/articles" backLabel="Back to articles" eyebrow="Discovery" title="Opportunity solution trees, simplified" description="A practical walkthrough you can run tomorrow — without turning discovery into a diagramming exercise." meta="Tom Rivera · 8 min read · Updated June 2026">
      <DetailSection title="Start with the decision, not the diagram">
        <p>An opportunity solution tree is a visual map connecting the outcome your team owns to customer needs, possible solutions, and the experiments that reduce uncertainty. Its value is not the tree itself. Its value is making your team's reasoning visible.</p>
        <blockquote className="mt-6 border-l-4 border-brand bg-secondary px-6 py-5 font-display text-xl font-medium leading-relaxed text-foreground">A good tree shows where the team has evidence, where it is guessing, and what it should learn next.</blockquote>
      </DetailSection>
      <DetailSection title="The four levels">
        <div className="grid gap-3 sm:grid-cols-2">{[[Target,"1. Outcome","A measurable customer or business behavior the team can influence."],[GitBranch,"2. Opportunities","Customer needs, pain points, and desires discovered through research."],[Lightbulb,"3. Solutions","Different ways you could address one opportunity — not a committed roadmap."],[Bookmark,"4. Experiments","The smallest tests that expose whether the key assumptions hold."]].map(([Icon,title,copy]) => { const ItemIcon = Icon; return <div key={String(title)} className="rounded-2xl border border-border bg-surface p-5"><ItemIcon className="h-5 w-5 text-brand" /><h3 className="mt-3 font-display font-semibold text-foreground">{String(title)}</h3><p className="mt-1 text-sm leading-6">{String(copy)}</p></div>; })}</div>
      </DetailSection>
      <DetailSection title="Run this 45-minute workshop tomorrow">
        <ol className="space-y-5">{["Write one outcome at the top. Make it measurable and time-bound.","Add opportunities using customer language from recent interviews or support conversations.","Choose one opportunity based on evidence and strategic relevance.","Generate at least three genuinely different solutions before discussing feasibility.","Name the riskiest assumption for each solution and design a fast test."].map((step,index)=><li key={step} className="flex gap-4"><span className="font-display text-xl font-semibold text-brand">0{index+1}</span><p>{step}</p></li>)}</ol>
      </DetailSection>
      <DetailSection title="A quick quality check"><ul className="space-y-3"><Takeaway>The outcome describes behavior, not an output.</Takeaway><Takeaway>Opportunities use customer language, not feature ideas.</Takeaway><Takeaway>More than one solution exists for the chosen opportunity.</Takeaway><Takeaway>Every experiment tests a named assumption.</Takeaway></ul></DetailSection>
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]"><div className="text-xs font-semibold uppercase tracking-widest text-brand">Keep learning</div><h3 className="mt-3 font-display text-xl font-semibold">Continuous Product Discovery</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Turn weekly customer conversations into focused opportunities and lean experiments.</p><Link to="/paths" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Explore learning path <ArrowRight className="h-4 w-4" /></Link></div>
    </ContentDetail>
  );
}