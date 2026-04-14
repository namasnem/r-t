import { QUESTIONS, MAX_SCORE } from "./questions.js";

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export function now() {
  return Date.now();
}

export function initials(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join("");
}

export function fmt(ts) {
  return new Date(ts).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function daysSince(ts) {
  return (Date.now() - ts) / 86_400_000;
}

export function computeStrength(interactions, contactId) {
  const rel = interactions
    .filter((i) => i.contactId === contactId)
    .sort((a, b) => b.date - a.date);
  if (!rel.length) return null;
  const recent = rel.slice(0, 5);
  const avg = recent.reduce((s, i) => s + i.score, 0) / recent.length;
  const decay = Math.max(0.35, 1 - daysSince(rel[0].date) / 90);
  return (avg / MAX_SCORE) * decay;
}

export function strengthInfo(s) {
  if (s === null) return { text: "New", color: "#A09080" };
  if (s >= 0.65) return { text: "Strong", color: "#5A8A6A" };
  if (s >= 0.45) return { text: "Active", color: "#6B78C0" };
  if (s >= 0.25) return { text: "Fading", color: "#C09A40" };
  return { text: "Distant", color: "#B06060" };
}
