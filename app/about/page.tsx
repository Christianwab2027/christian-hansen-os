import Link from "next/link";

const overviewPoints = [
  "Building public student publishing systems from first principles.",
  "Designing academic workflows, study tools, and writing pipelines.",
  "Publishing essays, research, interviews, and media with clarity.",
  "Running an ecosystem, not a simple portfolio of isolated projects.",
];

const stats = [
  { label: "Role", value: "Student builder" },
  { label: "Focus", value: "Publishing systems" },
  { label: "Since", value: "2023" },
];

export default function AboutPage() {
  return (
    <main className="detailPageShell detailPageShell-expanded">
      <div className="detailWindow">
        <Link href="/" className="backLink detailBackLink">
          ← Back to OS
        </Link>
        <div className="detailWindowBody">
          <section className="detailWindowMain">
            <p className="detailCaption">ABOUT</p>
            <h1>Christian Hansen</h1>
            <p className="detailLead">
              A student designer and operator of publishing, learning, and media systems.
              This page is a structured view of the people and processes behind the ecosystem.
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
            <div className="overviewFooter">Student ecosystem · Active work in publishing and learning systems</div>
          </aside>
        </div>

        <div className="detailWindowFooter">
          <p>
            Christian builds with a focus on durability and public accountability.
            Every system is designed to be usable by students, to support performance,
            and to scale without losing editorial focus.
          </p>
          <a href="mailto:27christianh@wab.edu" className="detailActionButton">
            Contact Christian
          </a>
        </div>
      </div>
    </main>
  );
}
