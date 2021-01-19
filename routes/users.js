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
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, AUTH_SECRET);
    const currentUser = await User.findById(decoded.id);
    res.send({
        username: currentUser.username,
        readCards: ['5fe815ae3bfb4b6e606edbf8','5fe815ae3bfb4b6e606edbf9']
    })
})

module.exports = router;
