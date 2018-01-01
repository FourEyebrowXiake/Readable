import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Link } from 'react-router-dom';
import PostList from '../post/PostList';
import Category from '../category/Category';
import PostCreate from '../post/PostCreate';
import Post from '../post/Post';


class App extends Component {
  render() {
    const { Header, Content, Footer } = Layout;

    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <PostCreate />
        </Header>

        <Route exact path="/" render={() => (
          <Layout>
            <Category />
              <Content style={{ padding: '16px 50px' }}>
                <PostList />
              </Content>
          </Layout>
        )} >
        </Route>

          <Route  path="/posts/:id?" render={() => (
            <Post />
          )}>   
          </Route>
          
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

export default App;
