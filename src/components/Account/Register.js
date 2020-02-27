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
import { registerUser, userLogin } from '../../api.js';
import styled from 'styled-components';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const { Title, Paragraph, Text } = Typography;

const RegistrationContainer = styled.div`
    text-align: left;
    padding-top: 40px;
`

const StyledForm = styled(Form)`
    width: 200px;
    display: inline-block
`

const CenteredTextDiv = styled.div`
    text-align: center;
`

const LeftAlignDiv = styled.div`
    text-align: left;
`

const RegistrationHeader = styled.div`
    text-align: center;
    margin-bottom: 5px;
`

const WarningContainer = styled.div`
    text-align: center;
    height: 30px;
    margin-bottom: 10px;
`

const EmailFormItem = styled(Form.Item)`
    margin-bottom: 10px;
`

const PasswordFormItem = styled(Form.Item)`
    margin-bottom: 5px;
`

const RegisterFormItem = styled(Form.Item)`
    margin-bottom: 15px;
`

const FormIcon = styled(Icon)`
    color: rgba(0, 0, 0, 0.25);
`

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
								this.setState({ errorText: '' });
							} else {
								console.log("Error logging in as newly registered user");
							}
						})
					} else {
						console.log("Do something with error");
						this.setState({ errorText: res.error });
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
			<RegistrationContainer>
				<CenteredTextDiv>
					<RegistrationHeader>
						<Title level={4}>Register an account</Title>
					</RegistrationHeader>
					<WarningContainer>
						<Text type="warning"> {this.state.errorText} </Text>
					</WarningContainer>
					<StyledForm onSubmit={this.handleSubmit}>
						<LeftAlignDiv>Email</LeftAlignDiv>
						<EmailFormItem>
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
							})(<Input placeholder="Email" prefix={<FormIcon type="mail" />} />)}
						</EmailFormItem>
						<LeftAlignDiv>Password</LeftAlignDiv>
						<PasswordFormItem hasFeedback>
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
							})(<Input.Password placeholder="Enter a Password" prefix={<FormIcon type="lock" />} />)}
						</PasswordFormItem>
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
							})(<Input.Password onBlur={this.handleConfirmBlur} placeholder="Confirm Password" prefix={<FormIcon type="safety" />} />)}
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
						<RegisterFormItem>
							<Button type="default" htmlType="submit">
								Register
                        </Button>

						</RegisterFormItem >
					</StyledForm>
					<CenteredTextDiv>Already have an account? <Link to="/login">Log in!</Link></CenteredTextDiv>
				</CenteredTextDiv>
			</RegistrationContainer>
		);
	}
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);

export default WrappedRegistrationForm;