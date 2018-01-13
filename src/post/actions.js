import fetch from 'isomorphic-fetch'

import * as actionTypes from './actionTypes'


function requestPosts(category) {
    return {
        type: actionTypes.REQUEST_POSTS,
        category
    }
}

function receivePosts(category, json) {
    return {
        type: actionTypes.RECEIVE_POSTS,
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
        type: actionTypes.CREATING_POST
    }
}

function receiveCreate(json) {
    return {
        type: actionTypes.CREATED_POST,
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
        type: actionTypes.REQUEST_POST
    }
}

function receivePost(json) {
    return {
        type: actionTypes.RECIEVE_POST,
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


export function requestPostDetail(obj, id, method,reqAction,recAction) {
    return (dispatch, getState) => {
        dispatch(request(reqAction))
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
            .then(json => dispatch(receive(recAction, json)))
    }
}


export function order(kind) {
    return {
        type: actionTypes.ORDER_POSTS,
        kind
    }
}



