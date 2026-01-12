require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/user", userRoutes); 
app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);

app.get("/", (req, res) => {
  res.send("API Running ✔");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
