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
    settingsVisible: false,
    cats: []
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

  componentDidMount() {
    console.log("Fetch categories here");
    getUserCategories().then((res) => {
      console.log(res);
      this.setState({
        cats: res
      });
    });
  }

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
    
    const userCats = this.state.cats.map((cat) => {
      return (<Menu.Item key={cat._id}>{cat.name}</Menu.Item>);
    });


    
    return (
        <Sider style={{"backgroundColor": "white"}} trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <Avatar className="userAvatar" size={48} onClick={this.userClickedAvatar}>UN</Avatar>
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
          <Menu ref={this.menuRef} theme="light" defaultSelectedKeys={['1']} mode="inline" style={{"textAlign": "left"}}>
            <Menu.Item key="1" className="menuItem">
              <Link to="/">
                <Icon type="home" />
                <span>Home</span>
              </Link>
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