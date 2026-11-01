const ROADMAP = [
  {
    year: "Year 1",
    goal: "Foundation & first cohort",
    items: [
      "Registration of Trust / Foundation.",
      "Support 25–50 girl students.",
      "Conduct health and educational camps.",
    ],
  },
  {
    year: "Year 2",
    goal: "Scholarships & partnerships",
    items: [
      "Launch scholarship and mentorship programs.",
      "Build partnerships with schools and NGOs.",
    ],
  },
  {
    year: "Year 3",
    goal: "Reaching more districts",
    items: [
      "Expand to multiple districts.",
      "Introduce digital learning initiatives.",
    ],
  },
  {
    year: "Year 4",
    goal: "A home for learning",
    items: ["Establish a dedicated VEDI Learning Centre."],
  },
  {
    year: "Year 5",
    goal: "A national model",
    items: [
      "Become a recognized model for girl-child empowerment.",
      "Impact at least 1,000 girls directly.",
    ],
  },
];

export default function Roadmap() {
  return (
    <section className="section container">
      <div className="page-head centered">
        <h1>Our Five-Year Roadmap</h1>
        <p className="muted">
          A clear path from first steps to lasting, large-scale impact.
        </p>
      </div>

      <ol className="timeline">
        {ROADMAP.map((r) => (
          <li className="timeline-item" key={r.year}>
            <div className="timeline-marker" aria-hidden="true" />
            <div className="timeline-content">
              <div className="timeline-head">
                <span className="timeline-year">{r.year}</span>
                <span className="timeline-goal">{r.goal}</span>
              </div>
              <ul>
                {r.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
