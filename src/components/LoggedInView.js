import React from 'react';
import { Layout, Spin } from 'antd';
import LeftNav from './LeftNav/LeftNav.js';
import ItemsView from './Items/ItemsView.js';
import { getUser, createItem } from '../api.js';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import {
  fetchUserInfo,
  fetchCategories
} from '../actions.js';
import { connect } from 'react-redux';

const SpinContainer = styled.div`
  display: inline-block;
  padding-top: 200px;
`

const StyledLayout = styled(Layout)`
  height: 100vh;
`

const LoadingText = styled.div`
  margin-top: 20px;
`


class LoggedInView extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    user: {}
  }

  componentDidMount() {
    console.log("Make GET /user request here");
    getUser().then((res) => {
      this.setState({
        user: res
      });
    });

    this.props.dispatch(fetchUserInfo());
    this.props.dispatch(fetchCategories());
  }

  createItemButtonPressed = () => {
    console.log("Create item button was pressed");

    const reqBody = {
      content: "",
      categoryId: null,
      title: "Untitled"
    }

    console.log(reqBody);

    createItem(reqBody).then((res) => {
      if (res) {
        console.log("POST /item successful");
        console.log(res);

        // push newly created item to list and update state
        const newItems = [...this.state.user.items, res];
        this.setState(prevState => ({
          user: {
            ...prevState.user,
            items: newItems
          }
        }));
        console.log(this.state);
      } else {
        console.log("POST /item unsuccessful");
        console.log(res.error);
      }
    });
    /*
    const newItems = [...this.state.user.items, {

    }];
    */

  }

  render() {
    const { userInfo, categories } = this.props;
    const { isFetchingUser, email, firstName, lastName } = userInfo;
    const { isFetchingCategories, byId, allIds } = categories;

    // if empty object or fetching user
    if ((Object.keys(this.state.user).length === 0 && this.state.user.constructor === Object) || isFetchingUser || isFetchingCategories) {
      return (
        <SpinContainer>
          <Spin />
          <LoadingText>Loading...</LoadingText>
        </SpinContainer>
      );
    }

    return (
      <StyledLayout>
        <HashRouter>
          <LeftNav
            categories={categories}
            first={firstName}
            last={lastName}
            email={email}
            createItemHandler={this.createItemButtonPressed}
          />
          <Switch>
            <Route path="/items">
              <ItemsView filter="all" items={this.state.user.items} categories={categories} />
            </Route>
            <Route path="/starred">
              <ItemsView filter="starred" items={this.state.user.items.filter(e => e.star)} categories={categories} />
            </Route>
            <Route path="/cat/:categoryId" render={(props) => {
              return <ItemsView filter="category" items={this.state.user.items} categories={categories} {...props} />
            }} />
            <Route path="/">
              <Redirect to="/items" />
            </Route>
          </Switch>
        </HashRouter>
      </StyledLayout>
    );
  }
}

function mapStateToProps(state) {
  const { userInfo, categories } = state;
  const { email, firstName, lastName, isFetchingUser } = userInfo || { email: '', firstName: '', lastName: '', isFetchingUser: true }
  const { byId, allIds, isFetchingCategories } = categories || { byId: {}, allIds: [], isFetchingCategories: true }

  return {
    userInfo: {
      email,
      firstName,
      lastName,
      isFetchingUser
    },
    categories: {
      byId,
      allIds,
      isFetchingCategories
    }
  }
}

export default connect(mapStateToProps)(LoggedInView);