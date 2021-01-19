const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Card = require('../models/card');
const User = require('../models/user')

const jwt = require('jsonwebtoken')
const AUTH_SECRET = process.env.AUTH_SECRET || process.abort();
const passportMW = require('../controllers/passport')

router.post('/new', passportMW.isAuthenticated, async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, AUTH_SECRET);
        const currentUser = await User.findById(decoded.id);

        const submittedComment = req.body;
        submittedComment.commentor = currentUser._id;

        const parentType = req.body.parent.parentType;
        const parentId = req.body.parent.parentId;
        const newComment = await Comment.create(submittedComment);

        switch (parentType) {
            case 'card':
                Card.findByIdAndUpdate(
                    parentId,
                    {
                        $push: {
                            'comments':
                                { $each: [newComment._id], $position: 0 }
                        }
                    },
                    (err, updatedCard) => {
                        if (err) return console.log(err);
                        console.log(updatedCard)
                    }
                );
        }
        res.send({ text: newComment.text, commentor: { username: currentUser.username } })
    } catch (error) {
        console.log(error)
    }
})

router.get('/:commentId', async (req, res) => {
    const comment = await Comment
        .findById(req.params.commentId)
        .populate('commentor')
        .populate('children');
    console.log(comment)
    res.send(comment)
})

router.post('/delete-comment', async (req, res) => {
    const commentId = req.body.commentId;
    try {
        const comment = await Comment.findByIdAndUpdate(
            commentId,
            { status: 'trash' }
        )
        console.log(comment)

        res.send(true)
    } catch (error) {
        res.send(false)
    }
})

module.exports = router;