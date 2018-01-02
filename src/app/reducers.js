import { combineReducers } from 'redux';
import { posts } from '../post/PostReducer';
import { categories } from '../category/CategoryReducer';
import { comments } from '../comment/CommentReducer';


export default combineReducers({
    comments,
    categories,
    posts,
})