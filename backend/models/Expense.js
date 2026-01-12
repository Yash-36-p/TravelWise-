
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, default: "Other" },
    description: String,
    date: { type: Date, default: Date.now },
    userEmail: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
