import { Avatar } from "./primitives.jsx";
import { T } from "../theme.js";
import { computeStrength, strengthInfo } from "../utils.js";

export function Sidebar({ contacts, interactions, selectedId, onSelect, onAdd }) {
  const sorted = contacts.slice().sort((a, b) => {
    const sa = computeStrength(interactions, a.id) ?? -1;
    const sb = computeStrength(interactions, b.id) ?? -1;
    return sb - sa;
  });

  return (
    <div
      style={{
        width: 256,
        flexShrink: 0,
        borderRight: `1px solid ${T.border}`,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      <div style={{ padding: "24px 20px 12px" }}>
        <div
          style={{
            fontFamily: T.fontSerif,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          Relationships
        </div>
        <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>
          {contacts.length} {contacts.length === 1 ? "person" : "people"}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "4px 10px" }}>
        {contacts.length === 0 && (
          <p
            style={{
              padding: "12px 10px",
              fontSize: 12,
              color: T.muted,
              lineHeight: 1.6,
            }}
          >
            Add someone to get started.
          </p>
        )}
        {sorted.map((c) => {
          const s = computeStrength(interactions, c.id);
          const { text, color } = strengthInfo(s);
          const active = c.id === selectedId;
          return (
            <div
              key={c.id}
              onClick={() => onSelect(c.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 10px",
                borderRadius: 8,
                cursor: "pointer",
                background: active ? T.card : "transparent",
                transition: "background 0.15s",
                marginBottom: 2,
              }}
            >
              <Avatar name={c.name} color={c.color} size={32} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                  }}
                >
                  {text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{ padding: 14, borderTop: `1px solid ${T.border}` }}
      >
        <button
          onClick={onAdd}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: 8,
            border: `1.5px dashed ${T.border}`,
            background: "transparent",
            fontSize: 12,
            color: T.muted,
            cursor: "pointer",
            fontFamily: T.fontSans,
            transition: "border-color 0.15s, color 0.15s",
          }}
        >
          + Add person
        </button>
      </div>
    </div>
  );
}
