import Link from "next/link";

const systems = [
  {
    title: "The Insight",
    body: "Publication, interviews, student essays, research papers, podcast operations, editorial review, and expert outreach.",
  },
  {
    title: "InsightLRN",
    body: "Flashcards, notes, library workflows, highlighted-text-to-card systems, spaced retrieval, and IB-aligned study routines.",
  },
  {
    title: "Insight Create",
    body: "A creation layer for articles, podcasts, project pages, student media, and repeatable publishing templates.",
  },
  {
    title: "Builder workflow",
    body: "GitHub, Vercel, Codex implementation plans, project branches, issue lists, launch checklists, authentication, and database planning.",
  },
  {
    title: "Academic systems",
    body: "IB Economics, Psychology, English, French, Physics, and Math systems: daily practice, syllabus mapping, and retrieval banks.",
  },
  {
    title: "Research systems",
    body: "Zotero, methodology packs, source maps, data-cleaning workflows, policy analysis, and economics model documentation.",
  },
];

export default function ProjectsPage() {
  return (
    <main className="page-shell">
      <nav className="page-nav">
        <Link href="/">← OS</Link>
        <Link href="/about">About</Link>
      </nav>

      <section className="page-hero">
        <p className="kicker">Toolkit</p>
        <h1>Systems behind the work</h1>
        <p>
          This page is the expandable layer behind the homepage: the operating systems, workflows,
          templates, and project infrastructure that support The Insight, InsightLRN, Insight Create,
          school execution, and public work.
        </p>
      </section>

      <section className="project-stack">
        {systems.map((system) => (
          <article key={system.title}>
            <h3>{system.title}</h3>
            <p>{system.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
