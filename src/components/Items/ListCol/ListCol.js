import React from 'react';
import {
  Layout,
  Menu,
  Icon,
  Col,
  List,
  Input,
  Affix
} from 'antd';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import addHours from 'date-fns/addHours';
import ListColHeader from './ListColHeader.js';
import styled from 'styled-components';

const { Content } = Layout;
const { Search } = Input;

const StyledCol = styled(Col)`
  user-select: none;
  background-color: black !important;
  overflow-x: hidden;
`

const StyledLayout = styled(Layout)`
  height: 100vh;
`

const StyledContent = styled(Content)`
  background-color: black !important;
  position: relative;
`

const AffixContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`

// change back to #fcfcfc
const ScrollableArea = styled.div`
  height: 4000px;
  background-color: ${props => props.lightmode === "true" ? "#fcfcfc" : "#262626"};
`

const StyledListItem = styled(List.Item)`
  text-align: left;
  padding-left: 10px;
  padding-top: 6px !important;
  padding-bottom: 2px !important;
  border-bottom: ${props => props.lightmode === "true" ? "1px solid #e8e8e8" : "1px solid #333333"} !important;
  background-color: ${props => HandleListItemBackgroundColor(props.lightmode, props.iscurrentitem)};
`

const HandleListItemBackgroundColor = (lightmode, iscurrentitem) => {
  if (lightmode === "true" && iscurrentitem === "true") {
    return "#ededed";
  } else if (lightmode === "true" && iscurrentitem !== "true") {
    return "white";
  } else if (lightmode !== "true" && iscurrentitem === "true") {
    return "gray";
  } else {
    return "#262626";
  }
}

const RelativeDiv = styled.div`
  position: relative;
`

const ListItemCategoryText = styled.span`
  margin-left: 3px;
  margin-top: 3px;
  font-size: 0.8em;
  color: ${props => props.lightmode === "true" ? "#666666" : "white"};
`

const ListItemTimeText = styled.span`
  font-size: 0.8em;
  font-weight: normal;
  color: ${props => props.lightmode === "true" ? "#666666" : "white"};
`

const ListItemTitleDiv = styled.div`
  font-weight: 600;
  color: ${props => props.lightmode === "true" ? "#666666" : "white"};
`

const ListItemContentPreview = styled.div`
  font-size: 0.8em;
  padding-top: 3px;
  height: 30px;
  color: ${props => props.lightmode === "true" ? "#666666" : "white"};
`

const ListItemStar = styled.span`
  position: absolute;
  right: 15px;
  bottom: 0;
  font-size: 1em;
  font-weight: normal;
  height: 30px;
  padding-top: 3px;
  color: ${props => props.lightmode === "true" ? "#666666" : "white"};
`


class ListCol extends React.Component {
  constructor(props) {
    super(props);
    this.affixRef = React.createRef();
    this.container = React.createRef();
  }

  limitPreviewContentLength = (content) => {
    const MAX_LEN = 30;
    var noLineBreaks = content.replace(/\s/g, "")
    if (noLineBreaks.length > MAX_LEN) {
      return noLineBreaks.slice(0, MAX_LEN) + '...';
    } else {
      return noLineBreaks;
    }
  }

  extractTextFromContent = (content) => {
    const MAX_LEN = 30;
    var div = document.createElement('div');
    div.innerHTML = content;
    var text = div.textContent;

    if (text.length > MAX_LEN) {
      return text.slice(0, MAX_LEN) + '...';
    } else {
      return text;
    }
  }

  onUserItemClicked = (itemId, e, item) => {
    this.props.currItemCallback(itemId, item);
  }

  componentDidMount() {
    window.addEventListener(
      "scroll",
      () => {
        if (this.affixRef.current) {
          this.affixRef.current.updatePosition();
        }
      },
      true
    );
  }

  render() {
    const { byId, allIds } = this.props.categories;
    const { itemsById, allItemIds } = this.props.itemsByFilter;
    const { selectedId, isSelected } = this.props.selectedItem;

    return (
      <StyledCol span={8}>
        <StyledLayout>
          <StyledContent>
            <AffixContainer ref={node => this.container = node}>
              <ScrollableArea lightmode={this.props.lightmode}>
                <Affix ref={this.affixRef} target={() => this.container}>
                  <ListColHeader
                    location={this.props.location}
                    numItems={allItemIds.length}
                    headerText={this.props.filter}
                    lightmode={this.props.lightmode}
                  />
                </Affix>
                <div>
                  <List
                    itemLayout="horizontal"
                    dataSource={allItemIds}
                    size="large"
                    locale={{
                      emptyText:
                        <span role="img" aria-label="Sad Pensive Face">
                          No items were found. 😔
                        </span> 
                    }}
                    renderItem={itemId => (
                      <StyledListItem
                        key={itemId}
                        iscurrentitem={(itemId === selectedId).toString()}
                        onClick={(e) => this.onUserItemClicked(itemId, e, itemsById[itemId])}
                        lightmode={this.props.lightmode}
                      >
                        <List.Item.Meta
                          title={
                            <RelativeDiv>
                              <ListItemCategoryText lightmode={this.props.lightmode}>
                                <Icon type="folder" />
                                <span> {itemsById[itemId].categoryId? byId[itemsById[itemId].categoryId].name : "Uncategorized"} · </span>
                              </ListItemCategoryText>
                              <ListItemTimeText lightmode={this.props.lightmode}>
                                {formatDistanceToNow(addHours(new Date(itemsById[itemId].dateModified.$date), 8))} ago
                              </ListItemTimeText>
                            </RelativeDiv>
                          }
                          description={
                            <RelativeDiv>
                              <ListItemTitleDiv lightmode={this.props.lightmode}>{itemsById[itemId].title}</ListItemTitleDiv>
                              <ListItemContentPreview lightmode={this.props.lightmode}>
                                {this.extractTextFromContent(itemsById[itemId].content)}
                              </ListItemContentPreview>
                              <ListItemStar lightmode={this.props.lightmode}>
                                {itemsById[itemId].star ? <Icon type="star" theme="filled" /> : ""}
                              </ListItemStar>
                            </RelativeDiv>
                          }
                        />
                      </StyledListItem>
                    )}
                  />
                </div>
              </ScrollableArea>
            </AffixContainer>
          </StyledContent>
        </StyledLayout>
      </StyledCol>
    )
  }
}

export default ListCol;