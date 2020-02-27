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
    Input,
    Affix
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
    currentItem: this.props.currItem,
    searchModalVisible: false
  };

  limitPreviewContentLength = (content) => {
    const MAX_LEN = 30;
    if (content.length > MAX_LEN) {
      return content.slice(0, MAX_LEN) + '...';
    } else {
      return content
    }
  }

  findItemCategory = (catId) => {
    if (!catId) {
      return "Uncategorized";
    }
    let res = this.props.cats.find(e => e._id.$oid === catId);
    return res.name;
  }

  onUserItemClicked = (item, e) => {
    console.log(item);
    this.props.currItemCallback(item);
    this.setState({
      currentItem: item
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
        <Col span={8} style={{userSelect: "none", overflowX: "hidden", backgroundColor: "white"}}>
            <Layout style={{height: "100vh"}}>
                <Content style={{backgroundColor: "white", position: "relative"}}>
                    <div
                      className="scrollable-container"
                      ref={node => {
                        this.container = node;
                      }}
                      style={{height: "100vh", overflowY: "scroll", overflowX: "hidden"}}
                    >
                      <div
                        style={{height: "1000px", backgroundColor: "#fcfcfc"}}
                      >
                        <Affix target={() => this.container}>
                    <div className="midColMenu">
                        <h3 style={{textAlign: "left", paddingTop: "10px", marginLeft: "10px"}}>{headerText}</h3>
                        <div style={{textAlign: "left", height: "100%", width: "100%", paddingTop: "30px", marginLeft: "10px"}}>
                          {this.props.items.length} Items
                        </div>
                        {/*
                        <div style={{textAlign: "right", height: "100%", width: "100%"}}>
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
                        */}
                    </div>
                    </Affix>
                    <div className="listContainer">
                        <List
                        itemLayout="horizontal"
                        dataSource={this.props.items}
                        size="large"
                        locale={{emptyText: <span role="img" aria-label="Sad Pensive Face">No items were found. 😔</span>}}
                        renderItem={item => (
                            <List.Item
                            key={item._id.$oid}
                            style={{
                                backgroundColor: (item._id.$oid === this.state.currentItem? "#ededed" : "white"),
                                textAlign: "left", 
                                paddingLeft: "10px", 
                                paddingBottom: "2px",
                                paddingTop: "6px",
                                borderBottom: "1px solid #e8e8e8"
                            }}
                            onClick={(e) => this.onUserItemClicked(item._id.$oid, e)}
                            >
                            <List.Item.Meta
                                title={
                                  <div style={{"position": "relative"}}>
                                    <span style={{marginLeft: '3px', marginTop: '3px', fontSize: "0.8em"}}>
                                      <Icon type="folder" />
                                      <span> {this.findItemCategory(item.categoryId)} · </span>
                                    </span>
                                    <span style={{
                                      fontSize: "0.8em", 
                                      fontWeight: "normal"
                                    }}>
                                      {formatDistanceToNow(addHours(new Date(item.dateModified.$date), 8))} ago
                                    </span>
                                  </div>
                                }
                                description={
                                  <div style={{"position": "relative"}}>
                                    <div style={{fontWeight: "600", color: "#666666"}}>{item.title}</div>
                                    <div 
                                      style={{
                                        fontSize: "0.8em",
                                        paddingTop: "3px",
                                        height: "30px"
                                      }}
                                      dangerouslySetInnerHTML={{__html: this.limitPreviewContentLength(item.content)}}
                                    />
                                    <span
                                      style={{
                                        position: "absolute",
                                        right: "15px",
                                        bottom: 0,
                                        fontSize: "1em", 
                                        fontWeight: "normal",
                                        height: "30px",
                                        paddingTop: "3px"
                                      }}
                                      onClick={() => console.log("Star clicked. Put here")}
                                    >
                                      {item.star? <Icon type="star" theme="filled" /> : ""}
                                    </span>
                                 </div>
                                }
                            />
                            </List.Item>
                        )}
                        />
                    </div>
                    </div>
                    </div>
                </Content>
            </Layout>
        </Col>
    )
  }
}

export default ListCol;