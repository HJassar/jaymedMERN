import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import currentUser from './currentUser/currentUser.reducer'
import thunk from 'redux-thunk'

const middleware = [thunk]

const initialState = {};

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const rootReducer = combineReducers({
    currentUser: currentUser
});

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(
rootReducer,
initialState,
enhancer
);

export {store};