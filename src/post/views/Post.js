import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, Tag, Layout } from 'antd'
import { fetchPostById } from '../actions'
import { view as CommentList } from '../../comment/index'
import Vote from './Vote'
import Message from './Message'
import PostEdit from './PostEdit'
import Delete from './Delete'
import { isEmpty } from '../../tool/Tool'
import  NotFoundPage from '../../app/NotFoundPage'



class Post extends Component {

    componentDidMount() {
        const { postId, fetchPostById } = this.props;
        fetchPostById(postId)
    }

    render() {
        const { post, postId, history } = this.props;
        const { Content } = Layout;
        return (
            <div>
                {post ? (
                     <div>
                        {isEmpty(post) ? (<NotFoundPage />) : (
                             <Layout>
                                <Content style={{ padding: '16px 50px' }} >
                                    <Card loading={false} title={post.title}
                                        actions={[<Vote score={post.voteScore} type="like-o" action="upVote" id={postId} />,
                                        <Vote score={post.voteScore} type="dislike-o" action="downVote" id={postId} />,
                                        <PostEdit title={post.title} content={post.body} id={post.id} />,
                                        <Delete type="delete" id={post.id} method="DELETE" />,
                                        <Message type="message" text={post.commentCount} />,]}
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
                                            {new Date(post.timestamp).toDateString()}
                                        </p>
                                    </Card>
                                </Content>
                                <hr />
                                <CommentList />
                            </Layout>
                         )}
                    </div>
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
        )
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        postId: ownProps.match.params.id,
        post: state.posts.items[0]
    }
}

export default withRouter(connect(
    mapStateToProps,
    { fetchPostById }
)(Post));