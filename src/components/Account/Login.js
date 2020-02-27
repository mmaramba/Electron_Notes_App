import React from 'react';
import { Form, Icon, Input, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { userLogin } from '../../api.js';
import styled from 'styled-components';

const { Title, Text } = Typography;

const FormIcon = styled(Icon)`
    color: rgba(0, 0, 0, 0.25);
`

const LoginContainer = styled.div`
  text-align: center;
  padding-top: 40px;
`

const CenteredDiv = styled.div`
  display: inline-block;
`

const LoginHeader = styled.div`
  margin-bottom: 20px;
  width: 200px
`

const WarningContainer = styled.div`
  margin-bottom: 20px;
  height: 30px;
  width: 200px;
  text-align: center;
  padding-left: 20px;
`

const LoginForm = styled(Form)`
  width: 200px;
  max-width: 300px;
`

const EmailFormItem = styled(Form.Item)`
  margin-bottom: 10px;
`

const LoginButton = styled(Button)`
  width: 50px;
  margin-top: 10px;
`

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errorText: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        userLogin(values).then((res) => {
          if (res.success) {
            this.props.onUserLogin();
            //this.setState({errorText: ''});
          } else {
            console.log("Do something with error");
            this.setState({errorText: res.error});
          }
        });
      }
      else {
        console.log(err);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <LoginContainer>
        <CenteredDiv>
          <LoginHeader>
            <Title level={4}>Sign in with your account</Title>
          </LoginHeader>
          <WarningContainer>
            <Text type="warning"> { this.state.errorText } </Text>
          </WarningContainer>
          <LoginForm onSubmit={this.handleSubmit}>
            <EmailFormItem>
              {
                getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your email!' }],
                })(
                  <Input
                    prefix={<FormIcon type="mail" />}
                    placeholder="Email"
                  />,
                )
              }
            </EmailFormItem>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your password!' }],
                })(
                  <Input
                    prefix={<FormIcon type="lock" />}
                    type="password"
                    placeholder="Password"
                  />,
                )
              }
            </Form.Item>
            <Form.Item>
                <LoginButton type="default" htmlType="submit">
                  <Icon type="login" />
                </LoginButton>
                <div>
                  Or <Link to="/Register">register now!</Link>
                </div>
            </Form.Item>
          </LoginForm>
        </CenteredDiv>
      </LoginContainer>
      );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;