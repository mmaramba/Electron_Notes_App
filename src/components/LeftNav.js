import React from 'react';
import './LeftNav.css';
import {
    Layout,
    Menu,
    Dropdown,
    Icon,
    Modal,
    Avatar
} from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class LeftNav extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    collapsed: false,
    name: "User's Name",
    settingsVisible: false
  };

  getPaddingFooter = () => {
    var padding = this.state.collapsed? "5px" : "150px";
    return padding;
  }

  toggle = () => {
    var display = this.state.name === "User's Name" ? "" : "User's Name";
    this.setState({
      collapsed: !this.state.collapsed,
      name: display
    });
  };

  userClickedAvatar = () => {
    console.log("Username clicked.");
  }

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
        <Sider style={{"background-color": "white"}} trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <Avatar className="userAvatar" size={64} onClick={this.userClickedAvatar}>UN</Avatar>
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
    )
  }
}

export default LeftNav;