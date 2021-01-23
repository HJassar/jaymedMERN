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
            return {
                ...state,
                currentUser: action.payload
            }
        default: return state;
    }
}

export default reducer;