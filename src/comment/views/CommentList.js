import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Button, Menu, Dropdown, Layout, Row, Col  } from 'antd';
import { withRouter } from 'react-router-dom';
import {
    RECEIVE_COMMENT_VOTE,
    REQUEST_COMMENT_VOTE,
    RECEIVE_COMMENT_DELETE,
    REQUEST_COMMENT_DELETE
} from '../actionTypes';
import {
    fetchComment,
    fetchComments,
    order
} from '../actions'
import EditComment from './CommentEdit'
import { Link } from 'react-router-dom'
import CreateComment  from './CommentCreat'
import { filterComments } from '../../tool/Tool'

class CommentList extends Component {

    componentDidMount() {
        const { fetchComments, postId } = this.props
        fetchComments(postId)
    }

    handleChange() {
        const { fetchComment } = this.props;
        const obj = {
            option: arguments[0]
        }
        switch(arguments[2]){
            case 'POST':
                fetchComment(obj, arguments[1], arguments[2], REQUEST_COMMENT_VOTE, RECEIVE_COMMENT_VOTE)
                break;
            case 'DELETE':
                fetchComment({}, arguments[1], arguments[2], REQUEST_COMMENT_DELETE, RECEIVE_COMMENT_DELETE)
                break;
            default:
                console.log('CommentList ERROR')
        }
        
    }

    handleClick = (e) => {
        switch (e.key) {
            case 'vote':
            case 'time':
                this.props.order(e.key)
                break;
            default:
                return e.key
        }

    }

    render() {
        const { comments } = this.props;
        const { Content } = Layout;
        const listData = [];

        comments.forEach((item) => {
            listData.push({
                title: `${item.author} - ${new Date(item.timestamp).toDateString()}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: item.body,
                description: `${item.voteScore}人点赞`,
                id: item.id
            });
        })


        const menu = (
            <Menu 
                onClick={this.handleClick}
            >
                <Menu.Item key="vote">
                    {"By Vote"}
                </Menu.Item>
                <Menu.Item key="time">
                    {"By Time"}
                </Menu.Item>
            </Menu>
        );

        const IconText = ({ type = null , action, cId, method }) => (
            <Button icon={type}
                onClick={this.handleChange.bind(this, action, cId, method)}
                type="normal" >
            </Button>
        );

        return (
            <div>
                <Content style={{ padding: '16px 50px' }} >
                    <Row>
                        <Col span={6}>
                            <Dropdown overlay={menu} placement="bottomLeft">
                                <Button icon='setting' > Order</Button>
                            </Dropdown>
                        </Col>
                        <Col span={6}>
                            <CreateComment parentId={this.props.postId} />
                        </Col>
                    </Row>
                </Content>
                <Content style={{ padding: '16px 50px' }} >
                <List
                    itemLayout="vertical"
                    dataSource={listData}
                    renderItem={item => (
                        <List.Item
                            actions={
                                [<IconText type="like-o" cId={item.id} action="upVote" method="POST" /> ,
                                <IconText type="dislike-o" cId={item.id} action="downVote" method="POST" />,
                                <EditComment content={item.content} id={item.id} />,
                                <IconText type="delete" cId={item.id} method="DELETE"/>
                            ]}
                        >
                            <List.Item.Meta
                            title={item.title}
                            description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
                </Content>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        postId: ownProps.match.params.id,
        comments: filterComments(state.comments.items, ownProps.match.params.id)
    }
}

export default withRouter(connect(
    mapStateToProps,
    { fetchComment, order, fetchComments }
)(CommentList));