import React, { Component } from 'react';
import { List, Avatar, Icon } from 'antd';
import { fetchPosts } from './PostAction';
import { connect } from 'react-redux';

class PostList extends Component {

    componentDidMount() {
       const{ getPosts } = this.props;
       getPosts();
    }

    render() {
        const { posts } = this.props;
        const listData = [];
        posts.forEach((item) => {
            listData.push({
                href: `/posts/${item.id}`,
                title: item.title,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: `${item.author} - ${new Date(item.timestamp).toDateString()} - ${item.category}`,
                content:item.body,
                voteScore: item.voteScore,
                commentCount: item.commentCount
            });
        })

        // const pagination = {
        //     pageSize: 2,
        //     current: 1,
        //     total: listData.length,
        //     onChange: ((e) => { 
                
        //     }),
        // };

        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
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
                        actions={[<IconText type="like-o" text={item.voteScore} />, 
                        <IconText type="message" text={item.commentCount} />]}
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
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts.items
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
