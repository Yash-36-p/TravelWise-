import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Expense, Budget } from "@/types/expense";
import { ExpenseChart } from "@/components/Dashboard/ExpenseChart";
import { HistorySection } from "@/components/Dashboard/HistorySection";
import { toast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [budget, setBudget] = useState<Budget>(() => {
  const saved = localStorage.getItem("travelwise-budget");
  return saved
    ? JSON.parse(saved)
    : { total: 5000, spent: 0, remaining: 5000 };
});


  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [showBudgetSetup, setShowBudgetSetup] = useState(true);
  const [budgetSetupComplete, setBudgetSetupComplete] = useState(false);
  const [budgetInput, setBudgetInput] = useState("5000");

  const navigate = useNavigate();

  // Track which alerts have already been shown
  const shownAlerts = useRef({
    fifty: false,
    seventyFive: false,
    ninety: false,
  });

  // Load saved data
  useEffect(() => {
    const savedExpenses = localStorage.getItem("travelwise-expenses");
    const savedBudget = localStorage.getItem("travelwise-budget");
    const done = localStorage.getItem("travelwise-budget-setup");

    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));

    if (done) {
      setBudgetSetupComplete(true);
      setShowBudgetSetup(false);
      if (savedBudget) setBudget(JSON.parse(savedBudget));
    }
  }, []);

  // Budget calculation + Alerts
  useEffect(() => {
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const updated = {
      ...budget,
      spent: totalSpent,
      remaining: budget.total - totalSpent,
    };

    setBudget(updated);

    if (budgetSetupComplete) {
      localStorage.setItem("travelwise-budget", JSON.stringify(updated));
    }

    localStorage.setItem("travelwise-expenses", JSON.stringify(expenses));

    // ---- Budget Alert Logic (only ONCE per threshold) ----
    const percent = (totalSpent / budget.total) * 100;

    if (!shownAlerts.current.fifty && percent >= 50) {
      shownAlerts.current.fifty = true;
      toast({
        title: "🔔 Budget Notice",
        description: "You've used 50% of your budget.",
      });
    }

    if (!shownAlerts.current.seventyFive && percent >= 75) {
      shownAlerts.current.seventyFive = true;
      toast({
        title: "⚠️ Warning!",
        description: "You've crossed 75% of your budget.",
      });
    }

    if (!shownAlerts.current.ninety && percent >= 90) {
      shownAlerts.current.ninety = true;
      toast({
        title: "🚨 Critical Budget Warning!",
        description: "You've used more than 90% of your budget!",
        variant: "destructive",
      });
    }

  }, [expenses, budgetSetupComplete]);

  // Add Expense Handler
  const handleAddExpense = (data: Omit<Expense, "id">) => {
    setExpenses([...expenses, { ...data, id: crypto.randomUUID() }]);
  };

  // Delete Expense
  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // Save Budget Setup
  const handleSetBudget = () => {
    const val = parseFloat(budgetInput);
    if (val > 0) {
      const spent = expenses.reduce((sum, e) => sum + e.amount, 0);
      const newBudget = { total: val, spent, remaining: val - spent };

      setBudget(newBudget);
      setShowBudgetSetup(false);
      setBudgetSetupComplete(true);

      localStorage.setItem("travelwise-budget", JSON.stringify(newBudget));
      localStorage.setItem("travelwise-budget-setup", "true");
    }
  };

  // Reset budget + expenses
  const handleReset = () => {
    const history = JSON.parse(localStorage.getItem("travelwise-history") || "[]");
    history.push({ timestamp: Date.now(), expenses, budget });
    localStorage.setItem("travelwise-history", JSON.stringify(history));

    localStorage.removeItem("travelwise-budget");
    localStorage.removeItem("travelwise-budget-setup");
    localStorage.removeItem("travelwise-expenses");

    setExpenses([]);
    setBudget({ total: 5000, spent: 0, remaining: 5000 });
    setBudgetSetupComplete(false);
    setShowBudgetSetup(true);
    setBudgetInput("5000");

    shownAlerts.current = { fifty: false, seventyFive: false, ninety: false }; // reset alerts
  };

  // ---------------- UI START ----------------

  if (showBudgetSetup) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
        <div className="bg-white shadow-lg p-6 rounded-xl max-w-sm w-full">
          <h1 className="text-2xl font-bold text-center mb-3">Travel Budget</h1>
          <p className="text-gray-500 text-center mb-4">Enter your trip budget</p>

          <input
            type="number"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
            placeholder="5000"
          />

          <button
            onClick={handleSetBudget}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Start Planning
          </button>
        </div>
      </div>
    );
  }

