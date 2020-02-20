import React from 'react';
import './LeftNav.css';
import {
    Layout,
    Menu,
    Dropdown,
    Icon,
    Modal,
    Avatar,
    Spin,
    Tooltip
} from 'antd';
import {
    Link
} from 'react-router-dom';
import { getUserCategories } from '../api.js';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class LeftNav extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    collapsed: true,
    name: "",
    settingsVisible: false
  };

  getPaddingFooter = () => {
    var padding = this.state.collapsed? "5px" : "150px";
    return padding;
  }

  toggle = () => {
    var display;
    if (this.props.first && this.props.last) {
      display = this.state.name? "" : `${this.props.first} ${this.props.last}`;
    } else {
      display = this.state.name? "" : this.props.email;
    }
    
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
    
    const userCats = this.props.cats.map((cat) => {
      return (
        <Menu.Item key={cat._id.$oid}>
          <Link to={"/cat/" + cat._id.$oid}>{cat.name}</Link>
        </Menu.Item>
      );
    });

    const userInitials = this.props.first && this.props.last? 
      `${this.props.first[0].toUpperCase()}${this.props.last[0].toUpperCase()}` :
      this.props.email[0].toUpperCase()

    return (
        <Sider style={{"backgroundColor": "white"}} trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <Avatar className="userAvatar" size={48} onClick={this.userClickedAvatar}>{userInitials}</Avatar>
            <div 
              style={{"paddingTop": "10px", "color": "black", "userSelect": "none"}}
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
          <Menu ref={this.menuRef} theme="light" defaultSelectedKeys={['9']} mode="inline" style={{"textAlign": "left"}}>
            <Menu.Item key="1" className="createItemButton" disabled={true}>
              <div onClick={() => console.log("HISDFS")}>
                <Icon type="plus-circle" theme="filled" style={{color: "rgba(0, 0, 0, 0.65)"}} />
                <span style={{color: "rgba(0, 0, 0, 0.65)"}}>Create Item</span>
              </div>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/items">
                <Icon type="file-text" />
                <span>Items</span>
              </Link>
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
              {userCats}
            </SubMenu>
            <Menu.Item key="2" className="menuItem">
              <Link to="/starred">
                <Icon type="star" />
                <span>Starred</span>
              </Link>
            </Menu.Item>
          </Menu>
          <div className="mainFooter">
            <Icon 
              className="trigger"
              type={this.state.collapsed ? 'right' : 'left'}
              onClick={this.toggle}
              style={{
                "paddingLeft": this.getPaddingFooter()
              }}
            />
          </div>
        </Sider>
    )
  }
}

export default LeftNav;