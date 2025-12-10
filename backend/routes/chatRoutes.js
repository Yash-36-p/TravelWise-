const express = require("express");
const { getChats, addChat } = require("../controllers/chatController");
const router = express.Router();

// GET /api/chat?userId=...
router.get("/", getChats);
// POST /api/chat
router.post("/", addChat);

module.exports = router;