return (
  <div className={darkMode ? "dark" : ""}>
    {/* VIDEO BACKGROUND CONTAINER */}
    <div className="relative min-h-screen overflow-hidden">

      {/* 🎥 Trekking Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/src/assets/trekk3.mp4" type="video/mp4" />
      </video>

      {/* 🌑 Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" /> */}
      <div className="absolute inset-0 bg-black/35" />


      {/* 🌟 DASHBOARD CONTENT */}
      <div className="relative z-10 min-h-screen flex">

        {/* SIDEBAR */}
        <aside className="hidden md:flex flex-col w-64 bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl border-r border-white/20 shadow-xl">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white">TravelWise</h1>
          </div>

          <nav className="p-4 flex-1 space-y-2 text-white">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/20 transition"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/history")}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/20 transition"
            >
              History
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/20 transition"
            >
              Profile
            </button>

            <button
              onClick={() => navigate("/chat")}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/20 transition"
            >
              🤖 AI Planner
            </button>
          </nav>

          <div className="p-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </aside>

        {/* MAIN PANEL */}
        <div className="flex-1 flex flex-col">

          {/* TOP BAR */}
          <header className="bg-white/20 backdrop-blur-xl border-b border-white/20 p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Dashboard</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setIsAddExpenseOpen(true)}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg"
              >
                Add Expense
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("travelwise-user");
                  navigate("/login");
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg"
              >
                Logout
              </button>
            </div>
          </header>

          {/* CONTENT */}
          <main className="p-6 space-y-6 overflow-y-auto flex-1">

            {/* BUDGET SUMMARY */}
            <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl text-white">
              <h3 className="text-lg font-semibold">Budget Summary</h3>
              <div className="grid md:grid-cols-3 gap-6 mt-4">
                <div className="p-4 rounded-xl bg-white/10">
                  <p>Total Budget</p>
                  <h1 className="text-3xl font-bold text-green-400">
                    ₹{budget.total.toLocaleString("en-IN")}
                  </h1>
                </div>
                <div className="p-4 rounded-xl bg-white/10">
                  <p>Total Spent</p>
                  <h1 className="text-3xl font-bold text-red-400">
                    ₹{budget.spent.toLocaleString("en-IN")}
                  </h1>
                </div>
                <div className="p-4 rounded-xl bg-white/10">
                  <p>Remaining</p>
                  <h1 className="text-3xl font-bold text-emerald-400">
                    ₹{budget.remaining.toLocaleString("en-IN")}
                  </h1>
                </div>
              </div>
            </div>

            {/* EXPENSE CHART */}
            <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-4">
                Expense Charts
              </h3>
              <ExpenseChart expenses={expenses} />
            </div>

            {/* RECENT EXPENSES */}
            {expenses.length > 0 ? (
              <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl space-y-3 text-white">
                {expenses.map((e) => (
                  <div
                    key={e.id}
                    className="p-4 rounded-xl bg-white/10 flex justify-between"
                  >
                    <div>
                      <p className="font-semibold">{e.title}</p>
                      <p className="text-sm text-gray-200">
                        {e.category} •{" "}
                        {new Date(e.date).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{e.amount}</p>
                      <button
                        onClick={() => handleDeleteExpense(e.id)}
                        className="mt-2 px-2 py-1 bg-red-500 text-white text-xs rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-200 text-center">
                No expenses yet. Add one to get started.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>

    {/* ADD EXPENSE MODAL (UNCHANGED) */}
    {isAddExpenseOpen && (
  <>
    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
      onClick={() => setIsAddExpenseOpen(false)}
    />

    {/* Modal Wrapper */}
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="
        bg-white 
        rounded-2xl 
        shadow-2xl 
        max-w-md 
        w-full 
        max-h-[85vh] 
        overflow-y-auto 
        p-6
        relative
      ">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Add New Expense
        </h2>

        {/* FORM (UNCHANGED) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const title = data.get("title");
            const amount = parseFloat(data.get("amount") as string);
            const category = data.get("category") as any;
            const date = data.get("date") as string;
            const description = data.get("description")?.toString() || "";

            if (!title || isNaN(amount)) return;

            handleAddExpense({
              title: title.toString(),
              amount,
              category,
              date,
              description,
            });

            setIsAddExpenseOpen(false);
          }}
          className="space-y-4"
        >
          <input
            name="title"
            placeholder="Expense Title"
            className="w-full p-3 border rounded-lg"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="amount"
              type="number"
              placeholder="Amount (₹)"
              className="p-3 border rounded-lg"
              required
            />

            <select name="category" className="p-3 border rounded-lg">
              <option>Food</option>
              <option>Transport</option>
              <option>Accommodation</option>
              <option>Shopping</option>
              <option>Activities</option>
              <option>Other</option>
            </select>
          </div>

          <input
            name="date"
            type="date"
            className="w-full p-3 border rounded-lg"
            defaultValue={new Date().toISOString().split("T")[0]}
          />

          <textarea
            name="description"
            placeholder="Optional description..."
            className="w-full p-3 border rounded-lg"
            rows={3}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddExpenseOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
)}
  </div>

);
}
