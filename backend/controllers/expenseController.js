
// // const Expense = require("../models/expense");
// // const Budget = require("../models/Budget");
// import Expense from "../models/expense.js";
// import Budget from "../models/Budget.js";


// exports.addExpense = async (req, res) => {
//   try {
//     // ✅ FORCE amount to number BEFORE saving
//     const expense = await Expense.create({
//       ...req.body,
//       amount: Number(req.body.amount),
//     });

//     // ✅ Get all expenses for user
//     const expenses = await Expense.find({
//       userEmail: req.body.userEmail,
//     });

//     // ✅ SAFE numeric sum
//     const spent = expenses.reduce(
//       (sum, e) => sum + Number(e.amount || 0),
//       0
//     );

//     // ✅ Update budget
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
//     console.error("Add Expense Error:", err);
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
//     console.error("Get Expense Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const Expense = require("../models/expense");
const Budget = require("../models/Budget");

exports.addExpense = async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    const expense = await Expense.create({
      ...req.body,
      amount,
    });

    const expenses = await Expense.find({
      userEmail: req.body.userEmail,
    });

    const spent = expenses.reduce(
      (sum, e) => sum + Number(e.amount),
      0
    );

    const budget = await Budget.findOne({
      userEmail: req.body.userEmail,
    });

    if (budget) {
      budget.spent = spent;
      budget.remaining = Math.max(budget.total - spent, 0);
      await budget.save();
    }

    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      userEmail: req.params.email,
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
