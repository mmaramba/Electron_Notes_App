import React from 'react';
import { Layout, Spin } from 'antd';
import LeftNav from './LeftNav/LeftNav.js';
import ItemsView from './Items/ItemsView.js';
import { getUser, createItem } from '../api.js';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

const SpinContainer = styled.div`
  display: inline-block;
  padding-top: 200px;
`

const StyledLayout = styled(Layout)`
  height: 100vh;
`


class LoggedInView extends React.Component {
  constructor(props){
    super(props);
  }

  state = {
      user: {}
  }

  componentDidMount() {
      console.log("Make GET /user request here");
      getUser().then((res) => {
        console.log(res);
        this.setState({
          user: res
        });
      });
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
    console.log(this.state.user);

    // if empty object
    if (Object.keys(this.state.user).length === 0 && this.state.user.constructor === Object) {
        return <SpinContainer><Spin /></SpinContainer>
    }

    return (
      <StyledLayout>
        <HashRouter>
          <LeftNav
            cats={this.state.user.categories}
            first={this.state.user.firstName}
            last={this.state.user.lastName}
            email={this.state.user.email}
            createItemHandler={this.createItemButtonPressed}
          />
          <Switch>
            <Route path="/items">
              <ItemsView filter="all" items={this.state.user.items} cats={this.state.user.categories} />
            </Route>
            <Route path="/starred">
              <ItemsView filter="starred" items={this.state.user.items.filter(e => e.star)} cats={this.state.user.categories} />
            </Route>
            <Route path="/cat/:categoryId" render={(props) => {
                return <ItemsView filter="category" items={this.state.user.items} cats={this.state.user.categories} {...props} />
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

export default LoggedInView;