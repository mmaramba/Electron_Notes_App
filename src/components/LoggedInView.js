import React from 'react';
import { Layout, Row, Col, Spin } from 'antd';
import LeftNav from './LeftNav.js';
import ItemsView from './ItemsView.js';
import HomeView from './HomeView.js';
import { getUser } from '../api.js';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';


class LoggedInView extends React.Component {
  constructor(props){
    super(props);
  }

  state = {
      user: {}
  }

  componentDidMount() {
      console.log("Make GET /user request here");
      getUser().then((res) => {
        console.log(res);
        this.setState({
          user: res
        });
      });
  }

  render() {
    console.log(this.state.user);

    // if empty object
    if (Object.keys(this.state.user).length === 0 && this.state.user.constructor === Object) {
        return <Spin />
    }

    return (
      <Layout style={{ height: '100vh' }}>
        <HashRouter>
          <LeftNav cats={this.state.user.categories} first={this.state.user.firstName} last={this.state.user.lastName} email={this.state.user.email}/>
          <Switch>
            <Route path="/items">
              <ItemsView filter="all" items={this.state.user.items.reverse()} cats={this.state.user.categories} />
            </Route>
            <Route path="/starred">
              <ItemsView filter="starred" items={this.state.user.items.filter(e => e.star).reverse()} cats={this.state.user.categories} />
            </Route>
            <Route path="/cat/:categoryId" render={(props) => {
                return <ItemsView filter="category" items={this.state.user.items.reverse()} cats={this.state.user.categories} {...props} />
            }}>
            </Route>
            <Route path="/">
              {/*<HomeView />*/}
              <Redirect to="/items" />
            </Route>
          </Switch>
        </HashRouter>
      </Layout>
    );
  }
}

export default LoggedInView;