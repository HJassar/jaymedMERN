const express = require("express");
const router = express.Router();
const Card = require("../models/card");
const User = require("../models/user");


router.get('/', (req, res) => {
    Card.find({}, (err, allCards) => {
        if (err) { return console.log(err) }
        res.send(allCards);
    })
})

router.get('/:cardId', (req, res) => {
    const cardId = req.params.cardId;
    const action = req.query.action;

    // check if user is logged in first (will set up a server session for this)
    const userId = '5fe815ae3bfb4b6e606edbff' || undefined;
    if (userId != undefined && action != undefined) {
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
})

module.exports = router;