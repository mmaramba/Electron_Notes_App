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
	padding-top: 12px;
	margin-left: 10px;
	color: ${props => props.lightmode === "true" ? "rgba(0, 0, 0, 0.65)" : "white" };
`

const StyledSearchInput = styled(Input)`
	width: 80%;
	visibility: ${props => props.headerText === "Search Items" ? "default" : "hidden"};
`

class ListColHeader extends React.Component {
	constructor(props) {
		super(props)
	}

	state = {
		searchContent: ""
	}

	handleSearchChange = (e) => {
		this.setState({
			searchContent: e.target.value
		});
	}

	handleSearchEnter = (e) => {
		console.log("Enter pressed");
		console.log(e.target.value);
		this.props.searchCb(e.target.value);
	}

	render() {
		return (
			<HeaderContainer lightmode={this.props.lightmode}>
				<HeaderTitle lightmode={this.props.lightmode}>{this.props.headerText}</HeaderTitle>
				<StyledSearchInput
					placeholder="Search items by title"
					size="small"
					headerText={this.props.headerText}
					onPressEnter={this.handleSearchEnter}
					onChange={this.handleSearchChange}
				/>
				<NumItemsTextContainer lightmode={this.props.lightmode}>
					{this.props.numItems} Items
        		</NumItemsTextContainer>
			</HeaderContainer>
		)
	}
}

export default ListColHeader;