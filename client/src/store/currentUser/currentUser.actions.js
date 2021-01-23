import axios from 'axios';
import * as actionTypes from './currentUser.types'


export const login = token => dispatch => {
    console.log(token)
    axios
        .get('/users/profile',
            {
                headers: {
                    'authorization': token
                }
            })
        .then(res => {
            console.log(res.data)
            // localStorage.setItem('currentUser', JSON.stringify(res.data));
            dispatch({
                type: actionTypes.LOGIN,
                payload: res.data
            })
        })
}


export const getProfile = (username) => dispatch => {
    dispatch({
        type: actionTypes.GET_PROFILE,
        payload: username
    })
}

export const updateReadCards = (newReadCards) => dispatch => {
    console.log(newReadCards)

    dispatch({
        type: actionTypes.UPDATE_READ_CARDS,
        payload: newReadCards
    })
}

