import { combineReducers } from 'redux'
import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN_SUCCESS,
  RECEIVE_LOGIN_ERROR,
  REQUEST_USER_INFO,
  RECEIVE_USER_INFO,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_ALL_ITEMS,
  RECEIVE_ALL_ITEMS,
  SELECT_ITEM
} from './actions'

function loginStatus(
  state = {
    loggedIn: false,
    isFetching: false,
    error: ''
  },
  action
) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        loggedIn: true
      });
    case RECEIVE_LOGIN_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        loggedIn: false,
        error: action.error
      });
    default:
      return state;
  }
}

function userInfo(
  state = {
    email: '',
    firstName: '',
    lastName: '',
    isFetchingUser: false
  },
  action
) {
  switch (action.type) {
    case REQUEST_USER_INFO:
      return Object.assign({}, state, {
        isFetchingUser: true
      });
    case RECEIVE_USER_INFO:
      return Object.assign({}, state, {
        isFetchingUser: false,
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName
      });
    default:
      return state;
  }
}

function categories(
  state = {
    byId: {},
    allIds: [],
    isFetchingCategories: false
  },
  action
) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return Object.assign({}, state, {
        isFetchingCategories: true
      });
    case RECEIVE_CATEGORIES:
      const byIdObj = {}
      action.data.forEach(cat => byIdObj[cat._id.$oid] = cat)

      return Object.assign({}, state, {
        isFetchingCategories: false,
        byId: byIdObj,
        allIds: action.data.map(cat => cat._id.$oid)
      });
    default:
      return state;
  }
}

function itemsByFilter(
  state = {
    itemsById: {},
    allItemIds: [],
    isFetchingItems: false
  },
  action
) {
  switch (action.type) {
    case REQUEST_ALL_ITEMS:
      return Object.assign({}, state, {
        isFetchingItems: true
      });
    case RECEIVE_ALL_ITEMS:
      const byIdObj = {}
      console.log(action.data)
      action.data.forEach(item => byIdObj[item._id.$oid] = item)

      return Object.assign({}, state, {
        isFetchingItems: false,
        itemsById: byIdObj,
        allItemIds: action.data.map(item => item._id.$oid)
      });
    default:
      return state;
  }
}

function selectedItem(
  state = {
    isSelected: false,
    selectedId: ''
  },
  action
) {
  switch (action.type) {
    case SELECT_ITEM:
      return Object.assign({}, state, {
        isSelected: true,
        selectedId: action.id
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  loginStatus,
  userInfo,
  categories,
  itemsByFilter,
  selectedItem
})

export default rootReducer