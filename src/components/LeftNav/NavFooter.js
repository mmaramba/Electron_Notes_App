import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';

const NavFooterContainer = styled.div`
  color: black;
  position: absolute;
  bottom: 0;
  background-color: white;
  width: 100%;
  height: 30px;
  overflow: hidden;
`

const PaddedFooterIcon = styled(Icon)`
  ${({ collapsed }) => collapsed === "true" ?
		`padding-left: 5px;` :
		`padding-left: 150px;`
	}
`

class NavFooter extends React.Component {
	constructor(props) {
		super(props)
	}

	state = {
		collapseIconVisible: false
	}

	render() {
		return (
			<NavFooterContainer
				onMouseEnter={() => this.setState({ collapseIconVisible: true })}
				onMouseLeave={() => this.setState({ collapseIconVisible: false })}>
				{!this.props.collapsed || this.state.collapseIconVisible ?
					<PaddedFooterIcon
						collapsed={this.props.collapsed}
						className="trigger"
						type={this.props.collapsed === "true" ? 'right' : 'left'}
						onClick={() => this.props.handleToggle()}
					/> :
					""
				}
			</NavFooterContainer>
		)
	}
}

export default NavFooter;