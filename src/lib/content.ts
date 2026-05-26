export type Level = "Beginner" | "Intermediate" | "Advanced";

export type Path = {
  slug: string;
  title: string;
  description: string;
  level: Level;
  hours: number;
  modules: number;
  tag: string;
};

export type Course = {
  slug: string;
  title: string;
  description: string;
  level: Level;
  duration: string;
  category: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  author: string;
};

export type Resource = {
  title: string;
  description: string;
  type: "Template" | "Framework" | "Checklist" | "Book" | "Tool";
  href: string;
};

export const paths: Path[] = [
  {
    slug: "foundations",
    title: "Product Management Foundations",
    description: "The mental models, vocabulary, and day-to-day rituals of modern PMs.",
    level: "Beginner",
    hours: 12,
    modules: 8,
    tag: "Start here",
  },
  {
    slug: "discovery",
    title: "Continuous Product Discovery",
    description: "Interview users weekly, map opportunities, and run lean experiments.",
    level: "Intermediate",
    hours: 9,
    modules: 6,
    tag: "Most popular",
  },
  {
    slug: "strategy",
    title: "Product Strategy & Vision",
    description: "From insight to bets — frame strategy that teams actually follow.",
    level: "Advanced",
    hours: 10,
    modules: 7,
    tag: "Leadership",
  },
  {
    slug: "analytics",
    title: "Data & Product Analytics",
    description: "Metric trees, north stars, and shipping with measurable impact.",
    level: "Intermediate",
    hours: 8,
    modules: 6,
    tag: "Data",
  },
  {
    slug: "ai-pm",
    title: "AI Product Management",
    description: "Build with LLMs — eval loops, prompts, and AI-native UX.",
    level: "Intermediate",
    hours: 7,
    modules: 5,
    tag: "New",
  },
  {
    slug: "growth",
    title: "Growth for Product Managers",
    description: "Activation, retention, and pricing — without dark patterns.",
    level: "Advanced",
    hours: 9,
    modules: 6,
    tag: "Growth",
  },
];

export const courses: Course[] = [
  { slug: "writing-prds", title: "Writing PRDs that ship", description: "Crisp specs your engineers will love.", level: "Beginner", duration: "1h 40m", category: "Craft" },
  { slug: "user-interviews", title: "User interviews in practice", description: "Run interviews that surface real problems.", level: "Beginner", duration: "2h 10m", category: "Discovery" },
  { slug: "roadmaps", title: "Outcome-based roadmaps", description: "Replace feature lists with bets and outcomes.", level: "Intermediate", duration: "1h 20m", category: "Strategy" },
  { slug: "metrics", title: "Choosing the right metrics", description: "North star, input metrics, and guardrails.", level: "Intermediate", duration: "2h 00m", category: "Analytics" },
  { slug: "experiments", title: "A/B testing fundamentals", description: "Design, power, and interpret experiments.", level: "Intermediate", duration: "2h 30m", category: "Analytics" },
  { slug: "stakeholders", title: "Working with stakeholders", description: "Align execs, sales, and engineering.", level: "Intermediate", duration: "1h 10m", category: "Leadership" },
  { slug: "prioritization", title: "Prioritization frameworks", description: "RICE, ICE, Kano — when to use what.", level: "Beginner", duration: "55m", category: "Craft" },
  { slug: "ai-evals", title: "Designing AI evals", description: "Measure quality of LLM features.", level: "Advanced", duration: "1h 50m", category: "AI" },
  { slug: "pricing", title: "Pricing & packaging", description: "Tiering, value metrics, and willingness to pay.", level: "Advanced", duration: "2h 15m", category: "Growth" },
];

export const articles: Article[] = [
  { slug: "what-great-pms-do", title: "What great PMs actually do all day", excerpt: "It's less Jira than you'd think — and more listening.", readTime: "6 min", category: "Craft", author: "Maya Chen" },
  { slug: "opportunity-trees", title: "Opportunity solution trees, simplified", excerpt: "A practical walkthrough you can run tomorrow.", readTime: "8 min", category: "Discovery", author: "Tom Rivera" },
  { slug: "north-star", title: "How to pick a north star metric", excerpt: "And the traps to avoid when your team rallies around it.", readTime: "7 min", category: "Analytics", author: "Priya Shah" },
  { slug: "writing-strategy", title: "Writing a strategy doc people read", excerpt: "Structure, length, and the test for whether it's working.", readTime: "10 min", category: "Strategy", author: "Jonas Weber" },
  { slug: "ai-pm-shift", title: "How AI is changing the PM role", excerpt: "Skills to double down on — and what to let go.", readTime: "9 min", category: "AI", author: "Maya Chen" },
  { slug: "stakeholder-trust", title: "Building trust with engineering", excerpt: "Small habits that compound into a great partnership.", readTime: "5 min", category: "Leadership", author: "Tom Rivera" },
];

export const resources: Resource[] = [
  { title: "PRD Template", description: "Lightweight one-pager that scales.", type: "Template", href: "#" },
  { title: "User Interview Script", description: "Question bank + do-not-do list.", type: "Template", href: "#" },
  { title: "RICE Calculator", description: "Score and rank initiatives quickly.", type: "Tool", href: "#" },
  { title: "Opportunity Solution Tree", description: "Teresa Torres' canvas, ready to fill in.", type: "Framework", href: "#" },
  { title: "Launch Readiness Checklist", description: "Don't ship without this.", type: "Checklist", href: "#" },
  { title: "Inspired — Marty Cagan", description: "The classic on building products customers love.", type: "Book", href: "#" },
  { title: "Continuous Discovery Habits", description: "Teresa Torres' essential read.", type: "Book", href: "#" },
  { title: "North Star Playbook", description: "Amplitude's guide to choosing metrics.", type: "Framework", href: "#" },
];
