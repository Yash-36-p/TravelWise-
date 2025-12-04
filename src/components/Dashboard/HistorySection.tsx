import React from "react";

function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
}

function getWeek(ts: number) {
  const d = new Date(ts);
  const firstDayOfYear = new Date(d.getFullYear(), 0, 1);
  const pastDaysOfYear = (ts - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function getMonth(ts: number) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth() + 1}`;
}

export const HistorySection = () => {
  const [expanded, setExpanded] = React.useState<number | null>(null);
  const history = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("travelwise-history") || "[]");
    } catch {
      return [];
    }
  }, []);

  if (!history.length) return null;

  // Group by month
  const monthGroups: Record<string, any[]> = {};
  history.forEach(entry => {
    const month = getMonth(entry.timestamp);
    if (!monthGroups[month]) monthGroups[month] = [];
    monthGroups[month].push(entry);
  });

  return (
    <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
      <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>Expense History</h2>
      {Object.entries(monthGroups).map(([month, entries]) => (
        <div key={month} style={{ marginBottom: "18px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "500", color: "#0b3d91", marginBottom: "8px" }}>Month: {month}</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {entries.map((entry, idx) => (
              <li key={entry.timestamp} style={{ marginBottom: "10px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
                <button
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", width: "100%", textAlign: "left" }}
                  onClick={() => setExpanded(expanded === entry.timestamp ? null : entry.timestamp)}
                >
                  <div style={{ fontSize: "14px", color: "#475569" }}>
                    <strong>{formatDate(entry.timestamp)}</strong> — {entry.expenses.length} expenses, total ₹{entry.expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                    Budget: ₹{entry.budget.total.toLocaleString("en-IN")}
                  </div>
                </button>
                {expanded === entry.timestamp && (
                  <div style={{ marginTop: "10px", background: "#f9f9f9", borderRadius: "6px", padding: "10px" }}>
                    <h4 style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Expenses:</h4>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {entry.expenses.map((exp: any) => (
                        <li key={exp.id} style={{ marginBottom: "6px", borderBottom: "1px solid #eee", paddingBottom: "4px" }}>
                          <div style={{ fontSize: "13px", color: "#334155" }}>
                            <strong>{exp.title}</strong> — ₹{exp.amount.toLocaleString("en-IN")}
                          </div>
                          <div style={{ fontSize: "12px", color: "#64748b" }}>
                            {exp.category} | {new Date(exp.date).toLocaleDateString("en-IN")}
                          </div>
                          {exp.description && (
                            <div style={{ fontSize: "12px", color: "#999", marginTop: "2px" }}>{exp.description}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
