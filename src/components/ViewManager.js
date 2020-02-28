import React from 'react';
import LoggedInView from './LoggedInView.js';
import LoginView from './LoginView.js';


class ViewManager extends React.Component {
  constructor(props){
    super(props);
  }

  state = {
    isLoggedIn: false
  }

  handleUserLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  }

  render() {
    return (
      this.state.isLoggedIn?
        <LoggedInView /> :
        <LoginView onUserLogin={this.handleUserLogin} />
    );
  }
}

export default ViewManager;