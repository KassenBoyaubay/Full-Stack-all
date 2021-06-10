const express = require('express')
const router = express.Router()
const { Comments } = require('../models')  // Sequelize 

router.get("/:postId", async (req, res) => {
    // req.params.postId is same as :postId in url
    const postId = req.params.postId

    // find by postId 
    // return every row where PostId in table is postId
    const comments = await Comments.findAll({ where: { PostId: postId } })
    res.json(comments)
})

router.post("/", async (req, res) => {
    const comment = req.body
    await Comments.create(comment)
    res.json(comment)
})

module.exports = router