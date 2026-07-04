import Link from "next/link";

const systems = [
  {
    title: "The Insight",
    body: "Student publishing, essays, research, interviews, editorial systems, and public-facing articles.",
  },
  {
    title: "InsightLRN",
    body: "Flashcards, notes, library tools, study workflows, and systems for building long-term academic retention.",
  },
  {
    title: "Insight Create",
    body: "Creative and technical infrastructure for media, product work, pages, launches, and reusable build systems.",
  },
  {
    title: "Articles and publishing",
    body: "Writing pipelines, editorial review, distribution, archives, and structured publishing workflows.",
  },
  {
    title: "Podcasts and interviews",
    body: "Guest research, outreach, recording flow, questions, production systems, and public conversation formats.",
  },
  {
    title: "Learning systems",
    body: "Study architecture for IB work, retrieval practice, syllabus mapping, and durable note-taking.",
  },
  {
    title: "Builder workflows",
    body: "Codex, Git, Vercel, project planning, iteration loops, and execution systems behind the public-facing work.",
  },
];

export default function ProjectsPage() {
  return (
    <main className="detailPageShell">
      <div className="detailPanel">
        <Link href="/" className="backLink">
          ← Back to OS
        </Link>

        <header className="detailHeader">
          <p className="detailEyebrow">Toolkit</p>
          <h1>The systems behind the ecosystem.</h1>
          <p className="detailLead">
            This is the expanded layer behind the homepage launchpad: the products,
            workflows, publishing structure, and operating systems that support The
            Insight, InsightLRN, Insight Create, and Christian’s broader work.
          </p>
        </header>

        <section className="detailGrid">
          {systems.map((system) => (
            <article key={system.title} className="detailCard">
              <h2>{system.title}</h2>
              <p>{system.body}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
