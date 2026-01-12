// const express = require('express');
// const path = require('path');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { User, Expense } = require('./models');
// const app = express();
// const PORT = process.env.PORT || 5000;
// dotenv.config({ path: path.join(__dirname, '.env') });

// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB error:', err));

// // Auth middleware
// function auth(req, res, next) {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'No token' });
//   try {
//     req.user = jwt.verify(token, process.env.JWT_SECRET);
//     next();
//   } catch {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// }

// // User signup
// app.post('/api/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
//   const hash = await bcrypt.hash(password, 10);
//   try {
//     const user = await User.create({ name, email, password: hash });
//     res.json({ success: true });
//   } catch (err) {
//     res.status(400).json({ error: 'Email already exists' });
//   }
// });

// // User login
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ error: 'Invalid credentials' });
//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
//   const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
//   res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
// });

// // Get expenses (protected)
// app.get('/api/expenses', auth, async (req, res) => {
//   const expenses = await Expense.find({ user: req.user.id });
//   res.json(expenses);
// });

// // Add expense (protected)
// app.post('/api/expenses', auth, async (req, res) => {
//   const { title, amount, category, date, description } = req.body;
//   const expense = await Expense.create({
//     user: req.user.id,
//     title,
//     amount,
//     category,
//     date,
//     description,
//   });
//   res.json(expense);
// });

// // Serve React build
// app.use(express.static(path.join(__dirname, '../dist')));

// // Fallback to React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

dotenv.config();   // Render reads env vars automatically

const { User, Expense } = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow frontend to talk to backend
app.use(cors({
  origin: "*", // later you can restrict to your Vercel URL
  credentials: true
}));

app.use(express.json());

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));


// ================= AUTH MIDDLEWARE =================
function auth(req, res, next) {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({ error: "No token" });
  }

  const token = header.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}


// ================= AUTH ROUTES =================

// REGISTER
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    await User.create({ name, email, password: hash });
    res.json({ success: true });
  } catch {
    res.status(400).json({ error: "Email already exists" });
  }
});


// LOGIN
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
});


// ================= EXPENSE ROUTES =================

// GET expenses
app.get("/api/expenses", auth, async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id });
  res.json(expenses);
});

// ADD expense
app.post("/api/expenses", auth, async (req, res) => {
  const { title, amount, category, date, description } = req.body;

  const expense = await Expense.create({
    user: req.user.id,
    title,
    amount,
    category,
    date,
    description,
  });

  res.json(expense);
});


// ================= PRODUCTION FRONTEND =================

// Only use this if you deploy frontend with backend (single Render deploy)
app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});


// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
