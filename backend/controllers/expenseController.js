// const Expense = require("../models/Expense");

// exports.getExpenses = async (req, res) => {
//   const { userId } = req.query;
//   if (!userId) return res.status(400).json({ error: "userId required" });

//   const expenses = await Expense.find({ user: userId }).sort({ date: -1 });
//   res.json(expenses);
// };

// exports.addExpense = async (req, res) => {
//   const { userId, title, amount, category, date, description } = req.body;
//   if (!userId) return res.status(400).json({ error: "userId required" });

//   const newExpense = await Expense.create({ user: userId, title, amount, category, date, description });
//   res.status(201).json(newExpense);
// };

// exports.deleteExpense = async (req, res) => {
//   const { id } = req.params;
//   await Expense.findByIdAndDelete(id);
//   res.json({ success: true });
// };

const Expense = require("../models/Expense");

// GET all expenses for a user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.query.userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD new expense
exports.addExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

