const express = require("express");
const router = express.Router();
const Subject = require("../models/subject");

router.get('/', async(req, res) => {
    const allSubjects = await Subject.find({});
    try {
        res.send(allSubjects);
    } catch (error) {
        console.log(error)
    }
})

router.get('/:subjectId', async (req, res) => {
    const subjectId = req.params.subjectId;
    const foundSubject = await Subject.findById(subjectId)
    try {
        res.send(foundSubject);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;