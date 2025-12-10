import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Expense, Budget } from "@/types/expense";
import { ExpenseChart } from "@/components/Dashboard/ExpenseChart";
import { HistorySection } from "@/components/Dashboard/HistorySection";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<Budget>({
    total: 5000,
    spent: 0,
    remaining: 5000,
  });
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [showBudgetSetup, setShowBudgetSetup] = useState(true);
  const [budgetSetupComplete, setBudgetSetupComplete] = useState(false);
  const [budgetInput, setBudgetInput] = useState("5000");

  const navigate = useNavigate();

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

  useEffect(() => {
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const updated = {
      ...budget,
      spent: totalSpent,
      remaining: budget.total - totalSpent,
    };
    setBudget(updated);

    if (budgetSetupComplete)
      localStorage.setItem("travelwise-budget", JSON.stringify(updated));
    localStorage.setItem("travelwise-expenses", JSON.stringify(expenses));
  }, [expenses, budgetSetupComplete]);

  const handleAddExpense = (data: Omit<Expense, "id">) => {
    setExpenses([...expenses, { ...data, id: crypto.randomUUID() }]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

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

  const handleReset = () => {
    if (expenses.length > 0) {
      const history = JSON.parse(
        localStorage.getItem("travelwise-history") || "[]"
      );
      history.push({ timestamp: Date.now(), expenses, budget });
      localStorage.setItem("travelwise-history", JSON.stringify(history));
    }
    localStorage.removeItem("travelwise-budget");
    localStorage.removeItem("travelwise-budget-setup");
    localStorage.removeItem("travelwise-expenses");
    setExpenses([]);
    setBudget({ total: 5000, spent: 0, remaining: 5000 });
    setShowBudgetSetup(true);
    setBudgetSetupComplete(false);
    setBudgetInput("5000");
  };

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
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">

        {/* SIDEBAR */}
        <aside className="hidden md:flex flex-col w-64 bg-white/70 dark:bg-gray-800/70 backdrop-blur shadow-lg">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-cyan-600 dark:text-cyan-300">TravelWise</h1>
          </div>
          <nav className="p-4 flex-1 space-y-2">
            <div className="px-4 py-2 rounded-lg bg-cyan-100 dark:bg-gray-700">Dashboard</div>
          </nav>
          <div className="p-4">
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </aside>

        {/* MAIN PANEL */}
        <div className="flex-1 flex flex-col">
          {/* TOP BAR */}
          <header className="bg-white/70 dark:bg-gray-800/70 backdrop-blur shadow-md p-4 flex justify-between">
            <h2 className="text-xl font-semibold dark:text-white">Dashboard</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setIsAddExpenseOpen(true)}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg"
              >
                Add Expense
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("travelwise-user");
                  navigate("/login");
                }}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg"
              >
                Logout
              </button>
            </div>
          </header>

          <main className="p-6 space-y-6 overflow-y-auto flex-1">
            {/* Budget Summary */}
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold dark:text-white">Budget Summary</h3>
              <div className="grid md:grid-cols-3 gap-6 mt-4">
                <div className="p-4 bg-cyan-50 dark:bg-gray-700 rounded-lg">
                  <p className="">Total Budget</p>
                  <h1 className="text-3xl font-bold text-3xl font-bold text-green-600 dark:text-green-400">
                    ₹{budget.total.toLocaleString("en-IN")}
                  </h1>
                </div>
                <div className="p-4 bg-red-50 dark:bg-gray-700 rounded-lg">
                  <p>Total Spent</p>
                  <h1 className="text-3xl font-bold text-red-500">
                    ₹{budget.spent.toLocaleString("en-IN")}
                  </h1>
                </div>
                <div className="p-4 bg-green-50 dark:bg-gray-700 rounded-lg">
                  <p>Remaining</p>
                  <h1 className="text-3xl font-bold text-green-600">
                    ₹{budget.remaining.toLocaleString("en-IN")}
                  </h1>
                </div>
              </div>
            </div>

            {/* Expense Chart */}
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Expense Charts</h3>
              <ExpenseChart expenses={expenses} />
            </div>

            {/* History Section */}
            <HistorySection />

            {/* Recent Expenses */}
            {expenses.length > 0 ? (
              <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow space-y-3">
                {expenses.map((e) => (
                  <div
                    key={e.id}
                    className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 flex justify-between"
                  >
                    <div>
                      <p className="font-semibold dark:text-white">{e.title}</p>
                      <p className="text-sm dark:text-gray-300">
                        {e.category} • {new Date(e.date).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold dark:text-white">₹{e.amount}</p>
                      <button
                        onClick={() => handleDeleteExpense(e.id)}
                        className="text-xs mt-2 bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-center">
                No expenses yet. Add one to get started.
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Add Expense Modal */}
      {isAddExpenseOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={() => setIsAddExpenseOpen(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold mb-4">Add New Expense</h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  const title = data.get("title");
                  const amountStr = data.get("amount") as string;
                  const amount = parseFloat(amountStr);
                  const category = data.get("category") as any;
                  const date = data.get("date") as string;
                  const description = data.get("description")?.toString() || "";

                  if (!title || isNaN(amount)) {
                    alert("Please fill required fields");
                    return;
                  }

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
                  placeholder=" Optional description..."
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
