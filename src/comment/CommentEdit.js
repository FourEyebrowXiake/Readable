import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import {
    REQUESt_COMMENT_EDIT,
    RECEIVE_COMMNET_EDIT,
    fetchComment,
    RECEIVE_COMMENT_VOTE
 } from './CommentAction';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { guid } from '../tool/Tool'


const FormItem = Form.Item;
const { TextArea } = Input;

class EditComment extends Component {
    state = {
        visible: false,
        confirmLoading: false,
        fields: {
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
        obj['timestamp'] = Date.now()

        this.props.editComment(obj, this.props.id, 'PUT', REQUESt_COMMENT_EDIT, RECEIVE_COMMNET_EDIT)
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
                <Modal title="编辑留言"
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
                })(<TextArea placeholder="post content" autosize={{ minRows: 2, maxRows: 6 }} />)}
            </FormItem>
        </Form>
    );
});



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        editComment: (obj, id, method, request, receive) => {
            dispatch(fetchComment(obj, id, method, request, receive))
        }
    }
}


export default withRouter(connect(null, mapDispatchToProps)(EditComment))

