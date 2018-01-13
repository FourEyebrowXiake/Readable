import fetch from 'isomorphic-fetch'

import * as actionTypes from './actionTypes'


function requesComment() {
    return {
        type: actionTypes.REQUEST_COMMENT,
    }
}

function receiveComment(json) {
    return {
        type: actionTypes.RECEIVE_COMMENT,
        comments: json,
    }
}

export function fetchComments(id) {
    return (dispatch, getState) => {
        dispatch(requesComment())
        return fetch(`http://localhost:3001/posts/${id}/comments`, {
            method: 'GET',
            headers: {
                "Authorization": "whatever-you-want"
            },
        })
            .then(response => response.json())
            .then(json => dispatch(receiveComment(json)))
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
        comment: json
    }
}


export function fetchComment(obj={} , id, method, req, rec) {
    var url;
    if (id) {
        url = `http://localhost:3001/comments/${id}`;
    } else {
        url = 'http://localhost:3001/comments/';
    }

    return (dispatch, getState) => {
        dispatch(request(req))
        return fetch(url, {
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
        type: actionTypes.ORDER_COMMENTS,
        kind
    }
}