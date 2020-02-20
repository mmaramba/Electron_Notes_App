import React from 'react';
import { Layout, Row } from 'antd';
import ListCol from './ListCol.js';
import ItemCol from './ItemCol.js';


class ItemsView extends React.Component {
  constructor(props){
    super(props);
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

    return (
        <Layout style={{backgroundColor: "white"}}>
          <Row>
            <ListCol items={items} cats={this.props.cats} filter={this.props.filter} location={this.props.location}/>
            <ItemCol />
          </Row>
        </Layout>
    );
  }
}

export default ItemsView;