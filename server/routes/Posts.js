const express = require('express')
const router = express.Router()
const { Posts } = require('../models')  // Sequelize 

router.get("/", async (req, res) => {           // always use async await in Sequelize 
    const listOfPosts = await Posts.findAll()
    res.json(listOfPosts)
})

router.post("/", async (req, res) => {
    const post = req.body
    await Posts.create(post)
    res.json(post)
})

module.exports = router