import fetch from 'isomorphic-fetch'
import { REQUEST_CATEGORY,RECEIVE_CATEGORY } from './actionTypes'


function requestCATEGORY() {
    return {
        type: REQUEST_CATEGORY,
    }
}

function receiveCATEGORY(json) {
    return {
        type: RECEIVE_CATEGORY,
        categories: json.categories,
    }
}

export function fetchCategory(category = 'categories') {
    return (dispatch, getState) => {
        dispatch(requestCATEGORY())
        return fetch(`http://localhost:3001/${category}`, {
            method: 'GET',
            headers: {
                "Authorization": "whatever-you-want"
            },
        })
        .then(response => response.json())
        .then(json => dispatch(receiveCATEGORY(json)))
    }
}


