import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("travelwise-history") || "[]");
    setHistory(saved.reverse()); // newest first
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Expense History
      </h1>

      {history.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">
          No history yet. Add expenses and reset to generate history records.
        </p>
      ) : (
        <div className="space-y-4">
          {history.map((record, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(record.timestamp).toLocaleString("en-IN")}
              </p>

              <h2 className="text-lg font-semibold mt-2 text-gray-800 dark:text-white">
                Budget: ₹{record.budget.total}
              </h2>

              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mt-3">
                Expenses:
              </h3>

              <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
                {record.expenses.map((e: any) => (
                  <li key={e.id}>
                    {e.title} - ₹{e.amount} ({e.category})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
