import {
    RECEIVE_POSTS, REQUEST_POSTS,
    ORDER_POSTS,CREATING_POST,CREATED_POST,
    RECIEVE_POST,REQUEST_POST,
    RECIEVE_VOTE,REQUEST_VOTE,
    RECIEVE_EDIT,REQUEST_EDIT,
    REQUEST_DELETE,RECEIVE_DELETE
} from './PostAction';
import {
    filterItems,
    order,
    select,
    deleteItems
} from '../tool/Tool'


export function posts(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_POSTS:
        case REQUEST_POST:
        case REQUEST_VOTE:
        case CREATING_POST:
        case REQUEST_EDIT:
        case REQUEST_DELETE:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.posts,
            })
        case RECIEVE_POST:
            return Object.assign({}, state, {
                isFetching: false,
                items: state.items.concat(action.post),
            })
        case ORDER_POSTS:
            return Object.assign({},state, {
                items : order(state.items, select(action.kind))
            })
        case CREATED_POST:
            return Object.assign({}, state, {
                isFetching: false,
                items: state.items.concat(action.post),
            })
        case RECIEVE_VOTE:
            return Object.assign({}, state, {
                isFetching: false,
                items: [action.post],
            })
        case RECIEVE_EDIT:
            return Object.assign({}, state, {
                isFetching: false,
                items: filterItems(state.items, action.post),
            })
        case RECEIVE_DELETE:
            return Object.assign({}, state, {
                isFetching: false,
                items: deleteItems(state.items, action.post),
            })
        default:
            return state
    }
}
