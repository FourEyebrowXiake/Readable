import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Tag, Divider, Icon, Button, Layout, Menu } from 'antd';
import { fetchPostById, requestPostDetail,REQUEST_VOTE,RECIEVE_VOTE } from './PostAction';
import  CommentList  from '../comment/CommentList'


class Post extends Component {

    componentDidMount() {
        const { postId, getPostById } = this.props;
        getPostById(postId)
    }

    handleVoteChange() {
        const { postId, getPostDetail } = this.props;
        const obj = {
            option: arguments[0]
        }
        getPostDetail(obj, postId, 'POST', REQUEST_VOTE, RECIEVE_VOTE)
    }

    render() {
        const { post } = this.props;
        const { Content } = Layout;

        const IconText = ({ type, action }) => (
            <Button icon={type} 
                    onClick={this.handleVoteChange.bind(this, action)} 
                    type="normal" >
            </Button>
        );

        return (
            <div>
                {post ? (
                    <Layout>
                        <Content style={{ padding: '16px 50px' }} >
                            <Card loading={false} title={post.title}
                                actions={[<IconText type="like-o" action="upVote"  />,
                                    <IconText type="dislike-o" action="downVote" />]}
                            >
                                <Tag color="blue">
                                    {post.category}
                                </Tag>
                                <Card style={{ width: '100%', marginTop: '16px' }}>
                                    <h1>{post.author}</h1>
                                    <p>{post.body}</p>
                                </Card>
                                <p
                                    style={{
                                        padding: "16px 0px 0px 0px"
                                    }}
                                >
                                    {`${new Date(post.timestamp).toDateString()} - 有 ` }
                                        <strong style={{
                                            fontWeight: 'bold',
                                            fontSize: '20px'
                                        }} >
                                            {post.voteScore}
                                        </strong>
                                    { ' 人点赞'}
                                </p> 
                            </Card>
                        </Content>
                        <CommentList />

                    </Layout>
                ) : (<Card loading title="title"
                        style={
                            {
                                width: '80%',
                                margin: '0 auto',
                            }
                        } 
                    >

                        Whatever content
                    </Card>
                )}
            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        postId: ownProps.match.params.id,
        post: state.posts.items[0]
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getPostById: (id) => {
            dispatch(fetchPostById(id))
        },
        getPostDetail: (obj, id, method, request, receive) => {
            dispatch(requestPostDetail(obj, id, method, request, receive))
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Post));