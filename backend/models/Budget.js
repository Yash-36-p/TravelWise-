// const mongoose = require("mongoose");

// const budgetSchema = new mongoose.Schema(
//   {
//     userEmail: {
//       type: String,
//       required: true,
//       unique: true,
//       index: true,
//     },

//     total: {
//       type: Number,
//       required: true,
//     },

//     spent: {
//       type: Number,
//       default: 0,
//     },

//     remaining: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Budget", budgetSchema);

const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true, unique: true },
    total: { type: Number, required: true },
    spent: { type: Number, default: 0 },
    remaining: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);
