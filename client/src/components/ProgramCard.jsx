export default function ProgramCard({ program }) {
  return (
    <article className="program-card">
      <div className="program-icon" aria-hidden="true">
        {program.icon || "🌸"}
      </div>
      <h3 className="program-name">{program.name}</h3>
      {program.tagline && <p className="program-tagline">{program.tagline}</p>}
      <p className="program-desc">{program.description}</p>
    </article>
  );
}
