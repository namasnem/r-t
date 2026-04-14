import { useState } from "react";
import { Overlay, Label } from "./primitives.jsx";
import { T, PALETTE, inputStyle, btnPrimary, btnGhost } from "../theme.js";
import { uid } from "../utils.js";

export function AddContactModal({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [colorIdx, setColorIdx] = useState(0);

  const submit = () => {
    if (!name.trim()) return;
    onAdd({
      id: uid(),
      name: name.trim(),
      category: category.trim() || "Contact",
      color: PALETTE[colorIdx],
      created: Date.now(),
    });
  };

  return (
    <Overlay onClose={onClose}>
      <h2
        style={{
          fontFamily: T.fontSerif,
          fontSize: 28,
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        Add someone
      </h2>
      <p style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>
        They will appear in your sidebar once added.
      </p>

      <Label>Name</Label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        style={inputStyle}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        autoFocus
      />

      <Label>
        Category{" "}
        <span
          style={{
            color: T.border,
            fontStyle: "italic",
            textTransform: "none",
          }}
        >
          (optional)
        </span>
      </Label>
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="e.g. Classmate, Friend, Family"
        style={inputStyle}
      />

      <Label>Colour</Label>
      <div
        style={{ display: "flex", gap: 8, marginBottom: 24, marginTop: 6 }}
      >
        {PALETTE.map((c, i) => (
          <div
            key={c}
            onClick={() => setColorIdx(i)}
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: c,
              cursor: "pointer",
              outline: i === colorIdx ? `3px solid ${c}` : "3px solid transparent",
              outlineOffset: 2,
              transition: "outline 0.15s",
            }}
          />
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={submit} style={{ ...btnPrimary, flex: 1 }}>
          Add person
        </button>
        <button onClick={onClose} style={{ ...btnGhost, flex: 1 }}>
          Cancel
        </button>
      </div>
    </Overlay>
  );
}
