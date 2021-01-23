const express = require("express");
const router = express.Router();
const Card = require("../models/card");
const User = require("../models/user");

const jwt = require('jsonwebtoken')
const AUTH_SECRET = process.env.AUTH_SECRET || process.abort();
const passportMW = require('../controllers/passport')

router.get('/', (req, res) => {
    Card.find({}, (err, allCards) => {
        if (err) { return console.log(err) }
        res.send(allCards);
    })
})

router.get('/:cardId',
    // passportMW.isAuthenticated,
    (req, res) => {
        try {

            const token = req.headers.authorization != 'null' ? req.headers.authorization.split(' ')[1] : undefined;
            const decoded = token ? jwt.verify(token, AUTH_SECRET) : undefined;

            const cardId = req.params.cardId;
            const action = req.query.action;

            // check if user is logged in first (will set up a server session for this)
            const userId = decoded ? decoded.id : undefined;
            if (action && userId) {
                User.findById(userId, (err, currentUser) => {
                    if (err) return console.log(err);

                    switch (action) {
                        case 'read':
                            (currentUser.readCards.includes(cardId)) ?
                                currentUser.readCards.splice(currentUser.readCards.indexOf(cardId), 1) :
                                currentUser.readCards.push(cardId)
                            currentUser.save();
                            console.log(currentUser.readCards);
                            res.send(currentUser.readCards)
                            break;
                    }
                })
            } else {
                Card.findById(cardId, (err, card) => {
                    res.send(card);
                })
            }
        } catch (error) {
            console.log(error.name)
        }
    })

module.exports = router;