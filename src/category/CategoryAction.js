import fetch from 'isomorphic-fetch'

export const REQUEST_CATEGORY = 'REQUEST_CATEGORY'
export const RECEIVE_CATEGORY = 'RECEIVE_CATEGORY'


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

export function fetchCategory() {
    return (dispatch, getState) => {
        dispatch(requestCATEGORY())
        return fetch('http://localhost:3001/categories', {
            method: 'GET',
            headers: {
                "Authorization": "whatever-you-want"
            },
        })
        .then(response => response.json())
        .then(json => dispatch(receiveCATEGORY(json)))
    }
}


