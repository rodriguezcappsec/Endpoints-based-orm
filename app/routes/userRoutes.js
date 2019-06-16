const express = require("express");
const router = express();
const { User } = require("../models/user.js");
var config = require('../services/endPoints.json').users

router.post(config.post_user, async (req, res) => {
    await User.create({
        firstName: 'John',
        lastName: "doeeee",
        email: 'JohnJohni_papa@gmail.com'
    })
    res.send(await User.find())
})
router.get(config.get_user, async (req, res) => {
    res.send(await User.find())
})

module.exports = router;
