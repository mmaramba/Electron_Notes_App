import React from 'react';
import { Layout, Row } from 'antd';
import LeftNav from './LeftNav.js';
import ItemsView from './ItemsView.js';
import HomeView from './HomeView.js';
import { HashRouter, Switch, Route } from 'react-router-dom';


class ViewManager extends React.Component {
  constructor(props){
    super(props);
  }

  render() {

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