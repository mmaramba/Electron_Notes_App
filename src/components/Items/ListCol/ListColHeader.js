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
	border-bottom: 1px solid #e8e8e8;
	background-color: white;
`

const HeaderTitle = styled.h3`
	text-align: left;
	padding-top: 10px;
	margin-left: 10px;
`

const NumItemsTextContainer = styled.div`
	text-align: left;
	padding-top: 30px;
	margin-left: 10px;
`

class ListColHeader extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<HeaderContainer>
				<HeaderTitle>{this.props.headerText}</HeaderTitle>
				<NumItemsTextContainer>
					{this.props.numItems} Items
        </NumItemsTextContainer>
			</HeaderContainer>
		)
	}
}

export default ListColHeader;