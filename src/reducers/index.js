import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import Nav from './nav';
import user from './user';
import loading from './loading';

export default createStore(combineReducers({
    navState: Nav,
    user,
    loading
}),applyMiddleware(thunk,promise))
