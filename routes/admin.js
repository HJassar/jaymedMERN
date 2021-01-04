const express = require('express');
const router = express.Router();
const Card = require('../models/card');
const Subject = require('../models/subject');
const User = require('../models/user');


router.get('/deleteall', (req, res) => {
    const adminSecret = req.query.adminSecret || 'not entered';
    if (adminSecret == process.env.ADMIN_SECRET) {
        Card.deleteMany({}, (err, cards) => { console.log('All Cards Deleted') });
        Subject.deleteMany({}, (err, subjects) => { console.log('All Subjects Deleted') });
        User.deleteMany({}, (err, users) => { console.log('All Users Deleted') });
        res.send('Deleting all!')
    } else {
        res.send('Go admin yourself!')
    }
})

module.exports = router;