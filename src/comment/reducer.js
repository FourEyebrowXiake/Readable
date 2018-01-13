import {
    RECEIVE_COMMENT,REQUEST_COMMENT,
    RECEIVE_COMMENT_VOTE, REQUEST_COMMENT_VOTE,
    RECEIVE_COMMNET_EDIT,REQUESt_COMMENT_EDIT,
    RECEIVE_COMMENT_DELETE,REQUEST_COMMENT_DELETE,
    ORDER_COMMENTS,
    RECEIVE_COMMNET_CREAT,
    REQUEST_COMMENT_CREAT
} from './actionTypes'
import {
    filterItems,
    deleteItems,
    order,
    select
} from '../tool/Tool'

const INITIAL_STATE = {
    isFetching: false,
    items: []
}

export default function comments( state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_COMMENT:
        case REQUEST_COMMENT_VOTE:
        case REQUESt_COMMENT_EDIT:
        case REQUEST_COMMENT_DELETE:
        case REQUEST_COMMENT_CREAT:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_COMMENT:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.comments,
            })
        case RECEIVE_COMMENT_VOTE:
        case RECEIVE_COMMNET_EDIT:
            return Object.assign({}, state, {
                isFetching: false,
                items: filterItems(state.items, action.comment) ,
            })
        case RECEIVE_COMMENT_DELETE:
            return Object.assign({}, state, {
                isFetching: false,
                items: deleteItems(state.items, action.comment),
            })
        case ORDER_COMMENTS:
            return Object.assign({}, state, {
                items: order(state.items, select(action.kind))
            })
        case RECEIVE_COMMNET_CREAT:
            return Object.assign({}, state, {
                isFetching: false,
                items: state.items.concat(action.comment),
            })
        default:
            return state
    }
}
