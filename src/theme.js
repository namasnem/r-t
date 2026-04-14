export const T = {
  bg: "#F4EFE4",
  card: "#EDE8DC",
  border: "#D4C9B0",
  text: "#1E1610",
  muted: "#8A7A65",
  accent: "#A07060",
  fontSerif: "'Cormorant Garamond', serif",
  fontSans: "'Plus Jakarta Sans', sans-serif",
};

export const PALETTE = [
  "#7C9885", "#8B7CB3", "#A07060", "#4A7FA5",
  "#B06B6B", "#6B9DB0", "#9B8B5B", "#6B80A5",
];

export const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: 8,
  border: `1.5px solid ${T.border}`, background: "transparent",
  fontSize: 14, color: T.text, outline: "none", fontFamily: T.fontSans,
};

export const btnPrimary = {
  padding: "10px 18px", borderRadius: 8, border: "none",
  background: T.accent, color: "#fff", fontSize: 13, fontWeight: 500,
  cursor: "pointer", fontFamily: T.fontSans,
};

export const btnGhost = {
  padding: "10px 18px", borderRadius: 8,
  border: `1.5px solid ${T.border}`, background: "transparent",
  color: T.text, fontSize: 13, cursor: "pointer", fontFamily: T.fontSans,
};
