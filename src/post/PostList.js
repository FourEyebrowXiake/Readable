import React, { Component } from 'react';
import { List, Avatar, Icon, Button } from 'antd';
import {
    fetchPosts,
    requestPostDetail,
    RECEIVE_DELETE,
    REQUEST_DELETE
} from './PostAction';
import { connect } from 'react-redux';
import PostEdit from './PostEdit';

class PostList extends Component {

    componentDidMount() {
       const{ getPosts } = this.props;
       getPosts();
    }

    handleChange() {
        const { deletePost } = this.props;
        deletePost({}, arguments[0], arguments[1], REQUEST_DELETE, RECEIVE_DELETE)
    }

    render() {
        const { posts } = this.props;
        const listData = [];
        posts.forEach((item) => {
            listData.push({
                href: `/posts/${item.id}`,
                id: item.id,
                title: item.title,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: `${item.author} - ${new Date(item.timestamp).toDateString()} - ${item.category}`,
                content:item.body,
                voteScore: item.voteScore,
                commentCount: item.commentCount
            });
        })

        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );

        const Delete = ({ type = null, action, cId, method }) => (
            <Button icon={type}
                onClick={this.handleChange.bind(this, cId, method)}
                type="danger" >
            </Button>
        );

        
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={false}
                dataSource={listData}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                        <IconText type="like-o" text={item.voteScore} />, 
                        <IconText type="message" text={item.commentCount} />,
                        <PostEdit id={item.id} />,
                        <Delete type="delete" cId={item.id} method="DELETE" />
                    ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getPosts: () => {
            dispatch(fetchPosts())
        },
        deletePost: (obj, id, method, request, receive) => {
            dispatch(requestPostDetail(obj, id, method, request, receive))
        },
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts.items
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
