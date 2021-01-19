import axios from 'axios';

import * as actionTypes from './currentUser.types'

const initialState = {
    username: undefined
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                currentUser: action.payload
            }
        case actionTypes.GET_PROFILE:
            console.log(action.payload)
            return {
                ...state,
                currentUser: action.payload
            }
        // case actionTypes.UPDATE_READ_CARDS:
        //     return {
        //         ...state,
        //         currentUser: {
        //             ...state.currentUser,
        //             readCards: action.payload
        //         }
        //     }
    }
    return state;
}

export default reducer;