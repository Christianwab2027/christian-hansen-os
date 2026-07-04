import Link from "next/link";

const profile = [
  ["Name", "Christian Martin Hansen"],
  ["Current frame", "IB student, founder of The Insight, and builder of education/media tools."],
  ["Main platform", "The Insight — student essays, research papers, articles, interviews, and podcasts."],
  ["Product direction", "InsightLRN and Insight Create: tools for learning, writing, publishing, and project execution."],
];

const projects = [
  {
    title: "The Insight",
    body: "A student-led publication and podcast platform built to make serious student thinking visible. It combines essays, articles, research, expert interviews, and student voices into one public intellectual archive.",
  },
  {
    title: "InsightLRN",
    body: "A learning system for flashcards, notes, libraries, highlighted passages, and structured retrieval. The aim is to turn schoolwork into a durable knowledge system rather than scattered revision.",
  },
  {
    title: "Insight Create",
    body: "A builder layer for turning ideas into polished outputs: articles, podcasts, research pages, media projects, and reusable publishing systems.",
  },
  {
    title: "Research and economics",
    body: "Current interests include policy design, negative externalities, data-centre emissions, green industrial policy, institutional incentives, and the economics of technological infrastructure.",
  },
];

export default function AboutPage() {
  return (
    <main className="page-shell">
      <nav className="page-nav">
        <Link href="/">← OS</Link>
        <a href="https://www.instagram.com/christianhansen_7/" target="_blank" rel="noreferrer">
          Instagram
        </a>
      </nav>

      <section className="page-hero">
        <p className="kicker">Full about page</p>
        <h1>Christian Martin Hansen</h1>
        <p>
          I build platforms for student thinking, learning, publishing, and expert conversation. The
          current center of that work is The Insight: a student-led publication and podcast platform
          that treats school-level ambition as the beginning of serious public work, not as a side
          activity.
        </p>
      </section>

      <section className="profile-grid">
        {profile.map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <p>{value}</p>
          </article>
        ))}
      </section>

      <section className="page-section emphasis-section">
        <p className="kicker">Operating thesis</p>
        <h2>Build public intellectual infrastructure early.</h2>
        <p>
          The Insight is a publishing platform, but it is also a training system: editorial standards,
          interview preparation, expert outreach, public writing, technical execution, and a growing
          archive of student work. InsightLRN and Insight Create extend that same logic into learning
          tools and creation workflows.
        </p>
      </section>

      <section className="project-stack">
        {projects.map((project) => (
          <article key={project.title}>
            <h3>{project.title}</h3>
            <p>{project.body}</p>
          </article>
        ))}
      </section>

      <section className="page-section compact-section">
        <p className="kicker">Contact</p>
        <h2>For podcast guests, student publishing, university conversations, collaborations, and build projects.</h2>
        <div className="cta-row">
          <a href="mailto:27christianh@wab.edu">Email</a>
          <a href="https://www.instagram.com/christianhansen_7/" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://www.linkedin.com/in/REPLACE-WITH-YOUR-LINKEDIN-SLUG/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}
