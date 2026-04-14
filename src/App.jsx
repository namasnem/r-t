import { useState, useEffect } from "react";
import { T, btnPrimary } from "./theme.js";
import { loadData, saveData } from "./storage.js";
import { Sidebar } from "./components/Sidebar.jsx";
import { DetailPanel } from "./components/DetailPanel.jsx";
import { AddContactModal } from "./components/AddContactModal.jsx";
import { LogModal } from "./components/LogModal.jsx";

export default function App() {
  const [data, setData] = useState(loadData);
  const [selectedId, setSelectedId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showLog, setShowLog] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);

    const st = document.createElement("style");
    st.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: ${T.bg}; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 2px; }
    `;
    document.head.appendChild(st);
  }, []);

  useEffect(() => {
    if (data) saveData(data);
  }, [data]);

  const selected = data.contacts.find((c) => c.id === selectedId) ?? null;

  const addContact = (contact) => {
    setData((d) => ({ ...d, contacts: [...d.contacts, contact] }));
    setSelectedId(contact.id);
    setShowAdd(false);
  };

  const logInteraction = (interaction) => {
    setData((d) => ({ ...d, interactions: [...d.interactions, interaction] }));
    setShowLog(false);
  };

  const deleteContact = () => {
    setData((d) => ({
      contacts: d.contacts.filter((c) => c.id !== selectedId),
      interactions: d.interactions.filter((i) => i.contactId !== selectedId),
    }));
    setSelectedId(null);
  };

  return (
    <div
      style={{
        fontFamily: T.fontSans,
        background: T.bg,
        color: T.text,
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Sidebar
        contacts={data.contacts}
        interactions={data.interactions}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onAdd={() => setShowAdd(true)}
      />

      <div style={{ flex: 1, display: "flex" }}>
        {selected ? (
          <DetailPanel
            contact={selected}
            interactions={data.interactions}
            onLog={() => setShowLog(true)}
            onDelete={deleteContact}
          />
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 12,
              padding: 32,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: T.fontSerif,
                fontSize: 36,
                color: T.border,
                marginBottom: 4,
              }}
            >
              Know your people
            </div>
            <p
              style={{
                fontSize: 13,
                color: T.muted,
                maxWidth: 320,
                lineHeight: 1.8,
              }}
            >
              Track relationships through neutral, observable questions to
              reduce bias and build an honest picture of your connections over
              time.
            </p>
            <button
              onClick={() => setShowAdd(true)}
              style={{ ...btnPrimary, marginTop: 8 }}
            >
              Add your first person
            </button>
          </div>
        )}
      </div>

      {showAdd && (
        <AddContactModal
          onAdd={addContact}
          onClose={() => setShowAdd(false)}
        />
      )}
      {showLog && selected && (
        <LogModal
          contact={selected}
          onLog={logInteraction}
          onClose={() => setShowLog(false)}
        />
      )}
    </div>
  );
}
