import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY'

export function selectCategory(category) {
    return {
        type: SELECT_CATEGORY,
        category
    }
}

export function invalidateCategory(category) {
    return {
        type: INVALIDATE_CATEGORY,
        category
    }
}

function requestPosts() {
    return {
        type: REQUEST_POSTS,
    }
}

function receivePosts(json) {
    return {
        type: RECEIVE_POSTS,
        posts: json,
    }
}

export function fetchPosts() {
    return (dispatch, getState) => {
        dispatch(requestPosts())
        return fetch('http://localhost:3001/posts',{
            method: 'GET',
            headers: {
                "Authorization": "whatever-you-want"
            },
        }).then(response => response.json())
            .then(json => {
            
                dispatch(receivePosts(json))
            })
    }
}
