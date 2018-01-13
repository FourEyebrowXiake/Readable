import { combineReducers } from 'redux';
import { reducer as posts } from '../post/index';
import { reducer as categories } from '../category/index';
import { reducer as comments } from '../comment/index';


export default combineReducers({
    comments,
    categories,
    posts,
})