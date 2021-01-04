const mongoose = require('mongoose');
const Card = require('../models/card');
const Subject = require('../models/subject');
const User = require('../models/user');


const cardSeeds = [
    {
        title: 'The first Card',
        content: '<strong>Hello</strong> to the first card ever!',
        level: 1
    },
    {
        title: 'The second Card',
        content: '<strong>Hello</strong> to the second card ever!',
        level: 1
    },
    {
        title: 'The third Card',
        content: '<strong>Hello</strong> to the third card ever!',
        level: 2
    },
    {
        title: 'The Fourth Card',
        content: '<strong>Hello</strong> to the Fourth card ever!',
        level: 2
    }, {
        title: 'The 5th Card',
        content: '<strong>Hello</strong> to the 5th card ever!',
        level: 2
    }, {
        title: 'The 6th Card',
        content: '<strong>Hello</strong> to the 6th card ever!',
        level: 2
    }, {
        title: 'The 7th Card',
        content: '<strong>Hello</strong> to the 7th card ever!',
        level: 2
    }
]


const cardSeeding = async (cb) => {
    await Card.deleteMany({}, () => { console.log('All Cards Deleted!') });

    cardSeeds.map((cS, index, array) => {
        Card.create(cS, (err, newCard) => {
            if (err) return console.log(err);
            console.log('Card ' + newCard._id + ' created!');
            if (index == array.length - 1) { cb() }
        })
    })
}

const subjectSeeding = async () => {
    await Subject.deleteMany({}, () => { console.log('All Subjects Deleted!') });

    Subject.create({ title: 'Hypertension' }, (err, newSubject) => {
        if (err) { return console.log(err) };
        Card.find({}, (err, allCards) => {
            allCards.map((card, index, array) => {
                newSubject.cards.push(card.id)
                if (index == array.length - 1) {
                    console.log('Subject ' + newSubject._id + ' created!')
                    newSubject.save();
                }
            })
        })
    })
}

const createAdmin = async () => {
    const adminCards = [];

    await Card.find({}, (err, allCards) => {
        allCards.map((card, index, array) => {
            if (index % 2 == 0) {
                adminCards.push(card._id);
            }

            if (index == array.length - 1) {
                User.create({
                    username: 'admin',
                    readCards: adminCards
                }, (err, admin) => {
                    console.log(admin.username + ' has been created!')
                })
            }
        })
    })


}


const seedSubjectsAndCards = () => {
    Subject.countDocuments({}, (err, subjectCount) => {
        if (subjectCount == 0) {
            cardSeeding(() => {
                createAdmin();
                subjectSeeding();
            });
        } else {
            console.log('Subjects already created!')
        }
    })
}

module.exports = seedSubjectsAndCards;