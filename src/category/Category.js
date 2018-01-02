import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import { fetchCategory } from './CategoryAction';
import { fetchPosts, order } from '../post/PostAction';
import {  Link } from 'react-router-dom'


class Category extends Component {

    componentDidMount() {
        const { getCategories } =this.props
        getCategories();
    }

    handleClick = (e) => {
        switch(e.key) {
            case 'redux':
            case 'udacity':
            case 'react':
                this.props.fetchPosts(e.key)
                break;
            case 'vote':
            case 'time':
                this.props.order(e.key) 
                break;
            case 'all':
                this.props.fetchPosts()
                break;
            default:
                return e.key
        }
        
    }

    render() {
        const { Sider } = Layout;
        const SubMenu = Menu.SubMenu;
        const { categories } = this.props

        return (
            <Sider width={200} 
                style={{ 
                background: '#fff',
                }}>
                <Menu
                    onClick={this.handleClick}
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="all">
                        {"All Post"}
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="tags-o" />Category</span>}>
                        {
                            categories.map((item) => (   
                                <Menu.Item key={item.path} >
                                    {/* <Link to={`/${item.name}/posts`} >
                                        {item.name}
                                        </Link> */}
                                    {item.name}
                                </Menu.Item>
                            ))
                        }
                    </SubMenu>
                    <SubMenu
                        title={<span><Icon type="setting" />Order</span>}
                    >
                        <Menu.Item key="vote">
                            {"ByVote"}
                        </Menu.Item>
                        <Menu.Item key="time">
                            {"ByTime"}
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories.items
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCategories: () => {
            dispatch(fetchCategory())
        },
        fetchPosts: (category) => {
            dispatch(fetchPosts(category))
        },
        order: (kind) => {
            dispatch(order(kind))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category);
