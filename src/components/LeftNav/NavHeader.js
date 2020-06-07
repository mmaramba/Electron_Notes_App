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
      color: ${props => props.lightmode === "true" ? "rgba(0, 0, 0, 0.25)" : "white" };
    `
  }
  :hover {
    color: ${props => props.lightmode === "true" ? "#1890ff" : "#be7633"};
  }
`

const NameContainer = styled.div`
  padding-top: 10px;
  color: ${props => props.lightmode === "true" ? "black" : "white" };
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
    prefsVisible: false,
    firstNameInputVal: '',
    lastNameInputVal: ''
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

  handleInputValChangeFN = (e) => {
    this.setState({
      firstNameInputVal: e.target.value
    })
  }

  handleInputValChangeLN = (e) => {
    this.setState({
      lastNameInputVal: e.target.value
    })
  }

  handleSettingsOk = e => {
    console.log(e);
    console.log("MAKE API CALL HERE");
    console.log(this.state);
    //this.props.switchCb();
    this.props.editNameCb({
      firstName: this.state.firstNameInputVal,
      lastName: this.state.lastNameInputVal
    });

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

  createNameText = () => {
    if (this.props.collapsed === "true") {
      return "";
    } else if (this.props.collapsed === "false" && this.props.first && this.props.last) {
      return `${this.props.first} ${this.props.last}`;
    } else {
      return this.props.email;
    }
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
        <NameContainer lightmode={this.props.lightmode}>
          {this.createNameText()}
          <Dropdown overlay={userMenu} trigger={['click']}>
              <PaddedHeaderIcon
                lightmode={this.props.lightmode}
                type="down"
                collapsed={this.props.collapsed}
              />
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
            <StyledInput placeholder={this.props.first} value={this.state.firstNameInputVal} onChange={this.handleInputValChangeFN} />
            <div>Last Name</div>
            <StyledInput placeholder={this.props.last} value={this.state.lastNameInputVal} onChange={this.handleInputValChangeLN} />
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