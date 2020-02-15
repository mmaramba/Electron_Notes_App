import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import { Link } from 'react-router-dom';
import './Login.css';
import { userLogin } from '../api.js';

const { Title, Paragraph, Text } = Typography;

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
            this.setState({errorText: ''});
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
        <div style={{textAlign: "center", paddingTop: "100px"}}>
            <div style={{display: "inline-block"}}>
                <div style={{marginBottom: "25px"}}>
                  <Title level={4}>Sign in with your account</Title>
                </div>
                <div style={{marginBottom: "20px", height: "30px"}}>
                  <Text type="warning"> { this.state.errorText } </Text>
                </div>
                
                <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                    <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                    />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your password!' }],
                    })(
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                    />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="default" htmlType="submit" className="login-form-button" style={{width: "50px"}}>
                      <Icon type="login" />
                    </Button>
                    <div>
                      Or <Link to="/Register">register now!</Link>
                    </div>
                </Form.Item>
                </Form>
            </div>
        </div>
      );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;