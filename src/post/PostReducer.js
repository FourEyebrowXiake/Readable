import {
    RECEIVE_POSTS, REQUEST_POSTS,
    ORDER_POSTS,CREATING_POST,CREATED_POST,
    RECIEVE_POST,REQUEST_POST,
    RECIEVE_VOTE,REQUEST_VOTE
} from './PostAction';


export function posts(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_POSTS:
        case REQUEST_POST:
        case REQUEST_VOTE:
        case CREATING_POST:
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
            console.log('RECIEVE_VOTE', action.post)
            return Object.assign({}, state, {
                isFetching: false,
                items: [action.post],
            })
        default:
            return state
    }
}

function order(items, fun) {
    return items.slice().sort(fun)
}

function select(kind) {
    switch(kind) {
        case 'vote':
            return byVote;
        case 'time':
            return byTime;
        default:
            return byVote;
    }
}

const byVote = (a, b) => {
    if (a.voteScore > b.voteScore) {
        return -1;
    }
    if (a.voteScore < b.voteScore) {
        return 1;
    }
    return 0;
}

const byTime = (a, b) => {
    if (a.timestamp > b.timestamp) {
        return -1;
    }
    if (a.timestamp < b.timestamp) {
        return 1;
    }
    return 0;
}