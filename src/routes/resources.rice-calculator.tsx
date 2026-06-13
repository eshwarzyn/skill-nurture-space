import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Calculator, CheckCircle2, Gauge, Users } from "lucide-react";
import { ContentDetail, DetailSection } from "@/components/content-detail";

const examples = [{ name: "Guided onboarding", reach: "1,200", impact: "2", confidence: "80%", effort: "4", score: "480" }, { name: "CSV export", reach: "400", impact: "1", confidence: "100%", effort: "2", score: "200" }, { name: "Team templates", reach: "900", impact: "1.5", confidence: "70%", effort: "5", score: "189" }];

export const Route = createFileRoute("/resources/rice-calculator")({
  head: () => ({ meta: [{ title: "RICE Calculator — ProductPath" }, { name: "description", content: "Learn the RICE prioritization method and compare initiatives using reach, impact, confidence, and effort." }] }),
  component: RiceCalculator,
});

function RiceCalculator() {
  return (
    <ContentDetail backTo="/resources" backLabel="Back to resources" eyebrow="Tool · Prioritization" title="RICE Calculator" description="Score and rank initiatives quickly — while keeping judgment, evidence, and trade-offs visible." meta="Free tool · 5-minute setup · Includes worked example">
      <DetailSection title="The formula">
        <div className="rounded-3xl border border-border bg-foreground p-7 text-background shadow-[var(--shadow-card)]"><div className="text-sm text-background/70">RICE score</div><div className="mt-3 font-display text-2xl font-semibold sm:text-3xl">(Reach × Impact × Confidence) ÷ Effort</div></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">{[[Users,"Reach","People affected in a defined period."],[BarChart3,"Impact","Expected contribution per person."],[Gauge,"Confidence","How reliable your estimates are."],[Calculator,"Effort","Person-months required to deliver."]].map(([Icon,title,copy])=>{const ItemIcon=Icon;return <div key={String(title)} className="rounded-2xl border border-border bg-surface p-5"><ItemIcon className="h-5 w-5 text-brand"/><h3 className="mt-3 font-display font-semibold text-foreground">{String(title)}</h3><p className="mt-1 text-sm leading-6">{String(copy)}</p></div>})}</div>
      </DetailSection>
      <DetailSection title="Worked example">
        <div className="overflow-x-auto rounded-3xl border border-border bg-surface"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-surface-muted text-xs uppercase tracking-wider text-muted-foreground"><tr>{["Initiative","Reach","Impact","Confidence","Effort","Score"].map(h=><th key={h} className="px-5 py-4 font-semibold">{h}</th>)}</tr></thead><tbody className="divide-y divide-border">{examples.map(row=><tr key={row.name}>{Object.values(row).map((value,index)=><td key={value} className={`px-5 py-4 ${index===0||index===5?"font-semibold text-foreground":""}`}>{value}</td>)}</tr>)}</tbody></table></div>
      </DetailSection>
      <DetailSection title="Use the score responsibly"><div className="rounded-3xl border border-border bg-secondary p-6"><ul className="space-y-4">{["Define one consistent reach window before scoring.","Write the evidence behind every confidence percentage.","Compare scores within the same strategic context.","Treat the ranking as a conversation starter, not an automatic roadmap."].map(item=><li key={item} className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand"/><span>{item}</span></li>)}</ul></div></DetailSection>
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]"><div className="text-xs font-semibold uppercase tracking-widest text-brand">Next step</div><h3 className="mt-3 font-display text-xl font-semibold">Prioritization frameworks</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Learn when RICE helps, when it misleads, and what to use instead.</p><Link to="/courses/$slug" params={{ slug: "prioritization" }} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">View course <ArrowRight className="h-4 w-4" /></Link></div>
    </ContentDetail>
  );
}