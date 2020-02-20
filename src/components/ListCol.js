import React from 'react';
import './ListCol.css';
import {
    Layout,
    Menu,
    Dropdown,
    Icon,
    Modal,
    Col,
    Tooltip,
    List,
    Input
} from 'antd';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import addHours from 'date-fns/addHours';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

const sortMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer">
          Sort by time
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer">
          Sort by length
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer">
          Sort by something else?
        </a>
      </Menu.Item>
    </Menu>
  );


class ListCol extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    currentItem: "",
    searchModalVisible: false
  };

  findItemCategory = (catId) => {
    if (!catId) {
      return "Uncategorized";
    }
    console.log(this.props.cats);
    console.log(catId);
    let res = this.props.cats.find(e => e._id.$oid === catId);
    console.log(res);
    return res.name;
  }

  onUserItemClicked = (title, e) => {
    console.log(title);
    this.setState({
      currentItem: title
    });
  }

  showSearchModal = () => {
    console.log("opening modal");
    this.setState({
      searchModalVisible: true
    });
  };

  handleSearchOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleSearchCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleEnterKeyOnSearch = (value, event) => {
    console.log(value);
    this.setState({
      searchModalVisible: false
    });
    console.log(this.state);
  };

  render() {
    let headerText = "Loading...";
    switch(this.props.filter) {
        case "all":
          headerText = "All Items";
          break;
        case "starred":
          headerText = "Starred Items";
          break;
        case "category": 
          headerText = this.findItemCategory(this.props.location.pathname.split("/")[2]);
          break;
    }
    
    return (
        <Col span={8} style={{userSelect: "none", overflowY: "scroll", overflowX: "hidden", backgroundColor: "#fafafa"}}>
            <Layout style={{height: "100vh"}}>
                <Content style={{backgroundColor: "#fafafa"}}>
                    <div className="midColMenu">
                        <h3 style={{textAlign: "left", marginTop: "10px", marginLeft: "10px"}}>{headerText}</h3>
                        <div style={{textAlign: "left", position: "absolute", height: "100%", width: "100%", top: "75px", marginLeft: "10px"}}>
                        {this.props.items.length} Items
                        </div>
                        <div style={{textAlign: "right", position: "absolute", height: "100%", width: "100%", top: "75px", right: "16px"}}>
                        <Dropdown overlay={sortMenu} placement="bottomCenter">
                            <a className="ant-dropdown-link" href="#" style={{color: "rgba(0, 0, 0, 0.65)"}}>
                            <Icon type="caret-down" />
                            </a>
                        </Dropdown>
                        <Tooltip placement="topLeft" title="Search by item name">
                            <Icon type="search" style={{color: "rgba(0, 0, 0, 0.65)", paddingLeft: "5px"}} size="small" onClick={this.showSearchModal} />
                        </Tooltip>
                        <Modal
                            title="Search by item name"
                            visible={this.state.searchModalVisible}
                            onOk={this.handleSearchOk}
                            onCancel={this.handleSearchCancel}
                            footer={null}
                            width="250px"
                        >
                            <Search
                            placeholder="Enter name"
                            onSearch={this.handleEnterKeyOnSearch}
                            style={{ width: 200 }}
                            />
                        </Modal>
                        </div>
                    </div>
                    <div className="listContainer">
                        <List
                        itemLayout="horizontal"
                        dataSource={this.props.items}
                        size="large"
                        renderItem={item => (
                            <List.Item
                            key={item.title}
                            style={{
                                backgroundColor: (item.title === this.state.currentItem? "#ededed" : "#fafafa"),
                                textAlign: "left", 
                                paddingLeft: "10px", 
                                paddingBottom: "0px"
                            }}
                            onClick={(e) => this.onUserItemClicked(item.title, e)}
                            >
                            <List.Item.Meta
                                title={
                                  <div style={{"position": "relative"}}>
                                    {item.title}
                                    <span style={{
                                      position: "absolute", 
                                      right: "20px", 
                                      fontSize: "0.7em", 
                                      fontWeight: "normal"
                                    }}>
                                      {formatDistanceToNow(addHours(new Date(item.dateModified.$date), 8))} ago
                                    </span>
                                  </div>
                                }
                                description={
                                  <div>
                                    <div>{item.content}</div>
                                    <div style={{
                                      fontSize: "0.8em",
                                      paddingTop: "3px"
                                    }}>
                                      <span style={{marginLeft: '3px', marginTop: '3px'}}>
                                      <Icon type="folder" />
                                      <span> {this.findItemCategory(item.categoryId)}</span>
                                      </span>
                                    </div>
                                 </div>
                                }
                            />
                            </List.Item>
                        )}
                        />
                    </div>
                </Content>
            </Layout>
        </Col>
    )
  }
}

export default ListCol;