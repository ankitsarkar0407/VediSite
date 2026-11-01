import { useEffect, useState, useCallback } from "react";
import { api, getToken, setToken, clearToken } from "../api.js";

const EMPTY_PROGRAM = {
  name: "",
  tagline: "",
  description: "",
  icon: "",
};

export default function Admin() {
  const [authed, setAuthed] = useState(Boolean(getToken()));

  if (!authed) {
    return <Login onLoggedIn={() => setAuthed(true)} />;
  }
  return (
    <Dashboard
      onLogout={() => {
        clearToken();
        setAuthed(false);
      }}
    />
  );
}

function Login({ onLoggedIn }) {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { token } = await api.login(creds);
      setToken(token);
      onLoggedIn();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="section container narrow">
      <div className="page-head">
        <h1>Admin login</h1>
        <p className="muted">Sign in to manage programs and view messages.</p>
      </div>
      <form className="form" onSubmit={submit}>
        <label>
          Username
          <input
            value={creds.username}
            onChange={(e) =>
              setCreds((c) => ({ ...c, username: e.target.value }))
            }
            required
            autoComplete="username"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={creds.password}
            onChange={(e) =>
              setCreds((c) => ({ ...c, password: e.target.value }))
            }
            required
            autoComplete="current-password"
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-primary" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <p className="hint muted">
          Demo credentials: <code>admin</code> / <code>admin123</code>
        </p>
      </form>
    </section>
  );
}

function Dashboard({ onLogout }) {
  const [programs, setPrograms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState(EMPTY_PROGRAM);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      const [p, m] = await Promise.all([
        api.listPrograms(),
        api.listMessages(),
      ]);
      setPrograms(p);
      setMessages(m);
    } catch (err) {
      setError(err.message);
      if (/token/i.test(err.message)) onLogout();
    }
  }, [onLogout]);

  useEffect(() => {
    load();
  }, [load]);

  const resetForm = () => {
    setDraft(EMPTY_PROGRAM);
    setEditingId(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        await api.updateProgram(editingId, draft);
      } else {
        await api.createProgram(draft);
      }
      resetForm();
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const edit = (p) => {
    setEditingId(p.id);
    setDraft({
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      icon: p.icon,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!confirm("Delete this program?")) return;
    try {
      await api.deleteProgram(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="section container">
      <div className="page-head admin-head">
        <div>
          <h1>Admin dashboard</h1>
          <p className="muted">Manage programs and view contact messages.</p>
        </div>
        <button className="btn btn-ghost" onClick={onLogout}>
          Log out
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="admin-grid">
        <div className="card">
          <h2>{editingId ? "Edit program" : "Add program"}</h2>
          <form className="form" onSubmit={submit}>
            <label>
              Name
              <input
                value={draft.name}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, name: e.target.value }))
                }
                required
              />
            </label>
            <label>
              Tagline
              <input
                value={draft.tagline}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, tagline: e.target.value }))
                }
              />
            </label>
            <label>
              Icon (emoji)
              <input
                value={draft.icon}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, icon: e.target.value }))
                }
                placeholder="📚"
              />
            </label>
            <label>
              Description
              <textarea
                rows={4}
                value={draft.description}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, description: e.target.value }))
                }
              />
            </label>
            <div className="form-actions">
              <button className="btn btn-primary">
                {editingId ? "Save changes" : "Add program"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="card">
          <h2>Programs ({programs.length})</h2>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Tagline</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {programs.map((p) => (
                  <tr key={p.id}>
                    <td>{p.icon}</td>
                    <td>{p.name}</td>
                    <td>{p.tagline || "—"}</td>
                    <td className="row-actions">
                      <button className="link" onClick={() => edit(p)}>
                        Edit
                      </button>
                      <button
                        className="link danger"
                        onClick={() => remove(p.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {programs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="muted">
                      No programs yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Contact messages ({messages.length})</h2>
        {messages.length === 0 ? (
          <p className="muted">No messages yet.</p>
        ) : (
          <ul className="message-list">
            {messages.map((m) => (
              <li key={m.id} className="message">
                <div className="message-head">
                  <strong>{m.name}</strong>
                  <a href={`mailto:${m.email}`} className="link">
                    {m.email}
                  </a>
                  <span className="muted">{m.created_at}</span>
                </div>
                <p>{m.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
