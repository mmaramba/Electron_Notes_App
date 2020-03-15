import React from 'react';
import TextEditor from './TextEditor.js';
import { editItem } from '../../../api.js';
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

// https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
// derives state from props, uses key to render new component on item change
class ItemCol extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    currItemObj: this.props.currItemObj
  }

  handleStarPressed = (e, item) => {
    console.log(e);
    console.log("star button pressed");
    this.setState(prevState => ({
      currItemObj: {
        ...prevState.currItemObj,
        star: !item.star
      }
    }));
    const reqBody = {
      star: !item.star
    }
    editItem(item._id.$oid, reqBody).then((res) => {
      if (res.success) {
        console.log("item star button press successful");
        this.props.editCallback(this.state.currItemObj);
      } else {
        console.log("error starring item");
        console.log(res.error);
      }
    });
  }

  handleSave = (e, item) => {
    console.log("saving...");
    console.log(item.content);
    const hide = message.loading('Saving item...', 0);
    const reqBody = {
      content: item.content
    }
    editItem(item._id.$oid, reqBody).then((res) => {
      if (res.success) {
        console.log("item save content successful");
        this.props.editCallback(item);
      } else {
        console.log("error saving item");
        console.log(res.error);
      }
    });
    setTimeout(hide, 750);
  }

  handleContentChange = (html) => {
    console.log("ITEM CHANGED");
    this.setState(prevState => ({
      currItemObj: {
        ...prevState.currItemObj,
        content: html
      }
    }));
  }

  render() {
    //console.log(this.props.filter);
    //console.log(this.props.currItemObj);
    const { itemsById } = this.props.itemsByFilter;
    const { selectedId, isSelected} = this.props.selectedItem;

    if (!isSelected) {
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
                  onClick={e => this.handleStarPressed(e, this.props.currItemObj)}
                >
                  <Icon type="star" theme={itemsById[selectedId].star ? "filled" : "outlined"} />
                </ColoredButton>
              </Tooltip>
              <Tooltip placement="bottomRight" title="Delete item">
                <ColoredButton type="link" size="small" onClick={() => console.log("delete pressed")}>
                  <Icon type="delete" theme="outlined" />
                </ColoredButton>
              </Tooltip>
              <Tooltip placement="bottomRight" title="Share item">
                <ColoredButton type="link" size="small">
                  <Icon type="share-alt" theme="outlined" />
                </ColoredButton>
              </Tooltip>
              <Tooltip placement="bottomRight" title="Save">
                <ColoredButton type="link" size="small" onClick={e => this.handleSave(e, this.state.currItemObj)}>
                  <Icon type="save" theme="outlined" />
                </ColoredButton>
              </Tooltip>
            </TopRightToolbar>
            <ItemContentContainer>
                <TextEditor
                  title={itemsById[selectedId].title}
                  cat={itemsById[selectedId].categoryId ? 
                    this.props.categories.byId[itemsById[selectedId].categoryId].name :
                    "Uncategorized"
                  }
                  placeholder="Start typing here!"
                  content={itemsById[selectedId].content}
                  handleContentChange={this.handleContentChange}
                />
            </ItemContentContainer>
          </ItemColumnContent>
        </ItemColumnLayout>
      </ItemColumnContainer>
    )
  }
}

export default ItemCol;