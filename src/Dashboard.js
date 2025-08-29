import React, { useState } from "react";
import axios from "axios";
import WaterGlass from "./components/WaterGlass";
import WeeklySummary from "./components/WeeklySummary";
import QuotesCarousel from "./components/QuotesCarousel";
import StreakFeedback from "./components/StreakFeedback";
import QuickLog from "./components/QuickLog";
import Reminders from "./components/Reminders";

const quotesArray = [
  "Hydrate yourself for a healthy mind.",
  "Water is life, drink enough daily.",
  "Stay hydrated, stay active!",
  "A glass of water keeps fatigue away.",
  "Drink water before meals for better digestion."
];

const BASE_URL = "https://drinking-water-backend.onrender.com"; // <- Replace with your Render URL

export default function Dashboard() {
  const [form, setForm] = useState({ name: "", height: "", weight: "" });
  const [water, setWater] = useState(null);
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [theme, setTheme] = useState("light");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const calculateWater = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/water`, form);
      setWater(res.data);
      fetchHistory(res.data.name);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHistory = async (name) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/log/${name}`);
      const data = res.data.reverse();
      setHistory(data);
      let count = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].amountMl >= 0.8 * water.dailyWaterMl) count++;
        else break;
      }
      setStreak(count);
    } catch (err) {
      console.log(err);
    }
  };

  const logWater = async (amount) => {
    try {
      await axios.post(`${BASE_URL}/api/log`, { name: form.name, amountMl: amount });
      fetchHistory(form.name);
    } catch (err) {
      console.log(err);
    }
  };

  const todayTotal = history.reduce((acc, log) => acc + log.amountMl, 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: theme === "light" ? "linear-gradient(to right, #a0e9ff, #ffffff)" : "#001f3f",
      color: theme === "light" ? "black" : "white",
      fontFamily: "Arial, sans-serif",
      padding: 20
    }}>
      <h1 style={{ textAlign: "center", color: "#0077b6" }}>💧 Drinking Water Reminder</h1>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} style={{ marginBottom: 20 }}>
        Toggle Theme
      </button>

      {!water && (
        <div style={{
          maxWidth: 400,
          margin: "30px auto",
          background: theme === "light" ? "#fff" : "#002b5c",
          padding: 20,
          borderRadius: 15,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <h2>Enter Your Details</h2>
          <form onSubmit={calculateWater} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input placeholder="Name" name="name" onChange={handleChange} required />
            <input placeholder="Height (cm)" name="height" type="number" onChange={handleChange} required />
            <input placeholder="Weight (kg)" name="weight" type="number" onChange={handleChange} required />
            <button type="submit" style={{
              padding: 10,
              background: "#00bfff",
              color: "white",
              border: "none",
              borderRadius: 10,
              cursor: "pointer"
            }}>
              Calculate 💧
            </button>
          </form>
        </div>
      )}

      {water && (
        <div style={{ maxWidth: 600, margin: "30px auto" }}>
          <div style={{
            background: theme === "light" ? "#fff" : "#002b5c",
            padding: 20,
            borderRadius: 15,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            marginBottom: 20
          }}>
            <h2>Hello {water.name} 👋</h2>
            <p>Daily Water Requirement: <b>{(water.dailyWaterMl / 1000).toFixed(2)} L</b></p>
          </div>

          <WaterGlass todayTotal={todayTotal} dailyWaterMl={water.dailyWaterMl} />
          <QuickLog onLog={logWater} />
          <WeeklySummary history={history} dailyWaterMl={water.dailyWaterMl} />
          <StreakFeedback streak={streak} />
          <QuotesCarousel quotes={quotesArray} />
          <Reminders />
        </div>
      )}
    </div>
  );
}
