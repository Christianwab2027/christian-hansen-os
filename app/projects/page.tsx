import Link from "next/link";

const overviewPoints = [
  "Publishing systems tuned for student work and long-form output.",
  "Learning workflows that combine flashcards, notes, and review cycles.",
  "Creative execution for pages, launch content, and product infrastructure.",
  "Operational workflows built for speed, clarity, and reuse.",
];

const stats = [
  { label: "Role", value: "Systems stack" },
  { label: "Live", value: "Yes" },
  { label: "Scope", value: "Publishing + learning" },
];

export default function ProjectsPage() {
  return (
    <main className="detailPageShell detailPageShell-expanded">
      <div className="detailWindow">
        <Link href="/" className="backLink detailBackLink">
          ← Back to OS
        </Link>
        <div className="detailWindowBody">
          <section className="detailWindowMain">
            <p className="detailCaption">TOOLKIT</p>
            <h1>The systems behind the ecosystem.</h1>
            <p className="detailLead">
              A live operations layer for The Insight, InsightLRN, Insight Create, and related publishing work.
              These are the tools, workflows, and execution systems that keep the ecosystem moving.
            </p>

            <div className="detailStats">
              {stats.map((stat) => (
                <div key={stat.label} className="detailStatItem">
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
          </section>

          <aside className="detailSidebar">
            <div className="overviewHeader">
              <span>OVERVIEW</span>
              <span>ACTIVE</span>
            </div>
            <ul className="overviewList">
              {overviewPoints.map((point) => (
                <li key={point} className="overviewListItem">
                  <span className="overviewBullet" />
                  <p>{point}</p>
                </li>
              ))}
            </ul>
            <div className="overviewFooter">Systems, publishing, and learning workflows active across the ecosystem.</div>
          </aside>
        </div>

        <div className="detailWindowFooter">
          <p>
            This layer intentionally blends product systems, editorial workflows, and learning infrastructure.
            Everything is built to support launches, student work, and repeatable publishing operations.
          </p>
          <a href="/" className="detailActionButton">
            Return to OS
          </a>
        </div>
      </div>
    </main>
  );
}
