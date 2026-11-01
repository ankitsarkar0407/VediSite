import { useState } from "react";
import { api } from "../api.js";

export default function GetInvolved() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", error: "" });

  const update = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: "sending", error: "" });
    try {
      await api.sendMessage(form);
      setStatus({ state: "success", error: "" });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ state: "error", error: err.message });
    }
  };

  return (
    <>
      {/* Pledge */}
      <section className="section container narrow">
        <div className="page-head centered">
          <h1>Get Involved</h1>
          <p className="muted">
            Partner with us to educate, empower, and elevate every girl child.
          </p>
        </div>

        <div className="pledge">
          <h2>Our Pledge</h2>
          <p>
            “We pledge to stand beside every girl child who dreams of a better
            future. We shall strive to provide opportunities, encouragement, and
            support so that no dream is extinguished by poverty, discrimination,
            or circumstance. Through compassion, commitment, and collective
            action, we shall help every girl rise, shine, and lead.”
          </p>
        </div>

        <div className="involve-ways">
          <div className="involve-card">
            <span aria-hidden="true">💝</span>
            <h3>Donate</h3>
            <p>Fund scholarships, health camps, and learning materials.</p>
          </div>
          <div className="involve-card">
            <span aria-hidden="true">🤝</span>
            <h3>Volunteer</h3>
            <p>Mentor a girl, teach a skill, or support our programs.</p>
          </div>
          <div className="involve-card">
            <span aria-hidden="true">🏫</span>
            <h3>Partner</h3>
            <p>Collaborate as a school, NGO, or corporate supporter.</p>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="section section-soft">
        <div className="container narrow">
          <div className="section-head centered">
            <h2>Reach Out to Us</h2>
            <p className="muted">
              Tell us how you’d like to help — we’ll be in touch.
            </p>
          </div>

          {status.state === "success" ? (
            <div className="notice success">
              Thank you for reaching out! Your message has been received, and our
              team will respond soon.
              <button
                className="btn btn-ghost"
                onClick={() => setStatus({ state: "idle", error: "" })}
              >
                Send another
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={submit}>
              <label>
                Name
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  required
                  placeholder="Your name"
                />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  required
                  placeholder="you@example.com"
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={update}
                  required
                  rows={5}
                  placeholder="I’d like to donate / volunteer / partner…"
                />
              </label>

              {status.state === "error" && (
                <p className="error">{status.error}</p>
              )}

              <button
                className="btn btn-primary"
                type="submit"
                disabled={status.state === "sending"}
              >
                {status.state === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
