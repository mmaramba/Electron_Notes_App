import React from 'react';
import logo from './logo.svg';
import './App.css';
import Component1 from './components/Component1.js';
import Component2 from './components/Component2.js';
import { 
  Button, 
  Row,
  Col,
  Icon,
  Layout
} from 'antd';
import {
  HashRouter,
  Route,
  Link,
  Switch
} from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Row justify="end">
          <Col span={2} className="leftCol">
            <div className="leftIcon">
              <Link to="/">
                <Icon type="home" />
              </Link>
            </div>
            <div className="leftIcon">
              <Link to="/test">
                <Icon type="book" />
              </Link>
            </div>
            <div className="leftIcon">
              <Link to="/test">
                <Icon type="calendar" />
              </Link>
            </div>
            <div className="leftIcon">
              <Link to="/test">
                <Icon type="check-circle" />
              </Link>
            </div>
          </Col>
          <Col span={8} className="midCol">
            <Layout className="layout">
              <Header className="midColHeader">
                <div>
                  Page Header
                </div>
              </Header>
              <Content className="midColContent">
                <div>
                  <div>Something</div>
                  <div>Something else</div>
                  <div>Some other thing</div>
                  <div>Last thing</div>
                </div>
              </Content>
            </Layout>      
          </Col>
          <Col span={14} className="rightCol">
            <Switch>
              <Route path="/" exact component={Component1} />
              <Route path="/test" component={Component2} />
            </Switch>
          </Col>
        </Row>
      </HashRouter>
    </div>
  );
}

export default App;
