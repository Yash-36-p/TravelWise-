// const express = require("express");
// const { getProfile, updateProfile } = require("../controllers/userController");
// const router = express.Router();

// // GET /api/user/profile?userId=...
// router.get("/profile", getProfile);
// // PUT /api/user/profile
// router.put("/profile", updateProfile);

// module.exports = router;

const express = require("express");
const router = express.Router();

// TEST ROUTE
router.get("/test", (req, res) => {
  res.send("User API working 🚀");
});

module.exports = router;
