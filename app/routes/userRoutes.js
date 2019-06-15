const express = require("express");
const router = express();
const { User } = require("../models/user.js");
var config = require('../services/endPoints.json').users

router.post(config.getUsers, async (req, res) => {
    await User.create({
        firstName: 'John',
        lastName: "Doe",
        email: 'JohnJohni_papa@gmail.com'
    })
    res.send(await User.find())
})

module.exports = router;
