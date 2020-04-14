import React from 'react';
import {
  Icon,
  Avatar,
  Menu,
  Dropdown,
  Modal,
  Switch,
  Button,
  Input
} from 'antd';
import styled from 'styled-components';

const NavHeaderContainer = styled.div`
  height: 150px;
  padding-top: 30px;
`

const SettingsHeading = styled.div`
  font-size: 1.1em;
  font-weight: 600;
`

const SettingsDivider = styled.div`
  height: 20px;
`

const StyledInput = styled(Input)`
  width: 200px;
`

const PaddedHeaderIcon = styled(Icon)`
  ${({ collapsed }) => collapsed === "true" ?
    `
      display: none !important;
      padding-left: 0px;
    `
    :
    `
      padding-left: 10px;
			display: initial;
			color: rgba(0, 0, 0, 0.25);
			
			:hover {
				color: #1890ff;
			}
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
    settingsVisible: false,
    prefsVisible: false
  }

  showSettingsModal = () => {
    this.setState({
      settingsVisible: true
    });
  };

  showPrefsModal = () => {
    this.setState({
      prefsVisible: true
    });
  };

  handleSettingsOk = e => {
    console.log(e);
    console.log("MAKE API CALL HERE");
    //this.props.switchCb();

    this.setState({
      settingsVisible: false,
    });
  };

  handleSwitchMode = e => {
    this.props.switchCb();
  }

  handleSettingsCancel = e => {
    console.log(e);
    this.setState({
      settingsVisible: false,
    });
  };

  closePrefs = e => {
    this.setState({
      prefsVisible: false
    })
  }

  render() {

    const userMenu = (
      <Menu>
        <Menu.Item onClick={this.showSettingsModal}>
          <a target="_blank" rel="noopener noreferrer">
            Settings
            </a>
        </Menu.Item>
        <Menu.Item onClick={this.showPrefsModal}>
          <a target="_blank" rel="noopener noreferrer">
            Preferences
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
            closable={false}
            footer={[
              <Button key="Cancel" onClick={this.handleSettingsCancel}>
                Cancel
              </Button>,
              <Button key="Apply" onClick={this.handleSettingsOk} type="primary">
                Apply Changes
              </Button>,
            ]}
          >
            <SettingsHeading>User Information</SettingsHeading>
            <div>First Name</div>
            <StyledInput placeholder={this.props.first} />
            <div>Last Name</div>
            <StyledInput placeholder={this.props.last} />
          </Modal>
          <Modal
            title="Preferences"
            visible={this.state.prefsVisible}
            footer={[
              <Button key="Ok" onClick={this.closePrefs}>
                Ok
              </Button>,
            ]}
          >
            <Switch checkedChildren="Light Mode" unCheckedChildren="Dark Mode" defaultChecked onClick={this.handleSwitchMode} />
          </Modal>
        </NameContainer>
      </NavHeaderContainer>
    )
  }
}

export default NavHeader;