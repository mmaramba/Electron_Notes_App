import React from 'react';
import {
	Icon,
	Avatar,
	Menu,
	Dropdown,
	Modal
} from 'antd';
import styled from 'styled-components';

const NavHeaderContainer = styled.div`
  height: 150px;
  padding-top: 30px;
  background: rgba(255, 255, 255, 0.2);
`

const PaddedHeaderIcon = styled(Icon)`
  ${({ collapsed }) => collapsed ?
		`
      display: none !important;
      padding-left: 0px;
    `
		:
		`
      padding-left: 10px;
      display: initial;
    `
	}
`

const NameContainer = styled.div`
  padding-top: 10px;
  color: black;
  userSelect: none;
`

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
`

class NavHeader extends React.Component {
	constructor(props) {
		super(props)
	}

	state = {
		settingsVisible: false
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

		const userInitials = this.props.first && this.props.last ?
			`${this.props.first[0].toUpperCase()}${this.props.last[0].toUpperCase()}` :
			this.props.email[0].toUpperCase()

		return (
			<NavHeaderContainer>
				<StyledAvatar size={48} onClick={() => console.log("Avatar clicked")}>{userInitials}</StyledAvatar>
				<NameContainer>
					{this.props.name}
					<Dropdown overlay={userMenu} trigger={['click']}>
						<a className="ant-dropdown-link" href="#">
							<PaddedHeaderIcon
								type="down"
								collapsed={this.props.collapsed}
							/>
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
				</NameContainer>
			</NavHeaderContainer>
		)
	}
}

export default NavHeader;