import React from 'react';
import { Link } from 'react-router-dom';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Typography
} from 'antd';
import { registerUser, userLogin } from '../api.js';
  
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const { Title, Paragraph, Text } = Typography;


class Register extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        errorText: ''
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                registerUser(values).then((res) => {
                    if (res.success) {
                        userLogin({
                            'email': values.email,
                            'password': values.password
                        }).then((loginRes) => {
                            if (loginRes.success) {
                                this.props.onUserLogin();
                                this.setState({errorText: ''});
                            } else {
                                console.log("Error logging in as newly registered user");
                            }
                        })
                    } else {
                        console.log("Do something with error");
                        this.setState({errorText: res.error});
                    }
                });
            } else {
                console.log(err);
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
        } else {
        callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
        };
        const tailFormItemLayout = {
        wrapperCol: {
            xs: {
            span: 24,
            offset: 0,
            },
            sm: {
            span: 16,
            offset: 8,
            },
        },
        };

        return (
            <div style={{textAlign: "center", paddingTop: "75px", paddingRight: "75px"}}>
                <div style={{display: "inline-block", width: "400px"}}>
                    <div style={{marginLeft: "120px", marginBottom: "20px"}}>
                        <Title level={4}>Register an account</Title>
                    </div>
                    <div style={{ marginLeft: "120px", height: "50px"}}>
                        <Text type="warning"> { this.state.errorText } </Text>
                    </div>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="Email">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid email!',
                            },
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            ],
                        })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                            ],
                        })(<Input.Password />)}
                        </Form.Item>
                        <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                First Name&nbsp;
                                </span>
                            }
                            >
                            {getFieldDecorator('firstName', {
                                rules: [{ required: false, message: '', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                Last Name&nbsp;
                                </span>
                            }
                            >
                            {getFieldDecorator('lastName', {
                                rules: [{ required: false, message: '', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                        <Button type="default" htmlType="submit">
                            Register
                        </Button>
                        <div>Already have an account? <Link to="/login">Log in!</Link></div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);
  
export default WrappedRegistrationForm;