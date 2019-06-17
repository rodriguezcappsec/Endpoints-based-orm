const express = require("express");
const router = express();
const {
  User
} = require("../models/user.js");
//FOR TESTING PURPOSES.
router.post("/api/v1/users", async (req, res) => {
  await User.create({
    firstName: "el tipo",
    lastName: "klklklk",
    email: "JohnJohni@example.com"
  });
  res.send(await User.find());
});

router.get("/api/v1/users", async (req, res) => {
  res.send(await User.find());
});

router.get("/api/v1/users/:id", async (req, res) => {
  // let user = await User.findById(req.params.id).catch((err)=>console.log(err))
  let user = await User.find({ $and: [ { _id: { $eq: req.params.id } }]})
  res.send(user);
});

module.exports = router;