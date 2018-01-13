import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import { PostList, PostCreate, Post } from '../post/index';
import { view as Category }  from '../category/index';
import NotFoundPage from './404'

const { Header, Content, Footer } = Layout;

const HomeContent = () => (
  <Content style={{ padding: '16px 50px' }}>
    <Layout style={{ padding: '24px 0', background: '#fff' }}>
      <Category />
      <Content style={{ padding: '0 24px', minHeight: '100%' }}>
        <PostList />
      </Content>
    </Layout>
  </Content>
) 

class App extends Component {
  render() {
    return (
        <Layout>
          <Header>
          <Link to="/">
            <div className="logo" />          
          </Link>
            <PostCreate />
          </Header> 
          
          <Switch>
            <Route path="/404" component={NotFoundPage} />
            <Route exact path="/:category?" component={HomeContent} />
            <Route  path="/posts/:id" component={Post} />  
            <Redirect to="/404" />
          </Switch>

          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
    );
  }
}


export default App;
