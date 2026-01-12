import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! Ask me to plan your trip budget." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const botReply = getBotReply(input);

    setMessages([...messages, userMessage, botReply]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b text-center font-bold text-cyan-700">
          ✈️ AI Travel Budget Assistant
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] p-3 rounded-xl text-sm ${
                msg.sender === "user"
                  ? "bg-cyan-600 text-white ml-auto"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Plan a 3-day Goa trip under ₹10,000"
            className="flex-1 border rounded-lg p-2"
          />
          <button
            onClick={handleSend}
            className="bg-cyan-600 text-white px-4 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function getBotReply(message) {
  const text = message.toLowerCase();

  // ----------- Extract Budget -----------
  const budgetMatch = text.match(/₹?\s?(\d{4,6})/);
  const budget = budgetMatch ? parseInt(budgetMatch[1]) : 10000;

  // ----------- Extract Days -----------
  const daysMatch = text.match(/(\d+)\s?-?\s?day/);
  const days = daysMatch ? parseInt(daysMatch[1]) : 3;

  // ----------- Extract City -----------
  const cityWords = text
    .replace(/plan|trip|under|₹|\d+|day|days|for|a|an|to|in/g, "")
    .trim();

  const city =
    cityWords.length > 0
      ? cityWords
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      : "your city";

  // ----------- Budget Distribution Logic -----------
  const stay = Math.round(budget * 0.35);
  const food = Math.round(budget * 0.25);
  const transport = Math.round(budget * 0.2);
  const activities = budget - (stay + food + transport);

  return {
    sender: "bot",
    text:
      `🧳 **${days}-Day Trip Plan for ${city} (₹${budget.toLocaleString()})**\n\n` +
      `🏨 Stay: ₹${stay} (Budget hotels / hostels)\n` +
      `🍽 Food: ₹${food} (Local food + cafes)\n` +
      `🚌 Transport: ₹${transport} (Public transport / rentals)\n` +
      `🎯 Activities: ₹${activities} (Sightseeing & experiences)\n\n` +
      `💡 **Tips:**\n` +
      `• Book stays early to save money\n` +
      `• Prefer local transport\n` +
      `• Eat where locals eat\n` +
      `• Free attractions = best value`
  };
}
