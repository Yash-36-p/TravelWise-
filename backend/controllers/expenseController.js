const Expense = require("../models/Expense");

exports.getExpenses = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "userId required" });

  const expenses = await Expense.find({ user: userId }).sort({ date: -1 });
  res.json(expenses);
};

exports.addExpense = async (req, res) => {
  const { userId, title, amount, category, date, description } = req.body;
  if (!userId) return res.status(400).json({ error: "userId required" });

  const newExpense = await Expense.create({ user: userId, title, amount, category, date, description });
  res.status(201).json(newExpense);
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  await Expense.findByIdAndDelete(id);
  res.json({ success: true });
};
