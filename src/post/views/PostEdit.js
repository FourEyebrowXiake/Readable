import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import {
    requestPostDetail,
} from '../actions';
import {
    REQUEST_EDIT,
    RECIEVE_EDIT
} from '../actionTypes'
import { connect } from 'react-redux';


const FormItem = Form.Item;
const { TextArea } = Input;

class PostEdit extends Component {
    state = {
        visible: false,
        confirmLoading: false,
        fields: {
            title: {
                value: this.props.title,
            },
            body: {
                value: this.props.content,
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
        this.props.requestPostDetail(obj, this.props.id, 'PUT', REQUEST_EDIT, RECIEVE_EDIT)
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
                <Button type="primary" icon="edit" onClick={this.showModal} ></Button>
                <Modal title="edit post"
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
        };
    },
    onValuesChange(_, values) {

    },
})((props) => {
    const { getFieldDecorator } = props.form;
    return (
        <Form layout="vertical">
            <FormItem label="title">
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'title is required!' }],
                })(<TextArea placeholder="post title" autosize={{ minRows: 1, maxRows: 6 }} />)}
            </FormItem>
            <FormItem label="Content">
                {getFieldDecorator('body', {
                    rules: [{ required: true, message: 'body is required!' }],
                })(<TextArea placeholder="post content" autosize={{ minRows: 2, maxRows: 6 }} />)}
            </FormItem>
        </Form>
    );
});



export default connect(null, { requestPostDetail })(PostEdit)

