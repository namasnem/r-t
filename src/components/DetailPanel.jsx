import { Avatar, StrengthBar, InsightTile } from "./primitives.jsx";
import { T, btnPrimary } from "../theme.js";
import { QUESTIONS, MAX_SCORE } from "../questions.js";
import { computeStrength, strengthInfo, fmt, daysSince } from "../utils.js";

export function DetailPanel({ contact, interactions, onLog, onDelete }) {
  const rel = interactions
    .filter((i) => i.contactId === contact.id)
    .sort((a, b) => b.date - a.date);
  const n = rel.length;
  const strength = computeStrength(interactions, contact.id);

  const theyFirst = rel.filter((i) => i.answers.initiator === 0).length;
  const iFirst = rel.filter((i) => i.answers.initiator === 1).length;
  const feltGood = rel.filter(
    (i) => i.answers.energy === 0 || i.answers.energy === 1
  ).length;
  const lastDays = n ? Math.round(daysSince(rel[0].date)) : null;

  const initiatorText = (() => {
    if (!n) return "—";
    if (theyFirst > iFirst) return "Mostly them";
    if (iFirst > theyFirst) return "Mostly you";
    return "About equal";
  })();

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "32px 36px",
        maxWidth: 640,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <Avatar name={contact.name} color={contact.color} size={56} />
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontFamily: T.fontSerif,
              fontSize: 34,
              fontWeight: 600,
              lineHeight: 1.1,
            }}
          >
            {contact.name}
          </h1>
          <div
            style={{
              fontSize: 11,
              color: T.muted,
              marginTop: 4,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {contact.category}
          </div>
          <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>
            Added {fmt(contact.created)}
          </div>
        </div>
        <button
          onClick={onLog}
          style={{
            ...btnPrimary,
            fontSize: 12,
            padding: "9px 14px",
            whiteSpace: "nowrap",
          }}
        >
          + Log interaction
        </button>
      </div>

      <StrengthBar value={strength} />

      {/* Insights */}
      {n > 0 && (
        <div style={{ marginTop: 24 }}>
          <div
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: T.muted,
              marginBottom: 10,
            }}
          >
            Insights
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            <InsightTile
              label="Last interaction"
              value={
                lastDays === 0
                  ? "Today"
                  : lastDays === 1
                  ? "Yesterday"
                  : `${lastDays} days ago`
              }
            />
            <InsightTile label="Interactions logged" value={`${n} total`} />
            <InsightTile
              label="Who reaches out first"
              value={initiatorText}
            />
            <InsightTile
              label="Left you feeling good"
              value={`${feltGood} of ${n}`}
            />
          </div>
        </div>
      )}

      {/* History */}
      {n > 0 && (
        <div style={{ marginTop: 28 }}>
          <div
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: T.muted,
              marginBottom: 12,
            }}
          >
            History
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {rel.map((inter) => {
              const { text, color } = strengthInfo(inter.score / MAX_SCORE);
              const who =
                inter.answers.initiator === 0
                  ? "They reached out"
                  : inter.answers.initiator === 1
                  ? "You reached out"
                  : "Mutual";
              const dur =
                QUESTIONS[1].options[inter.answers.duration ?? 1];
              return (
                <div
                  key={inter.id}
                  style={{
                    background: T.card,
                    borderRadius: 10,
                    padding: "12px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>
                      {fmt(inter.date)}
                    </div>
                    <div
                      style={{ fontSize: 11, color: T.muted, marginTop: 2 }}
                    >
                      {who} · {dur}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {text}
                    </div>
                    <div style={{ fontSize: 10, color: T.muted }}>
                      {Math.round((inter.score / MAX_SCORE) * 100)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {n === 0 && (
        <div
          style={{
            marginTop: 48,
            textAlign: "center",
            color: T.muted,
          }}
        >
          <div
            style={{
              fontFamily: T.fontSerif,
              fontSize: 24,
              marginBottom: 8,
              color: T.border,
            }}
          >
            No interactions yet
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.7 }}>
            Log your first interaction with{" "}
            {contact.name.split(" ")[0]} to begin building a picture of this
            relationship.
          </div>
          <button
            onClick={onLog}
            style={{ ...btnPrimary, marginTop: 20, fontSize: 13 }}
          >
            Log first interaction
          </button>
        </div>
      )}

      <div
        style={{
          marginTop: 48,
          paddingTop: 16,
          borderTop: `1px solid ${T.border}`,
        }}
      >
        <button
          onClick={() => {
            if (
              window.confirm(
                `Remove ${contact.name}? This will also delete their interaction history.`
              )
            ) {
              onDelete();
            }
          }}
          style={{
            fontSize: 12,
            color: "#B06060",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: T.fontSans,
          }}
        >
          Remove {contact.name.split(" ")[0]} from tracker
        </button>
      </div>
    </div>
  );
}
