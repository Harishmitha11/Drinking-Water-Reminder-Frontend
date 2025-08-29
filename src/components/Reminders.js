import React, { useState, useEffect } from "react";

export default function Reminders() {
  const [reminderTime, setReminderTime] = useState("");
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    if ("Notification" in window) Notification.requestPermission();
  }, []);

  const addReminder = () => {
    if (!reminderTime) return;

    const now = new Date();
    const [hours, minutes] = reminderTime.split(":").map(Number);
    const reminderDate = new Date();
    reminderDate.setHours(hours, minutes, 0, 0);

    let delay = reminderDate.getTime() - now.getTime();
    if (delay < 0) delay += 24 * 60 * 60 * 1000;

    const timeoutId = setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification("💧 Time to drink water!", { body: `It's ${reminderTime}. Stay hydrated!` });
      }
    }, delay);

    setReminders([...reminders, { time: reminderTime, id: timeoutId }]);
    setReminderTime("");
  };

  const removeReminder = (id) => {
    clearTimeout(id);
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Set Water Reminders ⏰</h3>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} style={{ padding: 8, borderRadius: 8 }}/>
        <button onClick={addReminder} style={{ padding: 8, borderRadius: 8, background: "#00bfff", color: "white", border: "none", cursor: "pointer" }}>Add</button>
      </div>
      <ul>
        {reminders.map((r, idx) => (
          <li key={idx} style={{ marginBottom: 5 }}>
            {r.time} <button onClick={() => removeReminder(r.id)} style={{ marginLeft: 10, cursor: "pointer", color: "red" }}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
