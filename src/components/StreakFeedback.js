import React from "react";

export default function StreakFeedback({ streak }) {
  let emoji = "😢";
  if (streak >= 3 && streak < 7) emoji = "🙂";
  if (streak >= 7) emoji = "😎";

  return (
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      <p>🔥 Current Streak: {streak} days {emoji}</p>
    </div>
  );
}
