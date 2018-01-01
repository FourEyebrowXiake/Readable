import { combineReducers } from 'redux';
import { posts } from '../post/PostReducer';
import { categories } from '../category/CategoryReducer';


export default combineReducers({
    categories,
    posts,
})