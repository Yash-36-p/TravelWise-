// const express = require("express");
// const User = require("../models/User");

// const router = express.Router();

// // GET PROFILE
// router.get("/:email", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.params.email });

//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // UPDATE PROFILE
// router.put("/:email", async (req, res) => {
//   try {
//     const { name } = req.body;

//     const user = await User.findOneAndUpdate(
//       { email: req.params.email },
//       { name },
//       { new: true }
//     );

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET profile
router.get("/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  res.json(user);
});

// CREATE / UPDATE profile
router.post("/", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { email: req.body.email },
    req.body,
    { upsert: true, new: true }
  );
  res.json(user);
});

module.exports = router;
