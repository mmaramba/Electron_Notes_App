import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './SiderDemo.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <div className="logo" />
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" style={{"text-align": "left"}}>
            <Menu.Item key="1" className="menuItem">
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2" className="menuItem">
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                  <span>Team</span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Current Category</Breadcrumb.Item>
              <Breadcrumb.Item>Option 1</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Text goes here.</div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;