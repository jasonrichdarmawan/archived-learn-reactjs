const ACCESS_TOKEN_SECRET = process.env.NODE_ENV === 'production' ? process.env.ACCESS_TOKEN_SECRET : 'ACCESS_TOKEN_SECRET'
const REFRESH_TOKEN_SECRET = process.env.NODE.ENV === 'production' ? process.env.ACCESS_TOKEN_SECRET : 'REFRESH_TOKEN_SECRET'

const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

app.use(express.json())

// TODO: store in database
const posts = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
    {
        username: 'Jim',
        title: 'Post 2'
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        
        req.user = user
        next()
    })
}

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)

    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

// TODO: store in database
let users = []

app.post('/login', async (req, res) => {
    // TODO: authenticate user
    const user = users.find(user => user.name === req.body.username)
    if (user == null) return res.sendStatus(404)

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const payload = { name: req.body.username }
            const accessToken = generateAccessToken(payload)
            const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET)
            
            // TODO: store in database
            refreshTokens.push(refreshToken)
            
            res.json({ accessToken: accessToken, refreshToken: refreshToken })
        
            // TODO: store the accessToken, refreshToken in client side
        }
        // question: what are the drawbacks if you send identical response for Forbidden and Not Found.
        else return res.sendStatus(404)
    } catch {
        return res.sendStatus(500)
    }
})

function generateAccessToken(payload) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

// TODO: store in database
let refreshTokens = []

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = { name: req.body.username, password: hashedPassword }
        users.push(user)
        res.sendStatus(201)
    } catch {
        res.sendStatus(500)
    }
})

// debug only
app.get('/users', (req, res) => {
    res.json(users)
})

app.listen(4000)