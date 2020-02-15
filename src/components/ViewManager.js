import React from 'react';
import { Layout, Row } from 'antd';
import LeftNav from './LeftNav.js';
import ItemsView from './ItemsView.js';
import HomeView from './HomeView.js';
import WrappedNormalLoginForm from './Login.js';
import WrappedRegistrationForm from './Register.js';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';


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

    const isLoggedIn = this.state.isLoggedIn;
    if (!isLoggedIn) {
      return (
        <HashRouter>
          <Switch>
            <Route path="/login">
              <WrappedNormalLoginForm onUserLogin={this.handleUserLogin} />
            </Route>
            <Route path="/register">
              <WrappedRegistrationForm onUserLogin={this.handleUserLogin} />
            </Route>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </HashRouter>
      );
    }

    return (
      <Layout style={{ height: '100vh' }}>
        <HashRouter>
          <LeftNav />
          <Switch>
            <Route path="/items">
              <ItemsView filter="all"/>
            </Route>
            <Route path="/starred">
              <ItemsView filter="starred" />
            </Route>
            <Route path="/">
              <HomeView />
            </Route>
          </Switch>
        </HashRouter>
      </Layout>
    );
  }
}

export default ViewManager;