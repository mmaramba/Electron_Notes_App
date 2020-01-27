import React from 'react';
import './ItemCol.css';
import TextEditor from './TextEditor.js';
import {
    Layout,
    Button,
    Breadcrumb,
    Icon,
    Modal,
    Col,
    Tooltip
} from 'antd';

const { Header, Content, Footer, Sider } = Layout;


class ItemCol extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    editTitleVisible: false,
    editTitleModalVisible: false
  };

  showEditTitleButton = () => {
    this.setState({
      editTitleVisible: true
    });
  };

  hideEditTitleButton = () => {
    this.setState({
      editTitleVisible: false
    });
  };

  showEditTitleModal = () => {
    this.setState({
      editTitleModalVisible: true
    });
  };

  handleEditTitleOk = e => {
    console.log(e);
    this.setState({
      editTitleModalVisible: false,
    });
  };

  handleEditTitleCancel = e => {
    console.log(e);
    this.setState({
      editTitleModalVisible: false,
    });
  };

  render() {
    
    return (
        <Col span={16} style={{height: "100%", backgroundColor: "white"}}>
            <Layout style={{position: "fixed", width: "calc(100% - 500px)"}}>
                <Content style={{width: '100%', height: "100%", backgroundColor: "white"}}>
                    <div className="topDetailSection">
                        <div className="itemDetailToolbar">
                            <Tooltip placement="bottomRight" title="Create timer for item">
                            <Button type="link" style={{color: "rgba(0, 0, 0, 0.65)"}} icon="clock-circle" size="small" ghost />
                            </Tooltip>
                            <Tooltip placement="bottomRight" title="Star item">
                            <Button type="link" style={{color: "rgba(0, 0, 0, 0.65)"}} icon="star" size="small" ghost />
                            </Tooltip>
                            <Tooltip placement="bottomRight" title="Share item">
                            <Button type="link" style={{color: "rgba(0, 0, 0, 0.65)"}} icon="share-alt" size="small" ghost />
                            </Tooltip>
                            <Tooltip placement="bottomRight" title="More options">
                            <Button type="link" style={{color: "rgba(0, 0, 0, 0.65)"}} icon="ellipsis" size="small" ghost />
                            </Tooltip>
                        </div>
                        <Breadcrumb style={{ margin: '16px 16px', textAlign: 'left', paddingBottom: '10px', cursor: "pointer"}}>
                            <Breadcrumb.Item>Items</Breadcrumb.Item>
                            <Breadcrumb.Item id="titleContainer" onMouseEnter={this.showEditTitleButton} onMouseLeave={this.hideEditTitleButton} onClick={this.showEditTitleModal}>
                            Untitled
                            <span id="editTitle"><Icon type="edit" style={{paddingLeft: "5px", display: this.state.editTitleVisible? "inline-block" : "none"}}/></span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Modal
                        title="Edit Title"
                        visible={this.state.editTitleModalVisible}
                        onOk={this.handleEditTitleOk}
                        onCancel={this.handleEditTitleCancel}
                        >
                        <p>Enter a new title</p>
                    </Modal>
                    <div style={{margin: "16px"}}>
                        <TextEditor placeholder="Start typing here!" />
                    </div>
                </Content>
            </Layout>
        </Col>
    )
  }
}

export default ItemCol;