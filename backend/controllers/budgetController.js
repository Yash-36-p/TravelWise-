const Budget = require("../models/Budget");

// GET budget
exports.getBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({ userId: req.query.userId });
    res.json(budget || { total: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE or SET budget
exports.setBudget = async (req, res) => {
  try {
    const { userId, total } = req.body;

    const budget = await Budget.findOneAndUpdate(
      { userId },
      { total },
      { upsert: true, new: true }
    );

    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
