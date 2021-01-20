const express = require("express");
const router = express.Router();
const User = require("../models/user");

const jwt = require('jsonwebtoken');
const AUTH_SECRET = process.env.AUTH_SECRET || process.abort();

const passportMW = require('../controllers/passport');


// /users

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        res.send(users[0]);
    })
})

router.get('/profile', passportMW.isAuthenticated, async (req, res) => {
    const currentUser = req.user;
    console.log(currentUser)
    res.send({
        username: currentUser.username,
        readCards: currentUser.readCards,
        roles: currentUser.roles
    })
})

module.exports = router;
