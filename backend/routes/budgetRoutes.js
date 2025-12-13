const express = require("express");
const router = express.Router();
const { getBudget, setBudget } = require("../controllers/budgetController");

router.get("/", getBudget);   // fetch budget
router.put("/", setBudget);   // update budget

module.exports = router;
