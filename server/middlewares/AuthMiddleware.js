const { verify } = require('jsonwebtoken')
const validateToken = (req, res, next) => {
    const accessToken = req.header('accessToken')//to get access token from the frontend
    if (!accessToken) return res.json({ error: 'user not logged in!' })

    try {
        const validToken = verify(accessToken, 'important-secrete')
        req.user = validToken
        if (validToken) {
            return next()
        }
    }
    catch (err) {
        return res.json({ error: err })
    }
}
module.exports = { validateToken }