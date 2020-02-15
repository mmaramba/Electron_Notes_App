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
            xs: { span: 10 },
            sm: { span: 10 },
        },
        wrapperCol: {
            xs: { span: 10 },
            sm: { span: 12 },
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
            <div style={{paddingTop: "40px", textAlign: "left"}}>
                <div style={{textAlign: "center"}}>
                    <div style={{textAlign: "center", marginBottom: "5px"}}>
                        <Title level={4}>Register an account</Title>
                    </div>
                    <div style={{ textAlign: "center", height: "30px", marginBottom: "10px"}}>
                        <Text type="warning"> { this.state.errorText } </Text>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{display: "inline-block", width: "200px"}}>
                        <div style={{textAlign: "left"}}>Email</div>
                        <Form.Item style={{marginBottom: "10px"}}>
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
                        })(<Input placeholder="Email" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                        </Form.Item>
                        <div style={{textAlign: "left"}}>Password</div>
                        <Form.Item hasFeedback style={{marginBottom: "5px"}}>
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
                        })(<Input.Password placeholder="Enter a Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                        </Form.Item>
                        <Form.Item hasFeedback>
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
                        })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="Confirm Password" prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                        </Form.Item>
                        {/*
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
                        */}
                        <Form.Item style={{marginBottom: "15px"}}>
                        <Button type="default" htmlType="submit">
                            Register
                        </Button>
                        
                        </Form.Item >
                    </Form>
                    <div style={{textAlign: "center"}}>Already have an account? <Link to="/login">Log in!</Link></div>
                </div>
            </div>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);
  
export default WrappedRegistrationForm;