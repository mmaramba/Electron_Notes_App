import React from 'react';
import { Layout, Row } from 'antd';
import ListCol from './ListCol/ListCol.js';
import ItemCol from './ItemCol/ItemCol.js';
import styled from 'styled-components';

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
    console.log(itemId);
    console.log(item);
    this.setState({
      currentItem: itemId,
      currentItemObj: item
    });
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

  // update when item is created or deleted
  componentDidUpdate(prevProps) {
    if (this.props.items.length !== prevProps.items.length) {
      this.setState({
        items: this.props.items
      });
    }
  }

  render() {
    var items;
    switch(this.props.filter) {
      case "all":
        console.log("HERE");
        items = this.state.items;
        break;
      case "starred":
        items = this.state.items;
        break;
      case "category":
        items = this.state.items.filter(e => e.categoryId === this.props.location.pathname.split("/")[2]);
        console.log(this.props.location.pathname);
        console.log(items);
        break;
    }

    var currItem = this.getCurrentItem(items);
    var currItemObj = this.getCurrentItemObj(items);

    return (
        <StyledLayout>
          <Row>
            <ListCol
              items={items}
              cats={this.props.cats}
              filter={this.props.filter}
              location={this.props.location}
              currItem={currItem}
              currItemObj={currItemObj}
              currItemCallback={this.onItemChange}
            />
            <ItemCol
              items={items}
              cats={this.props.cats}
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

export default ItemsView;