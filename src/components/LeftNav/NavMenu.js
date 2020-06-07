import React from 'react';
import {
  Icon,
  Menu,
  Tooltip,
  Modal,
  Input
} from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { SubMenu } = Menu;

const StyledMenuContainer = styled(Menu)`
  text-align: left;
  filter: ${props => props.lightmode === "true" ? "none" : "invert(.8)"};
`

const StyledSpan = styled.span`
  color: rgba(0, 0, 0, 0.65);
`

const SpecialMenuOption = styled(Menu.Item)`
  cursor: pointer;
  color: rgba(0, 0, 0, 0.65);
	font-weight: bold;
`

const ColoredIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.65);
`

class NavMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    settingsVisible: false,
    newCatModalVisible: false,
    newCatInputVal: ''
  }

  openNewCat = () => {
    console.log("menu option clicked for new cat");
		this.setState({
			newCatModalVisible: true
		});
	}

	handleOk = () => {
    console.log(this.state.newCatInputVal);
    
		const reqBody = {
			"name": this.state.newCatInputVal
		}

    this.props.newCatCb(reqBody);
    
		
		this.setState({
      newCatModalVisible: false,
      newCatInputVal: ''
		});
	};

	handleCancel = () => {
		this.setState({
			newCatModalVisible: false,
			newCatInputVal: ''
		});
	};

	handleNewCatInputChange = (e) => {
		this.setState({
			newCatInputVal: e.target.value
		})
	}

  render() {
    const userCats = this.props.categories.allIds.map(id => {
      return (
        <Menu.Item key={id}>
          <Link to={"/cat/" + id}>{this.props.categories.byId[id].name}</Link>
        </Menu.Item>
      );
    });

    return (
      <StyledMenuContainer theme="light" defaultSelectedKeys={['9']} mode="inline" lightmode={this.props.lightmode}>
        <SpecialMenuOption key="1" disabled={true}>
          <div onClick={() => this.props.createItemHandler()}>
            <ColoredIcon type="plus-circle" theme="filled" />
            <StyledSpan>Create Item</StyledSpan>
          </div>
        </SpecialMenuOption>
        <SpecialMenuOption key="10">
          <Link to="/search">
            <div onClick={() => console.log("ASDF")}>
              <ColoredIcon type="search" />
              <StyledSpan>Search All Items</StyledSpan>
            </div>
          </Link>
        </SpecialMenuOption>
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
          <SpecialMenuOption key="usercatsbutton" disabled={true}>
            <div onClick={this.openNewCat}>
              Add a new category...
            </div>
          </SpecialMenuOption>
        </SubMenu>
        <Menu.Item key="2" className="menuItem">
          <Link to="/starred">
            <Icon type="star" />
            <span>Starred</span>
          </Link>
        </Menu.Item>
        <Modal
            title="New Category Name"
            visible={this.state.newCatModalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Input onChange={this.handleNewCatInputChange} />
          </Modal>
      </StyledMenuContainer>
    )
  }
}

export default NavMenu;