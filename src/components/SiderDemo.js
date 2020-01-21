import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Avatar, Row, Col, List, Dropdown, Button, Tooltip, Modal, Input } from 'antd';
import './SiderDemo.css'
import { callbackify } from 'util';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

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
const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        Comic Sans
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        Arial
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        Wingdings
      </a>
    </Menu.Item>
  </Menu>
);

const fontMenu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        12
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        14
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        16
      </a>
    </Menu.Item>
  </Menu>
);

const sortMenu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        Sort by time
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        Sort by length
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        Sort by something else?
      </a>
    </Menu.Item>
  </Menu>
);

class SiderDemo extends React.Component {
  constructor(props){
    super(props);
  }


  state = {
    collapsed: false,
    name: "User's Name",
    currentItem: data[0].title,
    visible: false,
    settingsVisible: false
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

  onUserItemClicked = (title, e) => {
    this.setState({
      currentItem: title
    });
  }

  showModal = () => {
    console.log("opening modal");
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleEnterKeyOnSearch = (value, event) => {
    console.log(value);
    this.setState({
      visible: false
    });
    console.log(this.state);
  };

  showSettingsModal = () => {
    this.setState({
      settingsVisible: true
    });
  };

  handleSettingsOk = e => {
    console.log(e);
    this.setState({
      settingsVisible: false,
    });
  };

  handleSettingsCancel = e => {
    console.log(e);
    this.setState({
      settingsVisible: false,
    });
  };

  render() {
    const userMenu = (
      <Menu>
        <Menu.Item onClick={this.showSettingsModal}>
          <a target="_blank" rel="noopener noreferrer">
            Settings
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer">
            About this application
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout style={{ height: '100vh' }}>
        <Sider style={{"background-color": "white"}} trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <Avatar className="userAvatar" size={64} onClick={this.userClicked}>UN</Avatar>
            <div 
              style={{"padding-top": "10px", "color": "black", "user-select": "none"}}
            >
              {this.state.name}
              <Dropdown overlay={userMenu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  <Icon type="down" 
                    style={{
                      display: this.state.collapsed? "none": "initial",
                      paddingLeft: this.state.collapsed? "0px": "10px"
                    }} />
                </a>
              </Dropdown>
              <Modal
                title="Settings"
                visible={this.state.settingsVisible}
                onOk={this.handleSettingsOk}
                onCancel={this.handleSettingsCancel}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
            </div>
          </div>
          <Menu ref={this.menuRef} theme="light" defaultSelectedKeys={['9']} mode="inline" style={{"text-align": "left"}}>
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
        <Layout style={{backgroundColor: "white"}}>
          <Row>
            <Col span={8} ref={this.midColRef} style={{userSelect: "none"}}>
              <Layout style={{height: "100vh"}}>
                <Content style={{ backgroundColor: "#fafafa"}}>
                <div className="midColMenu">
                  <h3 style={{textAlign: "left", marginTop: "10px", marginLeft: "10px"}}>All Items</h3>
                  <div style={{textAlign: "left", position: "absolute", height: "100%", width: "100%", top: "75px", marginLeft: "10px"}}>
                    10 items
                  </div>
                  <div style={{textAlign: "right", position: "absolute", height: "100%", width: "100%", top: "75px", right: "16px"}}>
                    <Dropdown overlay={sortMenu} placement="bottomCenter">
                      <a className="ant-dropdown-link" href="#" style={{color: "rgba(0, 0, 0, 0.65)"}}>
                        <Icon type="caret-down" />
                      </a>
                    </Dropdown>
                    <Tooltip placement="topLeft" title="Search by item name">
                      <Icon type="search" style={{color: "rgba(0, 0, 0, 0.65)", paddingLeft: "5px"}} size="small" onClick={this.showModal} />
                    </Tooltip>
                    <Modal
                      title="Search by item name"
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      footer={null}
                      width="250px"
                    >
                      <Search
                        placeholder="Enter name"
                        onSearch={this.handleEnterKeyOnSearch}
                        style={{ width: 200 }}
                      />
                    </Modal>
                  </div>
                </div>
                <div className="listContainer">
                  <List
                    itemLayout="horizontal"
                    dataSource={data}
                    size="large"
                    renderItem={item => (
                      <List.Item
                        key={item.title}
                        style={{
                          backgroundColor: (item.title === this.state.currentItem? "#ededed" : "#fafafa"),
                          textAlign: "left", 
                          paddingLeft: "10px", 
                          paddingBottom: "0px"
                        }}
                        onClick={(e) => this.onUserItemClicked(item.title, e)}
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
                              9 min ago
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
                </div>
                </Content>
              </Layout>
            </Col>
            <Col span={16} style={{height: "100%", backgroundColor: "white"}}>
              <Layout style={{position: "fixed", width: "calc(100% - 500px)"}}>
                <Content style={{width: '100%', height: "100%", backgroundColor: "white"}}>
                  <div className="topDetailSection">
                    <div className="itemDetailToolbar">
                      <Tooltip placement="bottomRight" title="Create timer for item">
                        <Button type="link" style={{color: "rgba(0, 0, 0, 0.65)"}} icon="clock-circle" size="small" ghost />
                      </Tooltip>
                      <Tooltip placement="bottomRight" title="Star item">
                        <Button type="link" style={{color: "rgba(0, 0, 0, 0.65)"}} icon="star" size="small" ghost />
                      </Tooltip>
                      <Tooltip placement="bottomRight" title="Share item">
                      <Button type="link" style={{color: "rgba(0, 0, 0, 0.65)"}} icon="share-alt" size="small" ghost />
                      </Tooltip>
                      <Tooltip placement="bottomRight" title="More options">
                      <Button type="link" style={{color: "rgba(0, 0, 0, 0.65)"}} icon="ellipsis" size="small" ghost />
                      </Tooltip>
                    </div>
                    <Breadcrumb style={{ margin: '16px 16px', textAlign: 'left', paddingBottom: '10px'}}>
                      <Breadcrumb.Item>Items</Breadcrumb.Item>
                      <Breadcrumb.Item contentEditable="true" suppressContentEditableWarning={true} className="editable">Editable Title</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className="typingToolbar">
                    <Dropdown overlay={menu} trigger={['click']}>
                      <a className="ant-dropdown-link" href="#">
                        Comic Sans <Icon style={{marginLeft: "40px", marginRight: "10px"}} type="down" />
                      </a>
                    </Dropdown>
                    <Dropdown overlay={fontMenu} trigger={['click']}>
                      <a className="ant-dropdown-link" href="#">
                        12 <Icon style={{marginLeft: "10px", marginRight: "10px"}} type="down" />
                      </a>
                    </Dropdown>
                    <span style={{marginLeft: "20px"}}></span>
                    <Icon className="tbIcon" type="font-colors" />
                    <Icon className="tbIcon" type="bg-colors" />
                    <Icon className="tbIcon" type="highlight" />
                    <span style={{marginLeft: "20px"}}></span>
                    <Icon className="tbIcon" type="bold" />
                    <Icon className="tbIcon" type="italic" />
                    <Icon className="tbIcon" type="underline" />
                    <span style={{marginLeft: "20px"}}></span>
                    <Icon className="tbIcon" type="align-left" />
                    <Icon className="tbIcon" type="align-center" />
                    <Icon className="tbIcon" type="align-right" />
                  </div>
                  <div 
                    className="editable" 
                    contentEditable="true" 
                    suppressContentEditableWarning={true} 
                    data-text="Click here to edit me!" 
                    style={{
                      textAlign: "left", 
                      margin: "10px 18px", 
                      paddingTop: '20px',
                      minHeight: "100vh"
                    }} 
                  />
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