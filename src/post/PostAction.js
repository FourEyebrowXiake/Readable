import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const ORDER_POSTS = 'ORDER_POSTS'

export const CREATING_POST = 'CREATING_POST'
export const CREATED_POST = 'CREATED_POST'

export const REQUEST_POST = 'REQUEST_POST'
export const RECIEVE_POST = 'RECIEVE_POST'

export const REQUEST_VOTE = 'REQUEST_VOTE'
export const RECIEVE_VOTE = 'RECIEVE_VOTE'

export const REQUEST_EDIT = 'REQUEST_EDIT'
export const RECIEVE_EDIT = 'RECIEVE_EDIT'

export const REQUEST_DELETE = 'REQUEST_DELETE'
export const RECEIVE_DELETE = 'RECEIVE_DELETE'


function requestPosts(category) {
    return {
        type: REQUEST_POSTS,
        category
    }
}

function receivePosts(category, json) {
    return {
        type: RECEIVE_POSTS,
        posts: json,
        category
    }
}

export function fetchPosts(category = null) {
    var url;
    if(category) {
        url = `http://localhost:3001/${category}/posts`;
    } else {
        url = 'http://localhost:3001/posts';
    }
    return (dispatch, getState) => {
        dispatch(requestPosts(category))
        return fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": "whatever-you-want"
            },
        })
            .then(response => response.json())
            .then(json => dispatch(receivePosts(category, json)))
    }
}


function requestCreate() {
    return {
        type: CREATING_POST
    }
}

function receiveCreate(json) {
    return {
        type: CREATED_POST,
        post: json
    }
}

export function createPost(obj) {
    return (dispatch, getState) => {
        dispatch(requestCreate())
        return fetch('http://localhost:3001/posts',{
            method: 'POST',
            headers: {
                "Authorization": "whatever-you-want",
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify(obj).length
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => dispatch(receiveCreate(json)))
    }
}

function requestPost() {
    return {
        type: REQUEST_POST
    }
}

function receivePost(json) {
    return {
        type: RECIEVE_POST,
        post: json
    }
}

export function fetchPostById(id) {

    return (dispatch, getState) => {
        dispatch(requestPost())
        return fetch(`http://localhost:3001/posts/${id}`, {
            method: 'GET',
            headers: {
                "Authorization": "whatever-you-want"
            },
        })
            .then(response => response.json())
            .then(json => dispatch(receivePost(json)))
    }
}

function request(action) {
    return {
        type: action
    }
}

function receive(action, json) {
    return {
        type: action,
        post: json
    }
}


export function requestPostDetail(obj, id, method,req,rec) {
    return (dispatch, getState) => {
        dispatch(request(req))
        return fetch(`http://localhost:3001/posts/${id}`, {
            method: method,
            headers: {
                "Authorization": "whatever-you-want",
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify(obj).length
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => dispatch(receive(rec, json)))
    }
}


export function order(kind) {
    return {
        type: ORDER_POSTS,
        kind
    }
}



