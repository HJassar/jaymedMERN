const express = require("express");
const router = express.Router();
const Subject = require("../models/subject");

router.get('/', (req, res) => {
    Subject.find({}, (err, allSubjects) => {
        if (err) { return console.log(err) }
        res.send(allSubjects);
    })
})

router.get('/:subjectId',(req,res)=>{
    const subjectId = req.params.subjectId;
    Subject.findById(subjectId, (err,subject)=>{
        res.send(subject)
    })
})

module.exports = router;