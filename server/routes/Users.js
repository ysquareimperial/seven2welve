const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Users } = require('../models')

//sign creates token
const { sign } = require('jsonwebtoken')
const { validateToken } = require('../middlewares/AuthMiddleware')

//creating account function//
router.post('/', async (req, res) => {
    const { email, username, password } = req.body
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({ email: email, username: username, password: hash })
        res.json({ email, username, password })
    })
})


//logging in function//
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await Users.findOne({ where: { username: username } })

    if (!user) res.json({ error: 'user does not exist' })

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({ error: 'wrong password' })
        const accessToken = sign({ username: user.username, id: user.id }, 'important-secrete',) //behind string to protect our token
        res.json(accessToken)
    })

})

//checking to see if there's a valid token or not// 
router.get('/check-token', validateToken, (req, res) => {
    res.json(req.user)
})

router.get('/basic-info/:id', async (req, res) => {
    const id = req.params.id
    const basicInfo = await Users.findByPk(id, { attributes: { exclude: ['password'] } })
    res.json(basicInfo)
})
module.exports = router 