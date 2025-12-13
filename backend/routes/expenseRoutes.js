// const express = require("express");
// const { getExpenses, addExpense, deleteExpense } = require("../controllers/expenseController");
// const router = express.Router();

// // GET /api/expenses?userId=...
// router.get("/", getExpenses);
// // POST /api/expenses
// router.post("/", addExpense);
// // DELETE /api/expenses/:id
// router.delete("/:id", deleteExpense);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { getExpenses, addExpense, deleteExpense } = require("../controllers/expenseController");

// GET all expenses for a user
router.get("/", getExpenses);

// ADD expense
router.post("/", addExpense);

// DELETE expense
router.delete("/:id", deleteExpense);

module.exports = router;
