const express = require('express')
const router = express.Router()
const { Users } = require('../models')  // Sequelize 
const bcrypt = require('bcrypt')        // change password for security

// REGISTRATION
router.post("/", async (req, res) => {
    const { username, password } = req.body
    bcrypt.hash(password, 10).then((hash) => {               // 10 is just some value, doesn't matter
        Users.create({
            username: username,
            password: hash
        })
        res.json("SUCCESS")
    })
})

// LOGIN
router.post("/login", async (req, res) => {
    const { username, password } = req.body

    const user = await Users.findOne({ where: { username: username } })

    if (!user) res.json({ error: "User Doesn't Exist" })

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({ error: "Wrong Username And Password Combination" })

        res.json("You Logged In")
    })
})

module.exports = router