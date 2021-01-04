import * as actionTypes from './loadAdmin.types'

const currentUser =
    // (localStorage.getItem('currentUser')) ?
    // JSON.parse(localStorage.getItem('currentUser')) :
    {}


const initialState = {
    currentUser: currentUser
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_ADMIN:
            return {
                ...state,
                currentUser: action.payload
            }
        case actionTypes.UPDATE_READ_CARDS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    readCards: action.payload
                }
            }
    }
    return state;
}

export default reducer;