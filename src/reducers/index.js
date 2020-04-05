import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import Nav from './nav';
import user from './user';
import loading from './loading';
import messages  from './messages';

export default createStore(combineReducers({
    navState: Nav,
    user,
    loading,
    messages
}),applyMiddleware(thunk,promise))
