import { 
  userLogin,
  getUser,
  getUserCategories,
  getAllItems,
  getStarredItems,
  getItemsFromCategory
} from './api.js';

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN_SUCCESS = 'RECEIVE_LOGIN_SUCCESS'
export const RECEIVE_LOGIN_ERROR = 'RECEIVE_LOGIN_ERROR'
export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_ALL_ITEMS = 'RECEIVE_ALL_ITEMS'
export const REQUEST_ALL_ITEMS = 'REQUEST_ALL_ITEMS'
export const SELECT_ITEM = 'SELECT_ITEM'
export const RECEIVE_STARRED_ITEMS = 'RECEIVE_STARRED_ITEMS'
export const REQUEST_STARRED_ITEMS = 'REQUEST_STARRED_ITEMS'
export const DESELECT_ITEM = 'DESELECT_ITEM'
export const REQUEST_CATEGORY_ITEMS = 'REQUEST_CATEGORY_ITEMS'
export const RECEIVE_CATEGORY_ITEMS = 'RECEIVE_CATEGORY_ITEMS'

function requestLogin(data) {
  return {
    type: REQUEST_LOGIN,
    data
  }
}

function receiveLoginResponse(res) {
  return (res.success ?
    { type: RECEIVE_LOGIN_SUCCESS } :
    {
      type: RECEIVE_LOGIN_ERROR,
      error: res.error
    }
  );
}

export function login(data) {
  return dispatch => {
    dispatch(requestLogin(data));
    return userLogin(data)
      .then(res => dispatch(receiveLoginResponse(res)))
  }
}

function requestUserInfo() {
  return {
    type: REQUEST_USER_INFO
  }
}

function receiveUserInfo(data) {
  return {
    type: RECEIVE_USER_INFO,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
  }
}

// TODO: implement error handling, e.g. RECEIVE_USER_INFO_ERROR
export function fetchUserInfo() {
  return dispatch => {
    dispatch(requestUserInfo());
    return getUser()
      .then(res => dispatch(receiveUserInfo(res)))
  }
}

function requestCategories() {
  return {
    type: REQUEST_CATEGORIES
  }
}

function receiveCategories(data) {
  return {
    type: RECEIVE_CATEGORIES,
    data
  }
}

// TODO: implement error handling, e.g. RECEIVE_CATEGORIES_ERROR
export function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories());
    return getUserCategories()
      .then(res => dispatch(receiveCategories(res)))
  }
}

function requestAllItems() {
  return {
    type: REQUEST_ALL_ITEMS
  }
}

function receiveAllItems(data) {
  return {
    type: RECEIVE_ALL_ITEMS,
    data
  }
}

// TODO: implement error handling, e.g. RECEIVE_ITEMS_ERR
export function fetchAllItems() {
  return dispatch => {
    dispatch(requestAllItems());
    return getAllItems()
      .then(res => dispatch(receiveAllItems(res)))
  }
}

function requestStarredItems() {
  return {
    type: REQUEST_STARRED_ITEMS
  }
}

function receiveStarredItems(data) {
  return {
    type: RECEIVE_STARRED_ITEMS,
    data
  }
}

// TODO: implement error handling, e.g. RECEIVE_ITEMS_ERR
export function fetchStarredItems() {
  return dispatch => {
    dispatch(requestStarredItems());
    return getStarredItems()
      .then(res => dispatch(receiveStarredItems(res)))
  }
}

function requestCategoryItems(categoryId) {
  return {
    type: REQUEST_CATEGORY_ITEMS,
    id: categoryId
  }
}

function receiveCategoryItems(data) {
  return {
    type: RECEIVE_CATEGORY_ITEMS,
    data
  }
}

// TODO: implement error handling, e.g. RECEIVE_ITEMS_ERR
export function fetchCategoryItems(categoryId) {
  return dispatch => {
    dispatch(requestCategoryItems(categoryId));
    return getItemsFromCategory(categoryId)
      .then(res => dispatch(receiveCategoryItems(res)))
  }
}


export function selectItem(id) {
  return {
    type: SELECT_ITEM,
    id
  }
}

export function deselectItem() {
  return {
    type: DESELECT_ITEM
  }
}