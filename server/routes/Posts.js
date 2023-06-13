const express = require('express')
const router = express.Router()

//post variable
const { Posts, Likes } = require('../models')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.get('/', validateToken, async (req, res) => {
    const listOfPosts = await Posts.findAll({ include: [Likes] })

    const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } })
    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts })
})

router.get('/byId/:id', async (req, res) => {
    let id = req.params.id
    const post = await Posts.findByPk(id)
    res.json(post)
})

router.get('/byUserId/:id', async (req, res) => {
    let id = req.params.id
    const listOfPosts = await Posts.findAll({ where: { UserId: id }, include: [Likes] })
    res.json(listOfPosts)
})

router.post('/', validateToken, async (req, res) => { /*  making a post request to the post route*/
    const post = req.body /*Grab the post data from the body that is sent  in the request*/
    post.username = req.user.username
    post.UserId = req.user.id
    await Posts.create(post) /*Sequelize function to insert post data into our table called post */
    res.json(post)
})

router.delete('/:postId', validateToken, async (req, res) => {
    const postId = req.params.postId
    await Posts.destroy({
        where: { id: postId }
    })
    res.json('Post Deleted')
})
module.exports = router