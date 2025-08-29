import React, { useState } from "react";

export default function QuickLog({ onLog }) {
  const [manual, setManual] = useState("");

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <input type="number" placeholder="ml" value={manual} onChange={e => setManual(e.target.value)} style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #ccc" }}/>
        <button onClick={() => { onLog(Number(manual)); setManual(""); }} style={{ padding: "8px 12px", background: "#00bfff", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>Log 💧</button>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {[100,200,300,500].map(amount => (
          <button key={amount} onClick={() => onLog(amount)} style={{ flex: 1, padding: 8, borderRadius: 8, border: "none", background: "#0077b6", color: "white", cursor: "pointer" }}>+{amount}ml</button>
        ))}
      </div>
    </div>
  );
}
