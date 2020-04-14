import React from 'react';
import { Layout, Row, Spin, Skeleton } from 'antd';
import ListCol from './ListCol/ListCol.js';
import ItemCol from './ItemCol/ItemCol.js';
import styled from 'styled-components';
import {
  fetchAllItems,
  selectItem,
  fetchStarredItems,
  deselectItem,
  fetchCategoryItems,
  fetchEditItem,
  selectFirstItem,
  fetchDeleteItem
} from '../../actions.js';
import { connect } from 'react-redux';

const StyledLayout = styled(Layout)`
  background-color: white;
`

class ItemsView extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchAllItems());
  }

  boundedSave = (itemId, reqBody) => {
    this.props.dispatch(fetchEditItem(itemId, reqBody));
  }

  boundedDelete = itemId => {
    this.props.dispatch(fetchDeleteItem(itemId));
  }

  onItemChange = (itemId, item) => {
    this.props.dispatch(selectItem(itemId));
  }

  componentDidUpdate(prevProps) {
    // route change if new route
    if (this.props.location !== prevProps.location) {
      const pathName = this.props.location.pathname;
      if (pathName.startsWith('/cat/')) {
        this.props.dispatch(deselectItem());
        this.props.dispatch(fetchCategoryItems(pathName.split("/")[2]));
        //this.props.dispatch(selectFirstItem());
        return;
      } else {
        switch(this.props.location.pathname) {
          case "/items":
            this.props.dispatch(deselectItem());
            this.props.dispatch(fetchAllItems());
            //this.props.dispatch(selectFirstItem());
            return;
          case "/starred":
            this.props.dispatch(deselectItem());
            this.props.dispatch(fetchStarredItems());
            //this.props.dispatch(selectFirstItem());
            return;
          default:
            console.log("Items");
            return;
        }
      }
    }
  }

  render() {
    const { itemsByFilter, selectedItem, filter } = this.props;
    const { byId, allIds, isFetchingItems } = itemsByFilter;
    const { isSelected, selectedId } = selectedItem;
    const { filterType, categoryId } = filter;

    // if fetching user (probably move this back)
    if (isFetchingItems) {
      return <div><Skeleton /></div>
    }

    return (
        <StyledLayout>
          <Row>
            <ListCol
              itemsByFilter={itemsByFilter}
              categories={this.props.categories}
              filter={filterType}
              location={this.props.location}
              selectedItem={selectedItem}
              currItemCallback={this.onItemChange}
              lightmode={this.props.lightmode}
            />
            <ItemCol
              itemsByFilter={itemsByFilter}
              selectedItem={selectedItem}
              categories={this.props.categories}
              location={this.props.location}
              filter={filterType}
              saveContentCb={this.boundedSave}
              deleteItemCb={this.boundedDelete}
              lightmode={this.props.lightmode}
            />
          </Row>
        </StyledLayout>
    );
  }
}

function mapStateToProps(state) {
  const { itemsByFilter, selectedItem, filter } = state;
  const { itemsById, allItemIds, isFetchingItems } = itemsByFilter || { itemsById: {}, allItemIds: [], isFetchingItems: true }
  const { isSelected, selectedId } = selectedItem || { isSelected: false, selectedId: '' }
  const { filterType, categoryId } = filter || { filterType: 'all', categoryId: null }

  return {
    itemsByFilter: {
      itemsById,
      allItemIds,
      isFetchingItems
    },
    selectedItem: {
      isSelected,
      selectedId
    },
    filter: {
      filterType,
      categoryId
    }
  }
}

export default connect(mapStateToProps)(ItemsView);