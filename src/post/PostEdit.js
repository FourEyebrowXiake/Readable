import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import {
    requestPostDetail,
    REQUEST_EDIT,
    RECIEVE_EDIT
} from './PostAction';
import { connect } from 'react-redux';


const FormItem = Form.Item;
const { TextArea } = Input;

class PostCreate extends Component {
    state = {
        visible: false,
        confirmLoading: false,
        fields: {
            title: {
                value: '',
            },
            body: {
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
        this.props.editPost(obj, this.props.id, 'PUT', REQUEST_EDIT, RECIEVE_EDIT)
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
            <FormItem >
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'title is required!' }],
                })(<TextArea placeholder="post title" autosize={{ minRows: 1, maxRows: 6 }} />)}
            </FormItem>
            <FormItem >
                {getFieldDecorator('body', {
                    rules: [{ required: true, message: 'body is required!' }],
                })(<TextArea placeholder="post content" autosize={{ minRows: 2, maxRows: 6 }} />)}
            </FormItem>
        </Form>
    );
});



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        editPost: (obj, id, method, request, receive) => {
            dispatch(requestPostDetail(obj, id, method, request, receive))
        }
    }
}


export default connect(null, mapDispatchToProps)(PostCreate)

