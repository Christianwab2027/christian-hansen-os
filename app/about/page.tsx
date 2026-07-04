import Link from "next/link";

const sections = [
  {
    title: "Christian Hansen",
    body: "Christian Hansen is an IB student, founder of The Insight, and builder of learning and media tools designed to make serious student work public, durable, and usable.",
  },
  {
    title: "The Insight",
    body: "The Insight publishes student essays, research, articles, interviews, and conversations. It is the public publishing layer of the ecosystem.",
  },
  {
    title: "InsightLRN",
    body: "InsightLRN focuses on tools for learning: flashcards, notes, library systems, study workflows, and academic retrieval systems.",
  },
  {
    title: "Insight Create",
    body: "Insight Create supports creative and project infrastructure: building pages, producing media, refining systems, and turning ideas into finished outputs.",
  },
];

export default function AboutPage() {
  return (
    <main className="detailPageShell">
      <div className="detailPanel">
        <Link href="/" className="backLink">
          ← Back to OS
        </Link>

        <header className="detailHeader">
          <p className="detailEyebrow">About</p>
          <h1>Builder of student publishing, learning systems, and public work.</h1>
          <p className="detailLead">
            Christian works across student publishing, research, education technology,
            interviews, podcasts, and academic systems. The goal is not a personal
            portfolio. The goal is an ecosystem for writing, learning, and building.
          </p>
        </header>

        <section className="detailGrid">
          {sections.map((section) => (
            <article key={section.title} className="detailCard">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
