import fetch from 'isomorphic-fetch'

export const REQUEST_COMMENT = 'REQUEST_COMMENT'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'

export const RECEIVE_COMMENT_VOTE = 'RECEIVE_COMMENT_VOTE'
export const REQUEST_COMMENT_VOTE = 'REQUEST_COMMENT_VOTE'

export const REQUESt_COMMENT_EDIT = 'REQUES_COMMENT_EDIT'
export const RECEIVE_COMMNET_EDIT = 'RECEIVE_COMMNET_EDIT'

export const REQUEST_COMMENT_DELETE = 'REQUEST_COMMENT_DELETE'
export const RECEIVE_COMMENT_DELETE = 'RECEIVE_COMMENT_DELETE'

export const REQUEST_COMMENT_CREAT = 'REQUEST_COMMENT_CREAT'
export const RECEIVE_COMMNET_CREAT = 'RECEIVE_COMMNET_CREAT'

export const ORDER_COMMENTS = 'ORDER_COMMENTS'


function requesComment() {
    return {
        type: REQUEST_COMMENT,
    }
}

function receiveComment(json) {
    return {
        type: RECEIVE_COMMENT,
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
        type: ORDER_COMMENTS,
        kind
    }
}