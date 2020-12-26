import React from 'react';

import './CommentSection.css';



const commentDB = [
    {
        id: '1123321',
        user: 'Jean Valjean',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum voluptatibus eveniet ex sapiente est, alias repellat numquam consequatur labore enim id nulla ad debitis delectus dicta? Alias suscipit perspiciatis eos?'
    },
    {
        id: '3343421',
        user: 'Victor Hugo',
        text: '2nd comment Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum voluptatibus eveniet ex sapiente est, alias repellat numquam consequatur labore enim id nulla ad debitis delectus dicta? Alias suscipit perspiciatis eos?'
    }
]



const Comment = (props) => {
    return (
        <div className='Comment'>
            <strong>{props.user}</strong><br />
            {props.text}
        </div>
    )
}

const Comments = ({commentIds}) => {
    if(commentIds.length>0)
    {
    return commentDB.map(comment => {
        if(commentIds.find(cId=> comment.id==cId)){
        return <Comment text={comment.text} user={comment.user} />
        }else{
            return null;
        }
    })
}else
{return <p>No Comments yet!</p>}
}

const CommentSection = ({commentIds}) => {
    return (
        <div className='CommentSection'>
            <h3>Comments</h3>
            <Comments commentIds={commentIds} />
        </div>
    )
}

export default CommentSection;