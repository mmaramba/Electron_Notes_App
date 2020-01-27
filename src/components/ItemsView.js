import React from 'react';
import { Layout, Row } from 'antd';
import ListCol from './ListCol.js';
import ItemCol from './ItemCol.js';


class ItemsView extends React.Component {
  constructor(props){
    super(props);
  }

  render() {

    return (
        <Layout style={{backgroundColor: "white"}}>
          <Row>
            <ListCol {...this.props} />
            <ItemCol />
          </Row>
        </Layout>
    );
  }
}

export default ItemsView;