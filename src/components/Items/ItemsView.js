import React from 'react';
import { Layout, Row, Spin, Skeleton } from 'antd';
import ListCol from './ListCol/ListCol.js';
import ItemCol from './ItemCol/ItemCol.js';
import styled from 'styled-components';
import {
  fetchAllItems,
  selectItem
} from '../../actions.js';
import { connect } from 'react-redux';

const StyledLayout = styled(Layout)`
  background-color: white;
`

class ItemsView extends React.Component {
  constructor(props){
    super(props);
  }

  state = {
    currentItem: null,
    currentItemObj: null,
    items: this.props.items
  }

  componentDidMount() {
    this.props.dispatch(fetchAllItems());
  }

  switchToCreatedItem = () => {
    console.log("in child component, set current here");
    /*
    this.setState({
      currentItem: this.state.items[this.state.items.length-1]._id.$oid,
      currentItemObj: this.state.items[this.state.items.length-1]
    });
    */
  }

  getCurrentItem = (items) => {
    if (this.state.currentItem) {
      return this.state.currentItem;
    } else if (!this.state.currentItem && items.length > 0) {
      return items[0]._id.$oid;
    } else {
      return null;
    }
  }

  getCurrentItemObj = (items) => {
    if (this.state.currentItemObj) {
      return this.state.currentItemObj;
    } else if (!this.state.currentItemObj && items.length > 0) {
      return items[0];
    } else {
      return null;
    }
  }

  onItemChange = (itemId, item) => {
    this.setState({
      currentItem: itemId,
      currentItemObj: item
    });
    this.props.dispatch(selectItem(itemId));
  }

  onItemEdit = (item) => {
    console.log(item);
    console.log("change item object here");

    var newItems = this.state.items.map(el => {
      if (el._id.$oid === this.state.currentItemObj._id.$oid) {
        return Object.assign({}, el, item);
      }
      return el;
    });

    this.setState({
      currentItemObj: item,
      items: newItems
    });

    console.log("items changed");
    console.log(this.state.items);
  }

  // update when item is created (or deleted, take care)
  componentDidUpdate(prevProps) {
    if (this.props.items.length !== prevProps.items.length) {
      this.setState({
        items: this.props.items,
        currentItem: this.props.items[this.props.items.length-1]._id.$oid,
        currentItemObj: this.props.items[this.props.items.length-1]
      });
    }
    // route change
    if (this.props.location !== prevProps.location) {
      console.log("ROUTE CHANGE");
    }
  }

  render() {
    const { itemsByFilter, selectedItem } = this.props;
    const { byId, allIds, isFetchingItems } = itemsByFilter;
    const { isSelected, selectedId } = selectedItem;

    // if fetching user (probably move this back)
    if (isFetchingItems) {
      return <div><Skeleton /></div>
    }

    var items;
    switch(this.props.filter) {
      case "all":
        items = this.state.items;
        break;
      case "starred":
        items = this.state.items;
        break;
      case "category":
        items = this.state.items.filter(e => e.categoryId === this.props.location.pathname.split("/")[2]);
        break;
    }

    var currItem = this.getCurrentItem(items);
    var currItemObj = this.getCurrentItemObj(items);

    return (
        <StyledLayout>
          <Row>
            <ListCol
              items={items}
              itemsByFilter={itemsByFilter}
              categories={this.props.categories}
              filter={this.props.filter}
              location={this.props.location}
              selectedItemId={selectedId}
              currItemCallback={this.onItemChange}
            />
            <ItemCol
              items={items}
              itemsByFilter={itemsByFilter}
              selectedItem={selectedItem}
              categories={this.props.categories}
              location={this.props.location}
              filter={this.props.filter}
              currItem={currItem}
              currItemObj={currItemObj}
              editCallback={this.onItemEdit}
              key={currItem}
            />
          </Row>
        </StyledLayout>
    );
  }
}

function mapStateToProps(state) {
  const { itemsByFilter, selectedItem } = state;
  const { itemsById, allItemIds, isFetchingItems } = itemsByFilter || { itemsById: {}, allItemIds: [], isFetchingItems: true }
  const { isSelected, selectedId } = selectedItem || { isSelected: false, selectedId: '' }

  return {
    itemsByFilter: {
      itemsById,
      allItemIds,
      isFetchingItems
    },
    selectedItem: {
      isSelected,
      selectedId
    }
  }
}

export default connect(mapStateToProps)(ItemsView);