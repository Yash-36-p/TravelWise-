// const Expense = require("../models/expense");
// const Budget = require("../models/Budget");

// exports.addExpense = async (req, res) => {
//   try {
//     const amount = Number(req.body.amount);

//     const expense = await Expense.create({
//       ...req.body,
//       amount,
//     });

//     const expenses = await Expense.find({
//       userEmail: req.body.userEmail,
//     });

//     const spent = expenses.reduce(
//       (sum, e) => sum + Number(e.amount),
//       0
//     );

//     const budget = await Budget.findOne({
//       userEmail: req.body.userEmail,
//     });

//     if (budget) {
//       budget.spent = spent;
//       budget.remaining = Math.max(budget.total - spent, 0);
//       await budget.save();
//     }

//     res.json(expense);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getExpenses = async (req, res) => {
//   try {
//     const expenses = await Expense.find({
//       userEmail: req.params.email,
//     });
//     res.json(expenses);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


const Expense = require("../models/expense");
const Budget = require("../models/Budget");

exports.addExpense = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const amount = Number(req.body.amount);

    if (!userEmail || !Number.isFinite(amount)) {
      return res.status(400).json({ message: "Invalid data" });
    }

    // 1️⃣ Save expense
    const expense = await Expense.create({
      ...req.body,
      amount,
    });

    // 2️⃣ Recalculate total spent from DB
    const expenses = await Expense.find({ userEmail });

    const spent = expenses.reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    );

    // 3️⃣ Update budget
    const budget = await Budget.findOne({ userEmail });
    if (budget) {
      budget.spent = spent;
      budget.remaining = Math.max(budget.total - spent, 0);
      await budget.save();
    }

    res.json(expense);
  } catch (err) {
    console.error("Add Expense Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getExpenses = async (req, res) => {
  try {
    const { email } = req.params;
    const expenses = await Expense.find({ userEmail: email });
    res.json(expenses);
  } catch (err) {
    console.error("Get Expenses Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteExpensesByUser = async (req, res) => {
  try {
    const { email } = req.params;
    await Expense.deleteMany({ userEmail: email });
    res.json({ message: "Expenses cleared" });
  } catch (err) {
    console.error("Delete Expenses Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
