import React, { Component } from 'react'
import { List, Avatar } from 'antd'
import { withRouter } from 'react-router-dom'
import {
    fetchPosts
} from '../actions';
import { connect } from 'react-redux'
import PostEdit from './PostEdit'
import Delete from './Delete'
import Message from './Message'
import Vote from './Vote'

class PostList extends Component {

    componentDidMount() {
        const { fetchPosts } = this.props;
        fetchPosts();
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
                            <Vote score={item.voteScore} type="like-o" action="upVote" id={item.id} />,
                            <Vote score={item.voteScore} type="dislike-o" action="downVote" id={item.id} />,
                            <Message type="message" text={item.commentCount} />,
                            <PostEdit id={item.id} title={item.title} content={item.content} />,
                            <Delete type="delete" id={item.id} method="DELETE" />
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


const mapStateToProps = (state, ownProps) => {
    return {
        posts: getVisiblePosts(state.posts.items, ownProps.match.params.category)
    }
}

const getVisiblePosts = (items, category) => {
    if(category === undefined) {
        return items;
    }
    return items.filter(item => item.category === category)
}

export default withRouter(connect(mapStateToProps, {
    fetchPosts
})(PostList))
