import { useEffect, useState } from "react";
import { api } from "../api.js";
import ProgramCard from "../components/ProgramCard.jsx";

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .listPrograms()
      .then(setPrograms)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section container">
      <div className="page-head centered">
        <h1>Our Flagship Programs</h1>
        <p className="muted">
          Focused initiatives that educate, empower, and elevate every girl.
        </p>
      </div>

      {loading && <p className="muted">Loading…</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && programs.length === 0 && (
        <p className="muted">No programs available yet.</p>
      )}

      <div className="program-grid">
        {programs.map((p) => (
          <ProgramCard key={p.id} program={p} />
        ))}
      </div>
    </section>
  );
}
