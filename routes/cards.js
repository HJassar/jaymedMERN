const express = require("express");
const router = express.Router();
const Card = require("../models/card");

router.get('/', (req, res) => {
    Card.find({}, (err, allCards) => {
        if (err) { return console.log(err) }
        res.send(allCards);
    })
})

router.get('/:cardId',(req,res)=>{
    const cardId = req.params.cardId;
    Card.findById(cardId, (err,card)=>{
        res.send(card);
    })
})

module.exports = router;