import axios from 'axios';
import * as actionTypes from './loadAdmin.types'


export const loadAdmin = reqData => dispatch => {
    // console.log(reqData)
    axios
        .get(`/users/${reqData}`)
        .then(res => {
            console.log(res)
            // localStorage.setItem('currentUser', JSON.stringify(res.data));
            dispatch({
                type: actionTypes.LOAD_ADMIN,
                payload: res.data
            })
        })
}

export const updateReadCards = (newReadCards) => dispatch =>{
    console.log(newReadCards)
    
    dispatch({
        type: actionTypes.UPDATE_READ_CARDS,
        payload: newReadCards
    })
}