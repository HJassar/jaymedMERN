const express = require('express');
const router = express.Router();

const User = require('../models/user');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const AUTH_SECRET = process.env.AUTH_SECRET || process.abort();

const passportMW = require('../controllers/passport');

const usernameExists = async (username) => {
    const foundUser = await User.findOne({ username });
    if (foundUser !== null) { return true } else { return false }
}

const emailExists = async (email) => {
    const foundUser = await User.findOne({ email });
    if (foundUser !== null) { return true } else { return false }
}

router.post('/usernameExists', async (req, res) => {
    const username = req.body.username;

    if (await usernameExists(username)) {
        res.json({
            username,
            available: false,
            message: `${username} already taken!`
        })
    } else {
        res.json({
            username,
            available: true,
            message: `${username} is available!`
        })
    }
})

router.post('/emailExists', async (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    if (await emailExists(email)) {
        res.json({
            email,
            available: false,
            message: `${email} already taken!`
        })
    } else {
        res.json({
            email,
            available: true,
            message: `${email} is available!`
        })
    }
})

router.post('/register', async (req, res) => {
    try {
        const registerRequest = req.body;
        const { email, username, password, password2 } = registerRequest;
        const hashed = await bcrypt.hash(password, 12);

        if (await usernameExists(username) ||
            await emailExists(email) ||
            password !== password2
        ) {
            res.send('Opsie')
        } else {
            const newUser = await User.create({ username, email, password: hashed })

            const token = jwt.sign({ username }, AUTH_SECRET, { expiresIn: '30m' });
            res.send(token)
        };

    } catch (error) {
        console.log(error)
    }
})



router.post('/login', async (req, res) => {
    const loginRequest = req.body;
    const user = await User.findOne({ username: loginRequest.username });

    if (!user) { return res.status(401).json({ error: 'Username or password incorrect' }) }

    bcrypt.compare(loginRequest.password, user.password)
        .then(isMatch => {
            if (isMatch) {

                const payload = {
                    id: user.id,
                    name: user.name
                };

                const token = jwt.sign(payload, AUTH_SECRET, { expiresIn: '5h' });
                res.json({ token: 'Bearer ' + token });
            } else {
                return res.status(401).json({ error: 'Username or password incorrect' })
            }
        })

})



router.get('/secretplace', passportMW.isAuthenticated, (req, res) => {
    res.send('welcome to the other side')
})


// router.post('/verify', (req, res) => {
//     // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndoYXQxMjNhYWIiLCJpYXQiOjE2MTA5MTQ2NzAsImV4cCI6MTYxMDkxNjQ3MH0.duepz_3sMBHT6FvyMxr6rwVkppseMSfqRE3C1sWD2CQ
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, AUTH_SECRET);
//     res.send(decoded);
// })


module.exports = router;