// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");

// const userRoutes = require("./routes/userRoutes");
// const expenseRoutes = require("./routes/expenseRoutes");
// const chatRoutes = require("./routes/chatRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // connect to DB
// connectDB();

// // routes
// app.use("/api/users", userRoutes);
// app.use("/api/expenses", expenseRoutes);
// app.use("/api/chat", chatRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// connect to DB
connectDB();

// routes
app.use("/api/user", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => res.send("API Running ✔"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
