import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Expense, Budget } from "@/types/expense";
import { ExpenseChart } from "@/components/Dashboard/ExpenseChart";
import { HistorySection } from "@/components/Dashboard/HistorySection";

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<Budget>({ total: 5000, spent: 0, remaining: 5000 });
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [showBudgetSetup, setShowBudgetSetup] = useState(true);
  const [budgetSetupComplete, setBudgetSetupComplete] = useState(false);
  const [budgetInput, setBudgetInput] = useState("5000");
  const navigate = useNavigate();

  useEffect(() => {
    const savedExpenses = localStorage.getItem("travelwise-expenses");
    const savedBudget = localStorage.getItem("travelwise-budget");
    const budgetSetupComplete = localStorage.getItem("travelwise-budget-setup");

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
    // Only load a saved budget if the user previously completed the setup
    if (budgetSetupComplete) {
      setBudgetSetupComplete(true);
      setShowBudgetSetup(false);
      if (savedBudget) {
        setBudget(JSON.parse(savedBudget));
      }
    }
  }, []);

  useEffect(() => {
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const updatedBudget = {
      ...budget,
      spent: totalSpent,
      remaining: budget.total - totalSpent
    };
    setBudget(updatedBudget);
    // Only persist the budget if the user completed the initial setup
    if (budgetSetupComplete) {
      localStorage.setItem("travelwise-budget", JSON.stringify(updatedBudget));
    }
    localStorage.setItem("travelwise-expenses", JSON.stringify(expenses));
  }, [expenses, budgetSetupComplete]);

  const handleAddExpense = (expenseData: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expenseData,
      id: crypto.randomUUID()
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleSetBudget = () => {
    const budgetValue = parseFloat(budgetInput);
    if (budgetValue > 0) {
      const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      setBudget({
        total: budgetValue,
        spent: totalSpent,
        remaining: budgetValue - totalSpent
      });
      setShowBudgetSetup(false);
      setBudgetSetupComplete(true);
      localStorage.setItem("travelwise-budget", JSON.stringify({
        total: budgetValue,
        spent: totalSpent,
        remaining: budgetValue - totalSpent
      }));
      localStorage.setItem("travelwise-budget-setup", "true");
    }
  };

  if (showBudgetSetup) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "sans-serif" }}>
        <div style={{ maxWidth: "400px", width: "100%", backgroundColor: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px", textAlign: "center" }}>Travel Budget</h1>
          <p style={{ marginBottom: "20px", color: "#666", textAlign: "center" }}>Enter your budget in INR</p>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", fontSize: "14px" }}>Total Trip Budget (₹)</label>
            <input 
              type="number" 
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "16px", boxSizing: "border-box" }}
              placeholder="5000"
            />
          </div>
          <button 
            onClick={handleSetBudget}
            style={{ width: "100%", padding: "12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", fontSize: "16px", fontWeight: "600", cursor: "pointer", marginTop: "10px" }}
          >
            Start Planning
          </button>
        </div>
      </div>
    );
  }

  const handleReset = () => {
    // Save current expenses to history before clearing
    if (expenses.length > 0) {
      const history = JSON.parse(localStorage.getItem("travelwise-history") || "[]");
      history.push({
        timestamp: Date.now(),
        expenses,
        budget,
      });
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

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", fontFamily: "sans-serif" }}>
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #ddd", padding: "20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>TravelWise</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <button 
              onClick={() => setIsAddExpenseOpen(true)}
              style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "14px" }}
            >
              Add Expense
            </button>
            <button 
              onClick={handleReset}
              style={{ padding: "8px 16px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "14px" }}
            >
              Reset
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("travelwise-user");
                navigate("/login");
              }}
              style={{ padding: "8px 16px", backgroundColor: "#6b7280", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "14px" }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>Budget Summary</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
            <div style={{ padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "6px" }}>
              <p style={{ color: "#666", fontSize: "14px", marginBottom: "5px" }}>Total Budget</p>
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>₹{budget.total.toLocaleString("en-IN")}</p>
            </div>
            <div style={{ padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "6px" }}>
              <p style={{ color: "#666", fontSize: "14px", marginBottom: "5px" }}>Total Spent</p>
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#dc3545" }}>₹{budget.spent.toLocaleString("en-IN")}</p>
              <p style={{ fontSize: "12px", color: "#999", marginTop: "5px" }}>{((budget.spent / budget.total) * 100).toFixed(1)}% of budget</p>
            </div>
            <div style={{ padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "6px" }}>
              <p style={{ color: "#666", fontSize: "14px", marginBottom: "5px" }}>Remaining</p>
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#28a745" }}>₹{budget.remaining.toLocaleString("en-IN")}</p>
              <p style={{ fontSize: "12px", color: "#999", marginTop: "5px" }}>{(100 - (budget.spent / budget.total) * 100).toFixed(1)}% left</p>
            </div>
          </div>
        </div>
        {/* Charts Section */}
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>Expense Charts</h2>
          <ExpenseChart expenses={expenses} />
        </div>

        {/* History Section */}
        <HistorySection />

        {expenses.length > 0 && (
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>Recent Expenses</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {expenses.map((expense) => (
                <div key={expense.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", borderBottom: "1px solid #eee" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: "500", marginBottom: "3px" }}>{expense.title}</p>
                    <div style={{ display: "flex", gap: "15px", fontSize: "12px", color: "#666" }}>
                      <span>{expense.category}</span>
                      <span>{new Date(expense.date).toLocaleDateString("en-IN")}</span>
                    </div>
                    {expense.description && <p style={{ fontSize: "12px", color: "#999", marginTop: "5px" }}>{expense.description}</p>}
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <p style={{ fontWeight: "bold", fontSize: "16px", minWidth: "100px", textAlign: "right" }}>₹{expense.amount.toLocaleString("en-IN")}</p>
                    <button 
                      onClick={() => handleDeleteExpense(expense.id)}
                      style={{ padding: "4px 8px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {expenses.length === 0 && (
          <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "8px", textAlign: "center", color: "#999" }}>
            <p>No expenses yet. Click "Add Expense" to get started!</p>
          </div>
        )}
      </main>
      
      {isAddExpenseOpen && (
        <>
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999 }} onClick={() => setIsAddExpenseOpen(false)} />
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "30px", borderRadius: "8px", maxWidth: "500px", width: "90%", boxShadow: "0 4px 20px rgba(0,0,0,0.3)", zIndex: 1000, maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>Add New Expense</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const title = formData.get("title") as string;
              const amount = formData.get("amount") as string;
              const category = formData.get("category") as string;
              const date = formData.get("date") as string;
              const description = formData.get("description") as string;
              
              if (!title.trim() || !amount || parseFloat(amount) <= 0) {
                alert("Please fill in all required fields");
                return;
              }
              
              handleAddExpense({
                title: title.trim(),
                amount: parseFloat(amount),
                category: category as any,
                date,
                description: description.trim()
              });
              setIsAddExpenseOpen(false);
            }} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Expense Title *</label>
                <input name="title" placeholder="e.g., Dinner at Restaurant" style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px", boxSizing: "border-box" }} required />
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Amount (₹) *</label>
                  <input name="amount" type="number" step="0.01" min="0" placeholder="0.00" style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px", boxSizing: "border-box" }} required />
                </div>
                
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Category *</label>
                  <select name="category" defaultValue="Food" style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px", boxSizing: "border-box" }}>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Accommodation">Accommodation</option>
                    <option value="Activities">Activities</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Date *</label>
                <input name="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px", boxSizing: "border-box" }} required />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Description (Optional)</label>
                <textarea name="description" placeholder="Add any additional notes..." style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px", boxSizing: "border-box", minHeight: "80px" }} />
              </div>
              
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button type="button" onClick={() => setIsAddExpenseOpen(false)} style={{ padding: "10px 20px", backgroundColor: "#f0f0f0", border: "1px solid #ddd", borderRadius: "4px", cursor: "pointer", fontSize: "14px" }}>Cancel</button>
                <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "14px" }}>Add Expense</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
