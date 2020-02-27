import React from 'react';
import TextEditor from './TextEditor.js';
import { editItem } from '../api.js';
import {
    Layout,
    Button,
    Icon,
    Col,
    Tooltip,
    message
} from 'antd';
import styled from 'styled-components';

const { Content } = Layout;

const ItemColumnContainer = styled(Col)`
  background-color: white;
  overflow-x: hidden; 
  height: 100vh;
  overflow-y: auto;
`

const ItemColumnLayout = styled(Layout)`
  position: fixed;
  width: 60%;
`

const ItemColumnContent = styled(Content)`
  width: 100%;
  background-color: white;
`

const TopRightToolbar = styled.div`
  text-align: right;
  margin-right: 16px;
  padding-top: 10px;
  position: fixed;
  right: 8px;
  top: 2px;
`

const ColoredButton = styled(Button)`
  color: rgba(0, 0, 0, 0.65);
`

const ItemContentContainer = styled.div`
  margin: 16px;
`


class ItemCol extends React.Component {
  constructor(props) {
    super(props)
  }

  handleStarPressed = (e, item) => {
    console.log(e);
    console.log("star button pressed");
    const reqBody = {
      star: !item.star
    }
    editItem(item._id.$oid, reqBody).then((res) => {
      if (res.success) {
        console.log("item star button press successful");
      } else {
        console.log("error starring item");
        console.log(res.error);
      }
    });
  }

  findItemCategory = (item) => {
    if (!item) {
      return "";
    }
    if (!item.categoryId) {
      return "Uncategorized";
    }
    let res = this.props.cats.find(e => e._id.$oid === item.categoryId);
    return res.name;
  }

  render() {
    console.log(this.props.filter);
    const item = this.props.items.find(e => e._id.$oid === this.props.currItem);
    const success = () => {
      const hide = message.loading('Make PUT API call here...', 0);
      setTimeout(hide, 2000);
    }

    if (!item) {
      return <div></div>
    }
    
    return (
      <ItemColumnContainer span={16}>
        <ItemColumnLayout>
          <ItemColumnContent>
            <TopRightToolbar>
              <Tooltip placement="bottomRight" title="Star item">
                <ColoredButton
                  size="small"
                  type="link"
                  onClick={e => this.handleStarPressed(e, item)}
                >
                  <Icon type="star" theme={item.star? "filled" : "outlined"} />
                </ColoredButton>
              </Tooltip>
              <Tooltip placement="bottomRight" title="Share item">
                <ColoredButton type="link" size="small">
                  <Icon type="share-alt" theme="outlined" />
                </ColoredButton>
              </Tooltip>
              <Tooltip placement="bottomRight" title="Save">
                <ColoredButton type="link" size="small" onClick={success}>
                  <Icon type="save" theme="outlined" />
                </ColoredButton>
              </Tooltip>
            </TopRightToolbar>
            <ItemContentContainer>
                <TextEditor
                  title={item.title}
                  cat={this.findItemCategory(item)}
                  placeholder="Start typing here!"
                  content={item? item.content : ""}
                />
            </ItemContentContainer>
          </ItemColumnContent>
        </ItemColumnLayout>
      </ItemColumnContainer>
    )
  }
}

export default ItemCol;