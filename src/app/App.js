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
        <Layout>
          <Header>
            <div className="logo" />
            <PostCreate />
          </Header> 
          
          <Route exact path="/:category?" render={() => (
            <Content style={{ padding: '16px 50px' }}>
              <Layout style={{ padding: '24px 0', background: '#fff' }}>
                <Category />
                <Content style={{ padding: '0 24px', minHeight: '100%' }}>
                  <PostList />
                </Content>
              </Layout>
            </Content>
          )} >
          </Route>

            <Route  path="/posts/:id" render={() => (
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
