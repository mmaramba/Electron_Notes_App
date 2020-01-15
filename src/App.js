import React from 'react';
import logo from './logo.svg';
import './App.css';
import Component1 from './components/Component1.js';
import Component2 from './components/Component2.js';
import SiderDemo from './components/SiderDemo.js';
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
            <div className="leftIconTop">
              <Link to="/">
                <Icon type="user" />
              </Link>
            </div>
            <div className="leftIconMid">
              <Link to="/">
                <Icon type="plus-circle" />
              </Link>
            </div>
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
                <Icon type="carry-out" />
              </Link>
            </div>
          </Col>
          <Col span={22} className="midCol" style={{"user-select": "none"}}>
            <SiderDemo />
          </Col>
        </Row>
      </HashRouter>
    </div>
  );
}

export default App;
