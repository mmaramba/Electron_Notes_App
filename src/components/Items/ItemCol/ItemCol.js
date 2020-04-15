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
  background-color: ${props => props.lightmode === "true" ? "white" : "black"};
  color: ${props => props.lightmode === "true" ? "rgba(0, 0, 0, 0.65)" : "white"};
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
  background-color: ${props => props.lightmode === "true" ? "white" : "black"};
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
  color: ${props => props.lightmode === "true" ? "rgba(0, 0, 0, 0.65)" : "white"};
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
    content: ''
  }

  handleTitleChange = (newTitle) => {
    console.log("FROM IC: " + newTitle);
    const reqBody = {
      title: newTitle
    }

    // should rename to editItemCb
    this.props.saveContentCb(this.props.selectedItem.selectedId, reqBody);
  }

  handleStarPressed = (e) => {
    console.log(e);
    console.log("star button pressed");
    /*
    this.setState(prevState => ({
      currItemObj: {
        ...prevState.currItemObj,
        star: !item.star
      }
    }));
    */
    const reqBody = {
      star: !this.props.itemsByFilter.itemsById[this.props.selectedItem.selectedId].star
    }

    this.props.saveContentCb(this.props.selectedItem.selectedId, reqBody);
    /*
    editItem(item._id.$oid, reqBody).then((res) => {
      if (res.success) {
        console.log("item star button press successful");
        this.props.editCallback(this.state.currItemObj);
      } else {
        console.log("error starring item");
        console.log(res.error);
      }
    });
    */
  }

  handleDelete = () => {
    console.log("Deleting" + this.props.selectedItem.selectedId);

    this.props.deleteItemCb(this.props.selectedItem.selectedId);
  }

  handleSaveContent = () => {
    console.log("saving content...");
    
    const reqBody = {
      content: this.state.content
    }
    console.log(reqBody);

    
    const success = () => {
      const hide = message.loading('Saving item...', 0);
      this.props.saveContentCb(this.props.selectedItem.selectedId, reqBody);
      setTimeout(hide, 0);
    }

    success();
    /*editItem(item._id.$oid, reqBody).then((res) => {
      if (res.success) {
        console.log("item save content successful");
        this.props.editCallback(item);
      } else {
        console.log("error saving item");
        console.log(res.error);
      }
    });
    */
    //setTimeout(hide, 750);
  }

  /*
  handleContentChange = (html) => {
    console.log("ITEM CHANGED");
    this.setState(prevState => ({
      currItemObj: {
        ...prevState.currItemObj,
        content: html
      }
    }));
  }
  */
  
  componentDidUpdate(prevProps) {
    if (this.props.selectedItem !== prevProps.selectedItem) {
      console.log("Item selection updated");
      if (this.props.selectedItem.isSelected) {
        this.setState({
          content: this.props.itemsByFilter.itemsById[this.props.selectedItem.selectedId].content
        });
      }
    }
  }
  
  handleContentChange = (html) => {
    console.log("ITEM CHANGED");
    this.setState({
      content: html
    })
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
      <ItemColumnContainer span={16} lightmode={this.props.lightmode}>
        <ItemColumnLayout>
          <ItemColumnContent lightmode={this.props.lightmode}>
            <TopRightToolbar lightmode={this.props.lightmode}>
              <Tooltip placement="bottomRight" title="Star item">
                <ColoredButton
                  lightmode={this.props.lightmode}
                  size="small"
                  type="link"
                  onClick={e => this.handleStarPressed(e, this.props.currItemObj)}
                >
                  <Icon type="star" theme={itemsById[selectedId].star ? "filled" : "outlined"} />
                </ColoredButton>
              </Tooltip>
              <Tooltip placement="bottomRight" title="Delete item">
                <ColoredButton type="link" size="small" onClick={this.handleDelete} lightmode={this.props.lightmode}>
                  <Icon type="delete" theme="outlined" />
                </ColoredButton>
              </Tooltip>
              <Tooltip placement="bottomRight" title="Share item">
                <ColoredButton type="link" size="small" lightmode={this.props.lightmode}>
                  <Icon type="share-alt" theme="outlined" />
                </ColoredButton>
              </Tooltip>
              <Tooltip placement="bottomRight" title="Save">
                <ColoredButton type="link" size="small" onClick={e => this.handleSaveContent(e)} lightmode={this.props.lightmode}>
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
                  content={this.state.content}
                  handleContentChange={this.handleContentChange}
                  handleTitleChange={this.handleTitleChange}
                  lightmode={this.props.lightmode}
                />
            </ItemContentContainer>
          </ItemColumnContent>
        </ItemColumnLayout>
      </ItemColumnContainer>
    )
  }
}

export default ItemCol;