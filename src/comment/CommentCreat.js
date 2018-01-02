import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { fetchComment } from './CommentAction';
import { connect } from 'react-redux';
import { REQUEST_COMMENT_CREAT, RECEIVE_COMMNET_CREAT } from './CommentAction'
import { guid } from '../tool/Tool'


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

        var obj = {};

        Object.keys(this.state.fields).forEach((item) => {
            obj[item] = this.state.fields[item].value;
        })
        obj['timestamp'] = Date.now()
        obj['id'] = guid()
        obj['parentId'] = this.props.parentId

        this.props.createComment(obj, null, 'POST', REQUEST_COMMENT_CREAT, RECEIVE_COMMNET_CREAT)
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
                <Modal title="开始你的创作"
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
            <FormItem >
                {getFieldDecorator('body', {
                    rules: [{ required: true, message: 'body is required!' }],
                })(<TextArea placeholder="comment content" autosize={{ minRows: 2, maxRows: 6 }} />)}
            </FormItem>
            <FormItem >
                {getFieldDecorator('author', {
                    rules: [{ required: true, message: 'author is required!' }],
                })(<Input placeholder="comment author" />)}
            </FormItem>
        </Form>
    );
});




const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createComment: (obj, id, method, request, receive) => {
            dispatch(fetchComment(obj, id, method, request, receive))
        },
    }
}


export default connect(null, mapDispatchToProps)(CommentCreate)

