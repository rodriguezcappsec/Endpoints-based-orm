const express = require("express");
const router = express();

const { User } = require("../models/user.js");
//FOR TESTING PURPOSES.

function authToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Unauthorized. No token provided");

  try {
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}
//FOR TESTING PURPOSES.
router.post("/api/v1/users", authToken, async (req, res) => {
  res.send(req.body);
  // await User.create({
  //   firstName: "el tipo",
  //   lastName: "klklklk",
  //   email: "JohnJohni@example.com"
  // });
  //   await User.create({
  //   firstName: "another",
  //   lastName: "another",
  //   email: "klk_mi_creisi@example.com"
  // }).catch(data=> console.log(data))
  // res.send(await User.find());
});
router.patch("/api/v1/users/:id", authToken, async (req, res) => {
  // let user = await User.findById(req.params.id).catch((err)=>console.log(err))

  res.send({ id: req.params.id, body: req.body });
});
router.get("/api/v1/users", async (req, res) => {
  res.send(await User.find());
});
router.patch("/api/v1/users/:id", authToken, async (req, res) => {
  // let user = await User.findById(req.params.id).catch((err)=>console.log(err))

  res.send({ id: req.params.id, body: req.body });
});
router.get("/api/v1/users/:id", authToken, async (req, res) => {
  // let user = await User.findById(req.params.id).catch((err)=>console.log(err))
  let user = await User.find({ $and: [{ _id: { $eq: req.params.id } }] });
  res.send(user);
});

module.exports = router;
