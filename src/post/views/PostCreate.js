import React, { Component } from 'react';
import { Modal, Button, Form, Input  } from 'antd';
import { createPost } from '../actions';
import { connect } from 'react-redux';
import { guid } from '../../tool/Tool'


const FormItem = Form.Item;
const { TextArea } = Input;

const initFields = {
    title: {
        value: '',
    },
    body: {
        value: '',
    },
    author: {
        value: '',
    },
    category: {
        value: '',
    },
}

class PostCreate extends Component {
    state = {
        visible: false,
        confirmLoading: false,
        fields: initFields
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({
            confirmLoading: false,
            visible: false,
        });

        var obj = {};

        Object.keys(this.state.fields).forEach((item) => {
            obj[item] = this.state.fields[item].value;
        })
        obj['timestamp'] = Date.now()
        obj['id'] = guid()

        this.props.createPost(obj)
        this.setState({ fields: initFields })
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    handleFormChange = (changedFields) => {
        this.setState({
            fields: { ...this.state.fields, ...changedFields },
        });
    }
    render() {
        const { visible, confirmLoading } = this.state;
        const fields = this.state.fields;
        return (
            <div>
                <Button type="primary" icon="plus" onClick={this.showModal} >Create Post</Button>
                <Modal title="Began to create"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <div>
                        <CustomizedForm {...fields} onChange={this.handleFormChange} />
                    </div>
                    
                </Modal>
            </div>
        );
    }

}

const CustomizedForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            title: Form.createFormField({
                ...props.title,
                value: props.title.value,
            }),
            body: Form.createFormField({
                ...props.body,
                value: props.body.value,
            }),
            author: Form.createFormField({
                ...props.author,
                value: props.author.value,
            }),
            category: Form.createFormField({
                ...props.category,
                value: props.category.value,
            }),
        };
    },
})((props) => {
    const { getFieldDecorator } = props.form;
    return (
        <Form layout="vertical">
            <FormItem label="Title">
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'title is required!' }],
                })(<TextArea placeholder="post title" autosize={{ minRows: 1, maxRows: 6 }} />)}
            </FormItem>
            <FormItem label="Content">
                {getFieldDecorator('body', {
                    rules: [{ required: true, message: 'body is required!' }],
                })(<TextArea placeholder="post content" autosize={{ minRows: 2, maxRows: 6 }} />)}
            </FormItem>
            <FormItem label="Author">
                {getFieldDecorator('author', {
                    rules: [{ required: true, message: 'author is required!' }],
                })(<Input placeholder="post author" />)}
            </FormItem>
            <FormItem label="Category">
                {getFieldDecorator('category', {
                    rules: [{
                        required: true,
                        message: 'Category contains only readux, react， udacity',
                        pattern: '(udacity)|(redux)|(react)'
                    }],
                })(<Input placeholder="post category" />)}
            </FormItem>
        </Form>
    );
});





export default connect(null, { createPost })(PostCreate)

