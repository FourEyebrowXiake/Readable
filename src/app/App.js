import React, { Component } from 'react';
import { Layout, Menu, Avatar, Icon, Button } from 'antd';
import PostList from '../post/PostList';

class App extends Component {
  render() {
    const { Header, Content, Footer } = Layout;

    const SubMenu = Menu.SubMenu;

    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
            <Menu.Item key="4">
              <Button type="primary" icon="plus">创建</Button>
            </Menu.Item>
            <SubMenu 
              title={<span><Icon type="setting" />Order</span>} 
            >
              <Menu.Item key="0">
                <a href="http://www.alipay.com/">1st menu item</a>
              </Menu.Item>
              <Menu.Item key="1">
                <a href="http://www.taobao.com/">2nd menu item</a>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Header>

        
        <Content style={{ padding: '16px 50px' }}>
          <PostList />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

export default App;
