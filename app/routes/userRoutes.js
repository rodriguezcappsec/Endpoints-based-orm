const express = require("express");
const router = express();
const { User } = require("../models/user.js");

router.post("/api/v1/users", async (req, res) => {
  await User.create({
    firstName: "John",
    lastName: "doeeee",
    email: "JohnJohni_papa@gmail.com"
  });
  res.send(await User.find());
});

router.get("/api/v1/users", async (req, res) => {
  res.send(await User.find());
});

module.exports = router;
