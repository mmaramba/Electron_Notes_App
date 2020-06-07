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
	color: ${props => props.lightmode === "true" ? "rgba(0, 0, 0, 0.65)" : "white"};
`

const NumItemsTextContainer = styled.div`
	text-align: left;
	padding-top: 12px;
	margin-left: 10px;
	color: ${props => props.lightmode === "true" ? "rgba(0, 0, 0, 0.65)" : "white"};
`

const StyledSearchInput = styled(Input)`
	width: 80%;
	visibility: ${props => props.headertext === "Search Items" ? "default" : "hidden"};
`

const StyledHeaderIcon = styled(Icon)`
	marginLeft: 10px;
	cursor: pointer;
`

class ListColHeader extends React.Component {
	constructor(props) {
		super(props)
	}

	state = {
		searchContent: "",
		editCatVisible: false,
		editCatModalVisible: false,
		editCatInputVal: ''
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

	toggleEditCatVisible = (e) => {
		this.setState({
			editCatVisible: !this.state.editCatVisible
		});
	}

	openEditCat = () => {
		this.setState({
			editCatModalVisible: true
		});
	}

	handleOk = e => {
		console.log(this.props.categories);
		console.log("Change ID x to val y");
		console.log(this.props.filterObj.categoryId);
		console.log(this.state.editCatInputVal);

		const reqBody = {
			"name": this.state.editCatInputVal
		}

		this.props.editCatNameCb(this.props.filterObj.categoryId, reqBody);

		// Do redux stuff here
		this.setState({
			editCatModalVisible: false,
		});
	};

	handleCancel = e => {
		this.setState({
			editCatModalVisible: false,
			editCatInputVal: ''
		});
	};

	handleEditCatInputChange = (e) => {
		this.setState({
			editCatInputVal: e.target.value
		})
	}

	handleDeleteCat = () => {
		this.props.history.push('/items');
		this.props.deleteCatCb(this.props.filterObj.categoryId);
	}

	createIconButtons = () => {
		if (this.state.editCatVisible && this.props.filterObj.categoryId) {
			return (
				<span>
					<StyledHeaderIcon
						type="edit"
						onClick={this.openEditCat}
					/>
					<StyledHeaderIcon
						type="delete"
						onClick={this.handleDeleteCat}
					/>
				</span>
			);
		} else {
			return '';
		}
	}

	render() {
		return (
			<HeaderContainer lightmode={this.props.lightmode}>
				<HeaderTitle
					lightmode={this.props.lightmode}
					onMouseEnter={this.toggleEditCatVisible}
					onMouseLeave={this.toggleEditCatVisible}
				>
					{`${this.props.headerText} `}
					{this.createIconButtons()}
				</HeaderTitle>
				<Modal
					title="Edit Category Name"
					visible={this.state.editCatModalVisible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<Input onChange={this.handleEditCatInputChange} />
				</Modal>
				<StyledSearchInput
					placeholder="Search items by title"
					size="small"
					headertext={this.props.headerText}
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