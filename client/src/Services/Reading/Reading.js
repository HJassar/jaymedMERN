import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

import './Reading.css';

// const cards = [
//     {
//         id: 'nasoijelk;fmef',
//         level: 1,
//         title: 'Card Title',
//         bookmarked: true,
//         read: true,
//         content: `
//     <p>What is up my man? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, vero cupiditate fugit magnam temporibus nobis modi pariatur expedita voluptatem recusandae ad esse minus beatae corrupti impedit quia. Veritatis, quibusdam dicta?</p>`
//         ,
//         comments: [
//             '1123321',
//             '3343421'
//         ]
//     },
//     {
//         id: 'nasoijelk;asdfsafmef',
//         level: 2,
//         title: 'Card Title',
//         bookmarked: true,
//         read: true,
//         content: `
//     <p>What is up my man? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, vero cupiditate fugit magnam temporibus nobis modi pariatur expedita voluptatem recusandae ad esse minus beatae corrupti impedit quia. Veritatis, quibusdam dicta?</p>`
//     ,comments:[]
//     },

//     {
//         id: 'nasasdfegelk;fmef',
//         level: 1,
//         title: 'Card Title',
//         bookmarked: true,
//         read: true,
//         content: `
//     <p>What is up my man? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, vero cupiditate fugit magnam temporibus nobis modi pariatur expedita voluptatem recusandae ad esse minus beatae corrupti impedit quia. Veritatis, quibusdam dicta?</p>`,
//         comments: []

//     },
//     {
//         id: 'na1ae45646;fmef',
//         level: 1,
//         title: 'What Title?',
//         bookmarked: false,
//         read: true,
//         content: 'This is so nice man',
//         comments: []
//     },
//     {
//         id: 'na1ae4515efw894eef',
//         level: 1,
//         content: 'WOW',
//         comments: []
//     },
//     {
//         id: 'na1ae453ef86e415eef',
//         level: 1,
//         bookmarked: true,
//         read: true,
//         content: 'This is so awesome',
//         comments: []
//     }
// ]

// // Handlers
// const onBookMark = (index) => {
//     cards[index].bookmarked = !cards[index].bookmarked;
//     // Axios to the backend
//     console.log(cards[index].id)
// }
// const onRead = (index) => {
//     cards[index].read = !cards[index].read;
//     // Axios to the backend
//     console.log(cards[index].id)
// }


// const cardDOMS =
//     cards.map((c, i) =>
//         <Card
//             index={i}
//             title={c.title}
//             content={c.content}
//             bookmarkedProp={c.bookmarked}
//             onBookMark={() => { onBookMark(i) }}
//             readProp={c.read}
//             level={c.level}
//             onRead={() => { onRead(i) }}
//             commentIds={c.comments}
//         />
//     )



const Reading = () => {
    document.title = 'Reading';

    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        axios
            .get('/subjects')
            .then(res => {
                setSubjects(res.data);
                console.log(subjects)
            })
    }, [])

    return (
        <>
            <Breadcrumbs
                breadcrumbs={['All Subjects']}
            />
            {subjects.map(subject => {
                return (
                    <Link to={`/reading/${subject._id}`}>
                        {subject.title}
                    </Link>
                )
            })}
        </>)
}

export default Reading;