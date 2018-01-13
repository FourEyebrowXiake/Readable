import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import {
    requestPostDetail,
} from '../actions';
import {
    RECEIVE_DELETE,
    REQUEST_DELETE
} from '../actionTypes'

class Delete extends Component {

    handleChange() {
        const { requestPostDetail } = this.props;
        requestPostDetail({}, arguments[0], arguments[1], REQUEST_DELETE, RECEIVE_DELETE)
    }

    render() {
        const { type, id, method } = this.props
        return (
            <Button icon={type}
                onClick={this.handleChange.bind(this, id, method)}
                type="danger" >
            </Button>
        );
    }
}

export default connect(
    null,
    { requestPostDetail }
)(Delete);