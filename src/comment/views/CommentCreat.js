import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { fetchComment } from '../actions';
import { connect } from 'react-redux';
import { REQUEST_COMMENT_CREAT, RECEIVE_COMMNET_CREAT } from '../actionTypes'
import { guid } from '../../tool/Tool'


const FormItem = Form.Item;
const { TextArea } = Input;

class CommentCreate extends Component {
    state = {
        visible: false,
        confirmLoading: false,
        fields: {
            body: {
                value: '',
            },
            author: {
                value: '',
            },
        },
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

        var comment = {};

        Object.keys(this.state.fields).forEach((item) => {
            comment[item] = this.state.fields[item].value;
        })
        comment['timestamp'] = Date.now()
        comment['id'] = guid()
        comment['parentId'] = this.props.parentId

        this.props.fetchComment(comment, null, 'POST', REQUEST_COMMENT_CREAT, RECEIVE_COMMNET_CREAT)
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
                <Button type="primary" icon="plus" onClick={this.showModal} >create</Button>
                <Modal title="Began to Create"
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
            body: Form.createFormField({
                ...props.body,
                value: props.body.value,
            }),
            author: Form.createFormField({
                ...props.author,
                value: props.author.value,
            }),
        };
    },
    onValuesChange(_, values) {

    },
})((props) => {
    const { getFieldDecorator } = props.form;
    return (
        <Form layout="vertical">
            <FormItem label="Content">
                {getFieldDecorator('body', {
                    rules: [{ required: true, message: 'body is required!' }],
                })(<TextArea placeholder="comment content" autosize={{ minRows: 2, maxRows: 6 }} />)}
            </FormItem>
            <FormItem label="Author">
                {getFieldDecorator('author', {
                    rules: [{ required: true, message: 'author is required!' }],
                })(<Input placeholder="comment author" />)}
            </FormItem>
        </Form>
    );
});




export default connect(null, { fetchComment })(CommentCreate)

