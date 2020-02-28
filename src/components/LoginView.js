import React from 'react';
import { Layout, Row, Col } from 'antd';
import WrappedNormalLoginForm from './Account/Login.js';
import WrappedRegistrationForm from './Account/Register.js';
import LoginCarousel from './Account/LoginCarousel.js';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

const StyledLayout = styled(Layout)`
  height: 100vh;
`

const StyledRow = styled(Row)`
  height: 100%;
`

const InputCol = styled(Col)`
  height: 100%;
  overflow: auto;
  background-color: whitesmoke;
`

const CarouselCol = styled(Col)`
  height: 100%;
  background-color: red;
`


class LoginView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<StyledLayout>
				<StyledRow>
					<InputCol span={10}>
						<HashRouter>
							<Switch>
								<Route path="/login">
									<WrappedNormalLoginForm onUserLogin={this.props.onUserLogin} />
								</Route>
								<Route path="/register">
									<WrappedRegistrationForm onUserLogin={this.props.onUserLogin} />
								</Route>
								<Route path="/">
									<Redirect to="/login" />
								</Route>
							</Switch>
						</HashRouter>
					</InputCol>
					<CarouselCol span={14}>
						<LoginCarousel />
					</CarouselCol>
				</StyledRow>
			</StyledLayout>
		);
	}
}

export default LoginView;