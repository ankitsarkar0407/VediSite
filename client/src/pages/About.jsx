const OBJECTIVES = [
  {
    title: "Education",
    items: [
      "Scholarships for meritorious and needy girls.",
      "Distribution of books, uniforms, and learning materials.",
      "Digital literacy and access to technology.",
      "Career counseling and competitive examination guidance.",
    ],
  },
  {
    title: "Health & Nutrition",
    items: [
      "Health camps and medical assistance.",
      "Nutritional support programs.",
      "Menstrual hygiene awareness.",
      "Mental health and counseling initiatives.",
    ],
  },
  {
    title: "Skill Development",
    items: [
      "Computer education.",
      "Communication and spoken English.",
      "Vocational and entrepreneurial training.",
      "Financial literacy programs.",
    ],
  },
  {
    title: "Leadership Development",
    items: [
      "Mentorship by accomplished professionals.",
      "Public speaking and personality development.",
      "Leadership camps and workshops.",
    ],
  },
  {
    title: "Sports & Culture",
    items: [
      "Encouraging participation in sports.",
      "Supporting artistic and cultural talents.",
      "Recognition of outstanding achievements.",
    ],
  },
];

export default function About() {
  return (
    <>
      <section className="section container narrow">
        <div className="page-head">
          <h1>About VEDI Foundation</h1>
          <p className="muted">
            Inspired by Vedi — a symbol of hope, learning, and new beginnings.
          </p>
        </div>

        <div className="founder-note">
          <h2>A Note from the Founder</h2>
          <p>
            The VEDI Foundation is inspired by my beloved granddaughter, Vedi. As
            I watch her embark upon life’s journey, I am reminded that countless
            girl children are deprived of opportunities due to circumstances
            beyond their control.
          </p>
          <p>
            Through this foundation, we aspire to extend the love, care,
            education, and encouragement that every child deserves. Our mission is
            not merely to support girls but to help them discover their inherent
            strength, dignity, and limitless potential.
          </p>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-head centered">
            <h2>Our Core Values</h2>
            <p className="muted">Everything we do flows from these four pillars.</p>
          </div>
          <div className="values-grid">
            {[
              { letter: "V", title: "Values", text: "Instilling integrity, compassion, and responsibility." },
              { letter: "E", title: "Education", text: "Promoting quality learning and lifelong knowledge." },
              { letter: "D", title: "Dignity", text: "Ensuring respect, equality, and self-worth." },
              { letter: "I", title: "Inclusion", text: "Creating opportunities irrespective of social or economic background." },
            ].map((v) => (
              <div className="value-card" key={v.letter}>
                <span className="value-letter">{v.letter}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head centered">
          <h2>Our Objectives</h2>
          <p className="muted">
            Five focus areas that shape a girl’s complete journey.
          </p>
        </div>
        <div className="objectives-grid">
          {OBJECTIVES.map((o) => (
            <div className="objective-card" key={o.title}>
              <h3>{o.title}</h3>
              <ul>
                {o.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
