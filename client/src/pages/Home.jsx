import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import ProgramCard from "../components/ProgramCard.jsx";

const CORE_VALUES = [
  { letter: "V", title: "Values", text: "Instilling integrity, compassion, and responsibility." },
  { letter: "E", title: "Education", text: "Promoting quality learning and lifelong knowledge." },
  { letter: "D", title: "Dignity", text: "Ensuring respect, equality, and self-worth." },
  { letter: "I", title: "Inclusion", text: "Creating opportunities irrespective of social or economic background." },
];

const MOTTOS = [
  "Educate Her. Empower Her. Elevate Society.",
  "Every Girl, Every Dream, Every Opportunity.",
  "Lighting Minds, Transforming Lives.",
  "Empowered Girls, Enduring Change.",
];

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api
      .listPrograms()
      .then((p) => setFeatured(p.slice(0, 3)))
      .catch(() => setFeatured([]));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <span className="hero-badge">A Symbol of Hope, Learning &amp; New Beginnings</span>
          <h1>
            Where Every Girl Child
            <br />
            Finds Her Wings. <span aria-hidden="true">🕊️</span>
          </h1>
          <p>
            The VEDI Foundation empowers underprivileged girls through education,
            healthcare, mentorship, and skill development — so every girl can rise,
            shine, and lead.
          </p>
          <div className="hero-actions">
            <Link to="/get-involved" className="btn btn-primary">
              Get Involved
            </Link>
            <Link to="/programs" className="btn btn-ghost">
              Explore our programs
            </Link>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section container">
        <div className="vm-grid">
          <div className="vm-card">
            <h2>Our Vision</h2>
            <p>
              To build an equitable society where every underprivileged girl child
              is empowered with education, health, dignity, confidence, and
              opportunities to achieve her fullest potential.
            </p>
          </div>
          <div className="vm-card">
            <h2>Our Mission</h2>
            <p>
              To nurture, support, and empower underprivileged girls through
              education, healthcare, mentorship, skill development, and value-based
              leadership — enabling them to become self-reliant and socially
              responsible citizens.
            </p>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-head centered">
            <h2>The VEDI Values</h2>
            <p className="muted">The four pillars woven into our name.</p>
          </div>
          <div className="values-grid">
            {CORE_VALUES.map((v) => (
              <div className="value-card" key={v.letter}>
                <span className="value-letter">{v.letter}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured programs */}
      <section className="section container">
        <div className="section-head">
          <h2>Flagship Programs</h2>
          <Link to="/programs" className="link">
            View all &rarr;
          </Link>
        </div>
        {featured.length === 0 ? (
          <p className="muted">Programs are loading…</p>
        ) : (
          <div className="program-grid">
            {featured.map((p) => (
              <ProgramCard key={p.id} program={p} />
            ))}
          </div>
        )}
      </section>

      {/* Mottos */}
      <section className="mottos">
        <div className="container">
          <div className="mottos-list">
            {MOTTOS.map((m) => (
              <blockquote key={m}>“{m}”</blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section container">
        <div className="cta-banner">
          <h2>Help a girl discover her wings.</h2>
          <p>
            Your support provides scholarships, healthcare, and mentorship to
            girls who need it most.
          </p>
          <Link to="/get-involved" className="btn btn-primary">
            Support VEDI
          </Link>
        </div>
      </section>
    </>
  );
}
