import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import loadAdminReducer from './loadAdmin/loadAdmin.reducer'
import thunk from 'redux-thunk'

const middleware = [thunk]

const initialState = {};


const rootReducer = combineReducers({
    currentUser: loadAdminReducer
});

export const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
