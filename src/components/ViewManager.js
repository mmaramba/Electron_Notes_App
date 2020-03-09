import React from 'react';
import LoggedInView from './LoggedInView.js';
import LoginView from './LoginView.js';
import { connect } from 'react-redux';
import { login } from '../actions.js';


class ViewManager extends React.Component {
  constructor(props){
    super(props);
  }

  handleLogin = data => {
    this.props.dispatch(login(data));
  }

  render() {
    console.log(this.props);
    return (
      this.props.loginStatus.loggedIn?
        <LoggedInView /> :
        <LoginView login={this.handleLogin} loginStatus={this.props.loginStatus}/>
    );
  }
}

function mapStateToProps(state) {
  const { loginStatus } = state;
  const { loggedIn, isFetching, error } = loginStatus || {isFetching: false, loggedIn: false, error: ''}
  
  return {
    loginStatus: {
      loggedIn,
      isFetching,
      error
    }
  }
}

export default connect(mapStateToProps)(ViewManager);