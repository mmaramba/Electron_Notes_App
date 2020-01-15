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
  Layout,
  Breadcrumb
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
        <SiderDemo />
      </HashRouter>
    </div>
  );
}

export default App;
