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
  const [index, setIndex] = useState(Math.floor(Math.random() * tips.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 10000); // Change tip every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
      className={`p-2 rounded-lg shadow-md ${colors[index]} text-gray-800 transition-all`}
    >
      <span className="text-medium font-semibold mr-3">💡 Tip of the Day</span>
      <span className="mt-2 text-sm">{tips[index]}</span>
    </div>
  );
};

export default TipOfTheDay;
