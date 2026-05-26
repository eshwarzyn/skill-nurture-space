import { cn } from "@/lib/utils";

export function Section({
  eyebrow,
  title,
  description,
  className,
  children,
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20", className)}>
      <div className="mb-10 max-w-2xl">
        {eyebrow && (
          <div className="mb-3 inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            {eyebrow}
          </div>
        )}
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {description && (
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-border bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        {eyebrow && (
          <div className="mb-3 inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">{description}</p>
        )}
      </div>
    </div>
  );
}
