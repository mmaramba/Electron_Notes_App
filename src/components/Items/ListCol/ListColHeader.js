import React from 'react';
import {
	Layout,
	Menu,
	Icon,
	Col,
	List,
	Input,
	Affix,
	Dropdown,
	Tooltip,
	Modal
} from 'antd';
import styled from 'styled-components';
import { isEqual } from 'date-fns';


const HeaderContainer = styled.div`
	height: 100px;
	border-bottom: ${props => props.lightmode === "true" ? "1px solid #e8e8e8" : "1px solid #333333"};
	background-color: ${props => props.lightmode === "true" ? "white" : "#262626"};
`

const HeaderTitle = styled.h3`
	text-align: left;
	padding-top: 10px;
	margin-left: 10px;
	color: ${props => props.lightmode === "true" ? "rgba(0, 0, 0, 0.65)" : "white" };
`

const NumItemsTextContainer = styled.div`
	text-align: left;
	padding-top: 30px;
	margin-left: 10px;
	color: ${props => props.lightmode === "true" ? "rgba(0, 0, 0, 0.65)" : "white" };
`

class ListColHeader extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<HeaderContainer lightmode={this.props.lightmode}>
				<HeaderTitle lightmode={this.props.lightmode}>{this.props.headerText}</HeaderTitle>
				<NumItemsTextContainer lightmode={this.props.lightmode}>
					{this.props.numItems} Items
        		</NumItemsTextContainer>
			</HeaderContainer>
		)
	}
}

export default ListColHeader;