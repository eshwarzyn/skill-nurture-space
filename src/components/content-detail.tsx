import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export function ContentDetail({
  backTo,
  backLabel,
  eyebrow,
  title,
  description,
  meta,
  children,
  aside,
}: {
  backTo: "/paths" | "/articles" | "/resources";
  backLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border bg-surface-muted">
        <div className="pointer-events-none absolute inset-0 opacity-80" style={{ background: "var(--gradient-hero)" }} aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <Link to={backTo} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {backLabel}
          </Link>
          <div className="mt-10 max-w-4xl">
            <div className="inline-flex rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-brand shadow-[var(--shadow-soft)]">{eyebrow}</div>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{description}</p>
            <p className="mt-5 text-sm font-medium text-muted-foreground">{meta}</p>
          </div>
        </div>
      </section>

      <section className={`mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-20 ${aside ? "lg:grid-cols-[minmax(0,1fr)_320px]" : "lg:max-w-5xl"}`}>
        <div className="min-w-0 space-y-12">{children}</div>
        {aside && <aside className="lg:sticky lg:top-24 lg:self-start">{aside}</aside>}
      </section>
    </div>
  );
}

export function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <div className="mt-5 text-base leading-8 text-muted-foreground">{children}</div>
    </section>
  );
}

export function Takeaway({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" />
      <span>{children}</span>
    </li>
  );
}