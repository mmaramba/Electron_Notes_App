import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavFooter from './NavFooter.js';
import NavHeader from './NavHeader.js';
import NavMenu from './NavMenu.js';

const { Header, Content, Footer, Sider } = Layout;

const StyledSider = styled(Sider)`
  background-color: white;
`

class LeftNav extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    collapsed: true,
    name: ""
  };

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

  render() {

    return (
      <StyledSider trigger={null} collapsible collapsed={this.state.collapsed}>
        <NavHeader
          name={this.state.name}
          collapsed={this.state.collapsed}
          first={this.props.first}
          last={this.props.last}
          email={this.props.email}
        />
        <NavMenu cats={this.props.cats} />
        <NavFooter
          collapsed={this.state.collapsed}
          handleToggle={this.toggle}
        />
      </StyledSider>
    )
  }
}

export default LeftNav;