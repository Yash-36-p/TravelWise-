import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Expense, Budget } from "@/types/expense";
import { ExpenseChart } from "@/components/Dashboard/ExpenseChart";
import { HistorySection } from "@/components/Dashboard/HistorySection";
import { toast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("travelwise-user") || "null");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  /* ---------------- STATE ---------------- */
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState({
    total: 0,
    spent: 0,
    remaining: 0,
  });


const [isResetting, setIsResetting] = useState(false);

   const [darkMode, setDarkMode] = useState(false);

  const [showBudgetSetup, setShowBudgetSetup] = useState(true);
  const [budgetInput, setBudgetInput] = useState("");
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const shownAlerts = useRef({
    fifty: false,
    seventyFive: false,
    ninety: false,
  });

  /* ---------------- FETCH FROM MONGODB ---------------- */

  useEffect(() => {
    if (!user?.email) return;

    // Fetch expenses
    fetch(`http://localhost:5000/api/expenses/${user.email}`)
      .then((res) => res.json())
      .then((data) => setExpenses(Array.isArray(data) ? data : []));

    // Fetch budget
    fetch(`http://localhost:5000/api/budget/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.total > 0) {
          setBudget({
            total: Number(data.total),
            spent: Number(data.spent || 0),
            remaining: Number(data.remaining || data.total),
          });
          setShowBudgetSetup(false);
        }
      });
  }, [user?.email]);


  useEffect(() => {
  if (isResetting) return;          // 🛑 VERY IMPORTANT
  if (!budget.total) return;

  if (!expenses.length) {
    setBudget((prev) => ({
      ...prev,
      spent: 0,
      remaining: prev.total,
    }));
    return;
  }

  const totalSpent = expenses.reduce((sum, e) => {
    const amt = Number(e.amount);
    return Number.isFinite(amt) ? sum + amt : sum;
  }, 0);

  setBudget((prev) => ({
    ...prev,
    spent: totalSpent,
    remaining: Math.max(prev.total - totalSpent, 0),
  }));

  const percent = (totalSpent / budget.total) * 100;

  if (!shownAlerts.current.fifty && percent >= 50) {
    shownAlerts.current.fifty = true;
    toast({ title: "🔔 50% of budget used" });
  }

  if (!shownAlerts.current.seventyFive && percent >= 75) {
    shownAlerts.current.seventyFive = true;
    toast({ title: "⚠️ 75% budget warning" });
  }

  if (!shownAlerts.current.ninety && percent >= 90) {
    shownAlerts.current.ninety = true;
    toast({
      title: "🚨 90% Budget Used",
      variant: "destructive",
    });
  }
}, [expenses, budget.total, isResetting]);

  
 

const handleSetBudget = () => {
  const val = Number(budgetInput);
  if (!Number.isFinite(val) || val <= 0) return;

  fetch("http://localhost:5000/api/budget", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userEmail: user.email,
      total: val,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setBudget({
        total: data.total,
        spent: data.spent,
        remaining: data.remaining,
      });
      setShowBudgetSetup(false);
    });
};


const handleAddExpense = (data) => {
  const amount = Number(data.amount);
  if (!Number.isFinite(amount)) return;

  fetch("http://localhost:5000/api/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      amount,
      userEmail: user.email,
    }),
  })
    .then((res) => res.json())
    .then(async (saved) => {
      setExpenses((prev) => [...prev, saved]);

      const budgetRes = await fetch(
        `http://localhost:5000/api/budget/${user.email}`
      );
      const updatedBudget = await budgetRes.json();

      setBudget({
        total: updatedBudget.total,
        spent: updatedBudget.spent,
        remaining: updatedBudget.remaining,
      });
    });
};



const handleReset = async () => {
  try {
    setIsResetting(true); 

    await fetch(`http://localhost:5000/api/expenses/user/${user.email}`, {
      method: "DELETE",
    });

    await fetch(`http://localhost:5000/api/budget/${user.email}`, {
      method: "DELETE",
    });

    setExpenses([]);
    setBudget({ total: 0, spent: 0, remaining: 0 });
    setShowBudgetSetup(true);

    shownAlerts.current = {
      fifty: false,
      seventyFive: false,
      ninety: false,
    };
  } catch (err) {
    console.error("Reset failed", err);
  } finally {
    setTimeout(() => setIsResetting(false), 0);
  }
};


  const handleDeleteExpense = (id) => {
    fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: "DELETE",
    }).then(() => {
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    });
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
    <div className="relative min-h-screen overflow-hidden">

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/src/assets/trekk3.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/35" />


      <div className="relative z-10 min-h-screen flex">

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

            <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-4">
                Expense Charts
              </h3>
              <ExpenseChart expenses={expenses} />
            </div>

            
{expenses.length > 0 ? (
  <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl space-y-3 text-white">
    {expenses.map((e) => (
      <div
        key={e._id} 
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
            onClick={() => handleDeleteExpense(e._id)} // ✅ FIXED
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

    {isAddExpenseOpen && (
  <>
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
