import * as actionTypes from './currentUser.types'

const initialState = {
    username: undefined,
    readCards: [],
    roles:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                ...action.payload
            }
        case actionTypes.GET_PROFILE:
            return {
                ...state,
                ...action.payload
            }
        case actionTypes.PUSH_TO_READ_CARDS:
            console.log(state)
            return {
                ...state,
                readCards: [...state.readCards, action.payload]
            }
        case actionTypes.POP_FROM_READ_CARDS:
            const cardIndex = state.readCards.indexOf(action.payload)
            return {
                ...state,
                readCards:
                    [...state.readCards.slice(0, cardIndex),
                    ...state.readCards.slice(cardIndex + 1)]
            }
        default: return state;
    }
}

export default reducer;