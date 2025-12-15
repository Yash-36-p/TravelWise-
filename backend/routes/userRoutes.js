// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");

// // LOGIN or REGISTER
// router.post("/login", async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({
//       message: "Email and password required",
//     });
//   }

//   let user = await User.findOne({ email });

//   // 🆕 NEW USER → CREATE ACCOUNT
//   if (!user) {
//     user = await User.create({
//       name: name || "User",
//       email,
//       password,
//     });

//     return res.json({
//       message: "Account created",
//       user,
//     });
//   }

//   // ❌ WRONG PASSWORD
//   if (user.password !== password) {
//     return res.status(401).json({
//       message: "Wrong password",
//     });
//   }

//   // ✅ LOGIN SUCCESS
//   res.json({
//     message: "Login successful",
//     user,
//   });
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });
  res.json({ message: "Account created", user });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Wrong password" });
  }

  res.json({ message: "Login successful", user });
});

module.exports = router;
