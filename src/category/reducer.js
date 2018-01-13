import {
    RECEIVE_CATEGORY,REQUEST_CATEGORY,
} from './actionTypes';

const INITIAL_STATE = {
    isFetching: false,
    items: []
}

export default function categories(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_CATEGORY:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_CATEGORY:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.categories,
            })
        default:
            return state
    }
}
