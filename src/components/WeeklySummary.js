import React from "react";

export default function WeeklySummary({ history, dailyWaterMl }) {
  const last7Days = history.slice(0, 7);

  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 20 }}>
      {last7Days.map((log, idx) => {
        const percent = Math.min(100, (log.amountMl / dailyWaterMl) * 100);
        let color = "#ff0000";
        if (percent >= 50 && percent < 80) color = "#ffbf00";
        if (percent >= 80) color = "#00bfff";
        return (
          <div key={idx} style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            flexShrink: 0
          }} title={`${log.amountMl} ml`}>
            {Math.round(percent)}%
          </div>
        );
      })}
    </div>
  );
}
