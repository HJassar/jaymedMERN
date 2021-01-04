const express = require('express');
const router = express.Router();

const User = require('../models/user');

const bcrypt = require('bcrypt');
const { default: validator } = require('validator');

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
    const newUser = req.body;
    const { email, username, password, password2 } = newUser;

    const hashed = await bcrypt.hash(password, 12);


    if (await usernameExists(username) ||
        await emailExists(email) ||
        password !== password2
    ) {
        res.send('Opsie')
    } else {
        res.send('Congratulations!')
    };
})

module.exports = router;