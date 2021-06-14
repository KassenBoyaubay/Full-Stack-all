const express = require('express')
const router = express.Router()
const { Posts, Likes } = require('../models')  // Sequelize 
const { validateToken } = require('../middlewares/AuthMiddleware')

router.get("/", validateToken, async (req, res) => {           // always use async await in Sequelize 
    // Likes is associated, so it can get together w/ Post. Include all likes from LIKES table, where PostId is same as this post's id
    const listOfPosts = await Posts.findAll({ include: [Likes] })

    // Likes that logged-in user liked before
    const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } })
    res.json({ listOfPosts, likedPosts })
})

router.get("/byId/:id", async (req, res) => {
    // req.params.id is same as :id in url
    const id = req.params.id

    // find by primary key (by id)
    // return row by id
    const post = await Posts.findByPk(id)
    res.json(post)
})

router.post("/", async (req, res) => {
    const post = req.body
    await Posts.create(post)
    res.json(post)
})

module.exports = router