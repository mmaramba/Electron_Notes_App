import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import NavFooter from './NavFooter.js';
import NavHeader from './NavHeader.js';
import NavMenu from './NavMenu.js';

const { Sider } = Layout;

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
          collapsed={this.state.collapsed.toString()}
          first={this.props.first}
          last={this.props.last}
          email={this.props.email}
        />
        <NavMenu createItemHandler={this.props.createItemHandler} categories={this.props.categories} />
        <NavFooter
          collapsed={this.state.collapsed.toString()}
          handleToggle={this.toggle}
        />
      </StyledSider>
    )
  }
}

export default LeftNav;