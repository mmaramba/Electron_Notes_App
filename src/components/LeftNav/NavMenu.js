import React from 'react';
import {
	Icon,
	Menu,
	Tooltip
} from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { SubMenu } = Menu;

const StyledMenuContainer = styled(Menu)`
  text-align: left;
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
		settingsVisible: false
	}

	render() {

		const userCats = this.props.cats.map((cat) => {
			return (
				<Menu.Item key={cat._id.$oid}>
					<Link to={"/cat/" + cat._id.$oid}>{cat.name}</Link>
				</Menu.Item>
			);
		});

		return (
			<StyledMenuContainer theme="light" defaultSelectedKeys={['9']} mode="inline">
				<SpecialMenuOption key="1" disabled={true}>
					<div onClick={() => console.log("HISDFS")}>
						<ColoredIcon type="plus-circle" theme="filled" />
						<StyledSpan>Create Item</StyledSpan>
					</div>
				</SpecialMenuOption>
				<SpecialMenuOption key="10" disabled={true}>
					<div onClick={() => console.log("ASDF")}>
						<ColoredIcon type="search" />
						<StyledSpan>Search All Items</StyledSpan>
					</div>
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
				</SubMenu>
				<Menu.Item key="2" className="menuItem">
					<Link to="/starred">
						<Icon type="star" />
						<span>Starred</span>
					</Link>
				</Menu.Item>
			</StyledMenuContainer>
		)
	}
}

export default NavMenu;