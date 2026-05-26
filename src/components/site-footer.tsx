import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-lg font-semibold">ProductPath</div>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            A modern learning platform for product managers — paths, courses, and writing trusted
            by builders worldwide.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold">Learn</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/paths" className="hover:text-foreground">Learning paths</Link></li>
            <li><Link to="/courses" className="hover:text-foreground">Courses</Link></li>
            <li><Link to="/articles" className="hover:text-foreground">Articles</Link></li>
            <li><Link to="/resources" className="hover:text-foreground">Resources</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} ProductPath. Built for product people.
        </div>
      </div>
    </footer>
  );
}
