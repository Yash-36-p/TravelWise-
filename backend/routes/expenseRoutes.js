
// const express = require("express");
// const router = express.Router();
// const {
//   addExpense,
//   getExpenses,
// } = require("../controllers/expenseController");

// router.post("/", addExpense);
// router.get("/:email", getExpenses);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  addExpense,
  getExpenses,
  deleteExpensesByUser,
} = require("../controllers/expenseController");

router.post("/", addExpense);
router.get("/:email", getExpenses);

// 🔥 THIS ROUTE WAS MISSING (CAUSE OF BUG)
router.delete("/user/:email", deleteExpensesByUser);

module.exports = router;
