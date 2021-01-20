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
        res.send(newComment)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:commentId', async (req, res) => {
    // If there's a user logged in, the hidden comment will show
    const comment = await Comment
        .findOne({ _id: req.params.commentId })
        .populate('commentor', 'username')
        .populate('children');
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, AUTH_SECRET);

        comment.status === 'public' || comment.commentor._id.equals(decoded.id) ?
            res.send(comment) :
            res.send({ status: 'hidden' });
    } catch (error) {
        comment.status === 'public' ?
            res.send(comment) :
            res.send({ status: 'hidden' });
    }
})

router.post('/delete-comment', passportMW.isAuthenticated, async (req, res) => {
    const commentId = req.body.commentId;
    const currentUser = req.user;
    try {

        const comment = await Comment.findOneAndUpdate(
            { _id: commentId, commentor: currentUser._id },
            { status: 'trash' });

        comment !== null ?
            res.send(comment) :
            res.send

    } catch (error) {
        res.send(error)
    }
})

module.exports = router;