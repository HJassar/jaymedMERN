const express = require("express");
const router = express.Router();
const User = require("../models/user");

// /users

router.get('/',(req,res)=>{
    User.find({},(err,users)=>{
        res.send(users[0]);
    })
})

router.get('/:userId',(req,res)=>{
    const userId = req.params.userId;
    User.findById(userId,(err,currentUser)=>{
        if(err) return console.log(err);
        console.log(currentUser)
        res.send(currentUser);
    })
})

module.exports = router;
