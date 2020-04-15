import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import NavFooter from './NavFooter.js';
import NavHeader from './NavHeader.js';
import NavMenu from './NavMenu.js';

const { Sider } = Layout;

const StyledSider = styled(Sider)`
  background-color: ${props => props.lightmode === "true" ? "white" : "black"};
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
      <StyledSider trigger={null} collapsible collapsed={this.state.collapsed} lightmode={this.props.lightmode}>
        <NavHeader
          name={this.state.name}
          collapsed={this.state.collapsed.toString()}
          first={this.props.first}
          last={this.props.last}
          email={this.props.email}
          switchCb={this.props.switchCb}
          lightmode={this.props.lightmode}
          editNameCb={this.props.editNameCb}
        />
        <NavMenu
          createItemHandler={this.props.createItemHandler} 
          categories={this.props.categories}
          lightmode={this.props.lightmode}
        />
        <NavFooter
          collapsed={this.state.collapsed.toString()}
          handleToggle={this.toggle}
          lightmode={this.props.lightmode}
        />
      </StyledSider>
    )
  }
}

export default LeftNav;