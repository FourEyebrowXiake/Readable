import React, { Component } from 'react';
import { Icon } from 'antd'

const Message = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

export default Message;