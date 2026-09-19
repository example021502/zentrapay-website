const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || `Request to ${path} failed (${res.status})`);
  }

  return data;
}

export const getHome = () => request("/home");
export const getAbout = () => request("/about");
export const getBlog = () => request("/blog");
export const getFeatures = () => request("/features");
export const getContactInfo = () => request("/contact");
export const submitContactMessage = (payload) =>
  request("/contact", { method: "POST", body: JSON.stringify(payload) });
