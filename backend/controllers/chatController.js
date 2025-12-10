const Chat = require("../models/Chat");

exports.getChats = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "userId required" });

  const chats = await Chat.find({ user: userId }).sort({ createdAt: -1 });
  res.json(chats);
};

exports.addChat = async (req, res) => {
  const { userId, query, response } = req.body;
  if (!userId) return res.status(400).json({ error: "userId required" });

  const newChat = await Chat.create({ user: userId, query, response });
  res.status(201).json(newChat);
};
