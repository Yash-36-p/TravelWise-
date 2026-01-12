
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
