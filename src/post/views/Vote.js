import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestPostDetail } from '../actions'
import { REQUEST_VOTE, RECIEVE_VOTE } from '../actionTypes'
import {  Button } from 'antd'


class Vote extends Component {

    handleVoteChange() {
        const { id, requestPostDetail } = this.props;
        const voteOption = {
            option: arguments[0]
        }
        requestPostDetail(voteOption, id, 'POST', REQUEST_VOTE, RECIEVE_VOTE)
    }

    getScore(action, score) {
        if (((action === 'upVote') && (score >= 0)) || ((action === 'downVote') && (score < 0))) {
            return score
        }
        return ""
    }

    render() {
        const { type, action, score } = this.props
        return (
            <Button icon={type}
                onClick={this.handleVoteChange.bind(this, action)}
                type="normal" >
                {
                    "  " + this.getScore(action, score)
                }
            </Button>
        );
    }
}

export default connect(
    null,
    { requestPostDetail }
)(Vote);