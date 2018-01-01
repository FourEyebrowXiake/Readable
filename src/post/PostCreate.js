import React, { Component } from 'react';
import { Modal, Button, Form, Input  } from 'antd';
import { createPost } from './PostAction';
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
            author: {
                value: '',
            },
            category: {
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

        this.props.createPost(obj)
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
                <Button type="primary" icon="plus" onClick={this.showModal} >创建</Button>
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
                    rules: [{ required: true, message: 'title is required!' }],
                })(<TextArea placeholder="post content" autosize={{ minRows: 2, maxRows: 6 }} />)}
            </FormItem>
            <FormItem >
                {getFieldDecorator('author', {
                    rules: [{ required: true, message: 'title is required!' }],
                })(<Input placeholder="post author" />)}
            </FormItem>
            <FormItem >
                {getFieldDecorator('category', {
                    rules: [{ required: true, message: 'title is required!' }],
                })(<Input placeholder="post category" />)}
            </FormItem>
        </Form>
    );
});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createPost: (obj) => {
            dispatch(createPost(obj))
        }
    }
}


export default connect(null, mapDispatchToProps)(PostCreate)

