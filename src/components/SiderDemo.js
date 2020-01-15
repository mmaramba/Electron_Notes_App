import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Avatar, Row, Col, List } from 'antd';
import './SiderDemo.css'
import { callbackify } from 'util';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const data = [];
const cats = ["Homework", "Grocery Lists", "Class Notes"];
for (let i = 0; i < 10; i++) {
  data.push({
    title: `Item ${i}`,
    description:
      `This is a description for item ${i}.`,
    category: cats[Math.floor(Math.random()*cats.length)]
  });
}

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    name: "User's Name"
  };

  toggle = () => {
    var display = this.state.name === "User's Name" ? "" : "User's Name";
    this.setState({
      collapsed: !this.state.collapsed,
      name: display
    });
  };

  userClicked = () => {
    console.log("Username clicked.");
  }

  getPaddingFooter = () => {
    var padding = this.state.collapsed? "5px" : "150px";
    return padding;
  }

  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider style={{"background-color": "white"}} trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <Avatar className="userAvatar" size={64} onClick={this.userClicked()}>UN</Avatar>
            <div 
              style={{"padding-top": "10px", "color": "black", "user-select": "none"}}
            >
              {this.state.name}
            </div>
          </div>
          <Menu theme="light" defaultSelectedKeys={['9']} mode="inline" style={{"text-align": "left"}}>
            <Menu.Item key="1" className="menuItem">
              <span>
                <Icon type="home" />
                <span>Home</span>
              </span>
            </Menu.Item>
            <Menu.Item key="9">
              <span>
                <Icon type="file-text" />
                <span>Items</span>
              </span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="folder" />
                  <span>Categories</span>
                </span>
              }
            >
              <Menu.Item key="3">Homework</Menu.Item>
              <Menu.Item key="4">Grocery Lists</Menu.Item>
              <Menu.Item key="5">Class Notes</Menu.Item>
            </SubMenu>
            <Menu.Item key="2" className="menuItem">
              <span>
                <Icon type="star" />
                <span>Starred</span>
              </span>
            </Menu.Item>
          </Menu>
          <div className="mainFooter">
            <Icon 
              className="trigger"
              type={this.state.collapsed ? 'right' : 'left'}
              onClick={this.toggle}
              style={{
                "padding-left": this.getPaddingFooter()
              }}
            />
          </div>
        </Sider>
        <Layout>
          <Row>
            <Col span={8}>
              <Layout style={{minHeight: "100vh"}}>
                <Content style={{ backgroundColor: "f0f0f0"}}>
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  size="large"
                  renderItem={item => (
                    <List.Item style={{textAlign: "left", paddingLeft: "10px", paddingBottom: "0px"}}
                      key={item.title}
                    >
                      <List.Item.Meta
                        title={<div style={{"position": "relative"}}>
                          {item.title}
                          <span style={{
                            "position": "absolute", 
                            "right": "20px", 
                            "font-size": "0.7em", 
                            "font-weight": "normal"
                          }}>
                            23 Jan
                          </span>
                        </div>}
                        description={<div>
                          <div>{item.description}</div>
                          <div style={{
                            "font-size": "0.8em",
                            "padding-top": "3px"
                          }}>
                            <span style={{marginLeft: '3px', marginTop: '3px'}}>
                            <Icon type="folder" />
                            <span> {item.category}</span>
                            </span>
                          </div>
                        </div>}
                      />
                      {item.content}
                    </List.Item>
                  )}
                />
                </Content>
              </Layout>
            </Col>
            <Col span={16} style={{height: "100%", backgroundColor: "white"}}>
              <Layout style={{position: "fixed", width: "calc(100% - 470px)"}}>
                <Content style={{width: '100%', backgroundColor: "white"}}>
                  <div className="itemDetailToolbar">
                    <Icon className="tbIcon" type="clock-circle" />
                    <Icon className="tbIcon" type="star" />
                  </div>
                  <Breadcrumb style={{ margin: '16px 16px', textAlign: 'left', paddingBottom: '10px'}}>
                    <Breadcrumb.Item>Items</Breadcrumb.Item>
                    <Breadcrumb.Item contentEditable="true" className="editable">Editable Title</Breadcrumb.Item>
                  </Breadcrumb>
                  <div className="editable" contentEditable="true" style={{textAlign: "left", margin: "10px 18px", paddingTop: '20px'}}>
                    Click here to edit me!
                  </div>
                </Content>
              </Layout>
            </Col>
          </Row>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;