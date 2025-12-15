// const Budget = require("../models/Budget");

// exports.setBudget = async (req, res) => {
//   const { userEmail, total } = req.body;

//   const budget = await Budget.findOneAndUpdate(
//     { userEmail },
//     { total, spent: 0, remaining: total },
//     { upsert: true, new: true }
//   );

//   res.json(budget);
// };

// exports.getBudget = async (req, res) => {
//   const { email } = req.params;
//   const budget = await Budget.findOne({ userEmail: email });
//   res.json(budget);
// };

const Budget = require("../models/Budget");

exports.setBudget = async (req, res) => {
  const { userEmail, total } = req.body;

  let budget = await Budget.findOne({ userEmail });

  if (!budget) {
    budget = await Budget.create({
      userEmail,
      total,
      spent: 0,
      remaining: total,
    });
  } else {
    budget.total = total;
    budget.remaining = Math.max(total - budget.spent, 0);
    await budget.save();
  }

  res.json(budget);
};

exports.getBudget = async (req, res) => {
  const budget = await Budget.findOne({
    userEmail: req.params.email,
  });
  res.json(budget);
};
