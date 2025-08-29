import React from "react";

export default function WaterGlass({ todayTotal, dailyWaterMl }) {
  const percentage = Math.min(100, (todayTotal / dailyWaterMl) * 100);

  let color = "#ff0000";
  if (percentage >= 50 && percentage < 80) color = "#ffbf00";
  if (percentage >= 80) color = "#00bfff";

  return (
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      <div style={{
        width: 100,
        height: 200,
        border: "4px solid #0077b6",
        borderRadius: "10px 10px 0 0",
        overflow: "hidden",
        margin: "0 auto",
        position: "relative",
        background: "#e0f7ff"
      }}>
        <div style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: `${percentage}%`,
          backgroundColor: color,
          transition: "height 0.5s ease"
        }} />
      </div>
      <p>{todayTotal} / {dailyWaterMl} ml</p>
    </div>
  );
}
