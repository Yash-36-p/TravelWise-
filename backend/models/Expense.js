// const mongoose = require("mongoose");

// const expenseSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     amount: {
//       type: Number,      // 🔥 MUST BE NUMBER
//       required: true,
//     },

//     category: {
//       type: String,
//       default: "Other",
//     },

//     date: {
//       type: Date,
//       default: Date.now,
//     },

//     description: {
//       type: String,
//     },

//     userEmail: {
//       type: String,
//       required: true,
//       index: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Expense", expenseSchema);

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
