
// // const express = require("express");
// // const router = express.Router();

// // // TEST ROUTE
// // router.get("/test", (req, res) => {
// //   res.send("User API working 🚀");
// // });

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { loginUser } = require("../controllers/userController");

// router.post("/login", loginUser);

// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create or get user
router.post("/login", async (req, res) => {
  const { name, email } = req.body;

  if (!email) return res.status(400).json({ error: "Email required" });

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ name, email });
  }

  res.json(user);
});

module.exports = router;
