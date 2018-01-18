import React, { Component } from 'react';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

const NotFoundPage = () => (
    <Content 
    style={{
        minHeight: "100%",
        textAlign: "center"
    }}
    
    >
        <h1>404</h1>
    </Content>
)

export default NotFoundPage