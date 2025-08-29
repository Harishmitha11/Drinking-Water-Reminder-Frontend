import React, { useState, useEffect } from "react";

export default function QuotesCarousel({ quotes }) {
  // Provide a default empty array if quotes is undefined
  const safeQuotes = quotes || [];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (safeQuotes.length === 0) return; // do nothing if empty
    const interval = setInterval(() => setIndex(prev => (prev + 1) % safeQuotes.length), 5000);
    return () => clearInterval(interval);
  }, [safeQuotes.length]);

  if (safeQuotes.length === 0) return null; // render nothing if empty

  return (
    <div style={{
      background: "#00bfff", color: "white", padding: "10px 20px",
      borderRadius: 10, marginBottom: 20, textAlign: "center"
    }}>
      💡 {safeQuotes[index]}
    </div>
  );
}
