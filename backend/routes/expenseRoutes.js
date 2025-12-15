// const express = require("express");
// const router = express.Router();
// const Budget = require("../models/Budget");

// // GET budget for user
// router.get("/:email", async (req, res) => {
//   try {
//     const budget = await Budget.findOne({ userEmail: req.params.email });
//     res.json(budget);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // SAVE / UPDATE budget
// router.post("/", async (req, res) => {
//   try {
//     const { userEmail } = req.body;

//     const budget = await Budget.findOneAndUpdate(
//       { userEmail },
//       req.body,
//       { upsert: true, new: true }
//     );

//     res.json(budget);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  addExpense,
  getExpenses,
} = require("../controllers/expenseController");

router.post("/", addExpense);
router.get("/:email", getExpenses);

module.exports = router;
