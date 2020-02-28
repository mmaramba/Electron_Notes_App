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
    currentItem: null
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

  onItemChange = (itemId) => {
    console.log(itemId);
    this.setState({
      currentItem: itemId
    });
  }

  render() {
    var items;
    switch(this.props.filter) {
      case "all":
        console.log("HERE");
        items = this.props.items;
        break;
      case "starred":
        items = this.props.items;
        break;
      case "category":
        items = this.props.items.filter(e => e.categoryId === this.props.location.pathname.split("/")[2]);
        console.log(this.props.location.pathname);
        console.log(items);
        break;
    }

    var currItem = this.getCurrentItem(items);

    return (
        <StyledLayout>
          <Row>
            <ListCol
              items={items}
              cats={this.props.cats}
              filter={this.props.filter}
              location={this.props.location}
              currItem={currItem}
              currItemCallback={this.onItemChange}
            />
            <ItemCol
              items={items}
              cats={this.props.cats}
              location={this.props.location}
              filter={this.props.filter}
              currItem={currItem}
            />
          </Row>
        </StyledLayout>
    );
  }
}

export default ItemsView;