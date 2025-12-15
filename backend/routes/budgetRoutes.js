// const express = require("express");
// const router = express.Router();
// const Budget = require("../models/Budget");

// // GET budget
// router.get("/:email", async (req, res) => {
//   const budget = await Budget.findOne({ userEmail: req.params.email });
//   res.json(budget);
// });

// // SET / UPDATE budget
// router.post("/", async (req, res) => {
//   const { userEmail, total, spent, remaining } = req.body;

//   const budget = await Budget.findOneAndUpdate(
//     { userEmail },
//     { total, spent, remaining },
//     { upsert: true, new: true }
//   );

//   res.json(budget);
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  setBudget,
  getBudget,
} = require("../controllers/budgetController");

router.post("/", setBudget);
router.get("/:email", getBudget);

module.exports = router;
