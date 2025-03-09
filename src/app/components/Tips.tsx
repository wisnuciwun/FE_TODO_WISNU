import React, { useEffect, useState } from "react";

const tips = [
  "Stay hydrated! Drink at least 8 glasses of water daily. 💧",
  "Break tasks into smaller chunks to stay productive. ✅",
  "Take deep breaths and relax your mind. 🧘",
  "Limit screen time before bed for better sleep. 😴",
  "Always back up your important files. 💾",
];

const colors = [
  "bg-red-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
];

const TipOfTheDay = () => {
  const [tip, setTip] = useState("");
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setTip(tips[randomIndex]);
    setBgColor(colors[randomIndex]);
  }, []);

  return (
    <div
      className={`p-2 rounded-lg shadow-md ${bgColor} text-gray-800 animate-fade-in`}
    >
      <span className="text-medium font-semibold mr-3">💡 Tip of the Day</span>
      <span className="mt-2 text-sm">{tip}</span>
    </div>
  );
};

export default TipOfTheDay;
