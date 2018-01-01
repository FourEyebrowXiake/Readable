import {
    RECEIVE_CATEGORY,REQUEST_CATEGORY,
} from './CategoryAction';


export function categories(state = {
    isFetching: false,
    items: []
}, action) {
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
