import { useState } from "react";
import { Overlay } from "./primitives.jsx";
import { Avatar } from "./primitives.jsx";
import { T, btnPrimary, btnGhost } from "../theme.js";
import { QUESTIONS, MAX_SCORE } from "../questions.js";
import { uid, now, strengthInfo } from "../utils.js";

export function LogModal({ contact, onLog, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  const q = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  const select = (optIdx) => {
    const next = { ...answers, [q.id]: optIdx };
    setAnswers(next);
    if (!isLast) {
      setTimeout(() => setStep((s) => s + 1), 180);
    } else {
      const score = QUESTIONS.reduce(
        (s, qq) => s + (qq.weights[next[qq.id] ?? 0] ?? 0),
        0
      );
      setFinalScore(score);
      setDone(true);
      onLog({
        id: uid(),
        contactId: contact.id,
        date: now(),
        answers: next,
        score,
      });
    }
  };

  if (done) {
    const pct = Math.round((finalScore / MAX_SCORE) * 100);
    const { text, color } = strengthInfo(finalScore / MAX_SCORE);
    return (
      <Overlay onClose={onClose}>
        <div style={{ textAlign: "center", padding: "12px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
          <h2
            style={{
              fontFamily: T.fontSerif,
              fontSize: 26,
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Logged
          </h2>
          <p style={{ fontSize: 13, color: T.muted, marginBottom: 20 }}>
            This interaction scored{" "}
            <strong style={{ color }}>{pct}%</strong>, rated{" "}
            <strong style={{ color }}>{text}</strong>.
          </p>
          <button onClick={onClose} style={{ ...btnPrimary, width: "100%" }}>
            Done
          </button>
        </div>
      </Overlay>
    );
  }

  return (
    <Overlay onClose={onClose}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <Avatar name={contact.name} color={contact.color} size={36} />
        <div>
          <div
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: T.muted,
            }}
          >
            Logging interaction with
          </div>
          <div
            style={{
              fontFamily: T.fontSerif,
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {contact.name}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <span style={{ fontSize: 10, color: T.muted }}>
            Question {step + 1} of {QUESTIONS.length}
          </span>
        </div>
        <div style={{ height: 3, background: T.border, borderRadius: 2 }}>
          <div
            style={{
              height: "100%",
              borderRadius: 2,
              background: T.accent,
              width: `${((step + 1) / QUESTIONS.length) * 100}%`,
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      <p
        style={{
          fontFamily: T.fontSerif,
          fontSize: 22,
          lineHeight: 1.4,
          marginBottom: 18,
        }}
      >
        {q.text}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => select(i)}
            style={{
              padding: "12px 16px",
              borderRadius: 8,
              border: `1.5px solid ${T.border}`,
              background: answers[q.id] === i ? T.accent : T.card,
              color: answers[q.id] === i ? "#fff" : T.text,
              fontSize: 13,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s",
              fontFamily: T.fontSans,
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep((s) => s - 1)}
          style={{
            ...btnGhost,
            marginTop: 14,
            fontSize: 12,
            padding: "8px 14px",
          }}
        >
          ← Back
        </button>
      )}
    </Overlay>
  );
}
