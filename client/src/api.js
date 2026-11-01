// Small fetch wrapper around the backend API.
// In dev, Vite proxies /api -> http://localhost:4000 (see vite.config.js).

const TOKEN_KEY = "demo_admin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  // Public
  listPrograms: () => request("/programs"),
  getProgram: (id) => request(`/programs/${id}`),
  sendMessage: (payload) =>
    request("/contact", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),

  // Admin
  createProgram: (payload) =>
    request("/programs", { method: "POST", body: payload, auth: true }),
  updateProgram: (id, payload) =>
    request(`/programs/${id}`, { method: "PUT", body: payload, auth: true }),
  deleteProgram: (id) =>
    request(`/programs/${id}`, { method: "DELETE", auth: true }),
  listMessages: () => request("/messages", { auth: true }),
};
