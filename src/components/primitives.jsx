import { T } from "../theme.js";
import { initials, strengthInfo } from "../utils.js";

export function Avatar({ name, color, size = 40 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: T.fontSerif,
        fontSize: size * 0.38,
        fontWeight: 600,
        flexShrink: 0,
        letterSpacing: "0.03em",
        userSelect: "none",
      }}
    >
      {initials(name)}
    </div>
  );
}

export function Label({ children }) {
  return (
    <div
      style={{
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: T.muted,
        marginBottom: 6,
        marginTop: 14,
      }}
    >
      {children}
    </div>
  );
}

export function StrengthBar({ value }) {
  const pct = value === null ? 0 : Math.round(value * 100);
  const { text, color } = strengthInfo(value);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: T.muted,
          }}
        >
          Relationship strength
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {text}
        </span>
      </div>
      <div
        style={{
          height: 4,
          borderRadius: 2,
          background: T.border,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: color,
            borderRadius: 2,
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </div>
  );
}

export function InsightTile({ label, value }) {
  return (
    <div style={{ background: T.card, borderRadius: 8, padding: "12px 14px" }}>
      <div
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: T.muted,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 500 }}>{value}</div>
    </div>
  );
}

export function Overlay({ onClose, children }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20,14,8,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: T.bg,
          borderRadius: 16,
          padding: "32px 28px",
          maxWidth: 480,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 24px 64px rgba(0,0,0,0.28)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
