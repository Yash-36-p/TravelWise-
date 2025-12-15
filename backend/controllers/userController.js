// const User = require("../models/User");

// exports.getProfile = async (req, res) => {
//   const { userId } = req.query;
//   if (!userId) return res.status(400).json({ error: "userId required" });

//   const user = await User.findById(userId);
//   if (!user) return res.status(404).json({ error: "User not found" });
//   res.json(user);
// };

// exports.updateProfile = async (req, res) => {
//   const { userId, name, email, profilePhoto, defaultCurrency, defaultBudget } = req.body;
//   if (!userId) return res.status(400).json({ error: "userId required" });

//   const user = await User.findByIdAndUpdate(
//     userId,
//     { name, email, profilePhoto, defaultCurrency, defaultBudget },
//     { new: true, runValidators: true }
//   );
//   if (!user) return res.status(404).json({ error: "User not found" });
//   res.json(user);
// };
// router.get("/check-db", async (req, res) => {
//   try {
//     const result = await mongoose.connection.db.admin().ping();
//     res.json({ status: "MongoDB connected", result });
//   } catch (error) {
//     res.status(500).json({ status: "DB error", error });
//   }
// });

const User = require("../models/User");

// LOGIN / REGISTER USER
exports.loginUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
