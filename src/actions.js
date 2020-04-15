import { 
  userLogin,
  getUser,
  getUserCategories,
  getAllItems,
  getStarredItems,
  getItemsFromCategory,
  editItem,
  createItem,
  deleteItem,
  editUser
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
export const REQUEST_EDIT_ITEM = 'REQUEST_EDIT_ITEM'
export const RECEIVE_EDIT_ITEM = 'RECEIVE_EDIT_ITEM'
export const UNABLE_TO_SELECT_ITEM = 'UNABLE_TO_SELECT_ITEM'
export const REQUEST_CREATE_ITEM = 'REQUEST_CREATE_ITEM'
export const RECEIVE_CREATE_ITEM = 'RECEIVE_CREATE_ITEM'
export const CHANGE_FILTER = 'CHANGE_FILTER'
export const REQUEST_DELETE_ITEM = 'REQUEST_DELETE_ITEM'
export const RECEIVE_DELETE_ITEM = 'RECEIVE_DELETE_ITEM'
export const SWITCH_MODE = 'SWITCH_MODE'
export const RECEIVE_EDIT_NAME = 'RECEIVE_EDIT_NAME'
export const REQUEST_EDIT_NAME = 'REQUEST_EDIT_NAME'



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
    dispatch(changeFilter('All Items', null));
    dispatch(requestAllItems());
    return getAllItems()
      .then(res => dispatch(receiveAllItems(res)))
      .then(res => dispatch(selectFirstItemIfHas(res)))
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
    dispatch(changeFilter('Starred Items', null));
    dispatch(requestStarredItems());
    return getStarredItems()
      .then(res => dispatch(receiveStarredItems(res)))
      .then(res => dispatch(selectFirstItemIfHas(res)))
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
  return (dispatch, getState) => {
    const { categories } = getState();
    dispatch(changeFilter(categories.byId[categoryId].name, categoryId));
    dispatch(requestCategoryItems(categoryId));
    return getItemsFromCategory(categoryId)
      .then(res => dispatch(receiveCategoryItems(res)))
      .then(res => dispatch(selectFirstItemIfHas(res)))
  }
}

function requestEditItem(itemId, data) {
  return {
    type: REQUEST_EDIT_ITEM,
    id: itemId,
    data
  }
}

function receiveEditItem(res, itemId, data) {
  return {
    type: RECEIVE_EDIT_ITEM,
    res,
    id: itemId,
    data
  }
}

export function fetchEditItem(itemId, data) {
  return dispatch => {
    dispatch(requestEditItem(itemId, data));
    return editItem(itemId, data)
      .then(res => dispatch(receiveEditItem(res, itemId, data)))
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

export function unableToSelectItem() {
  return {
    type: UNABLE_TO_SELECT_ITEM
  }
}

export function selectFirstItemIfHas(res) {
  console.log(res);
  return dispatch => {
    return (
      res.data.length?
        dispatch(selectItem(res.data[0]._id.$oid)) :
        dispatch(unableToSelectItem())
    );
  }
}

function requestCreateItem(body) {
  return {
    type: REQUEST_CREATE_ITEM,
    body
  }
}

function receiveCreateItem(data) {
  return {
    type: RECEIVE_CREATE_ITEM,
    data
  }
}

// may have to getstate to see if new item is created -- see empty cat
export function fetchCreateItem(body) {
  return (dispatch, getState) => {
    dispatch(requestCreateItem(body));
    return createItem(body)
      .then(res => dispatch(receiveCreateItem(res)))
      .then(res => {
        const { itemsByFilter } = getState();
        itemsByFilter.itemsById[res.data._id.$oid] ?
          dispatch(selectItem(res.data._id.$oid)) :
          dispatch(unableToSelectItem())
      })
  }
}

export function changeFilter(filter, categoryId=null) {
  return {
    type: CHANGE_FILTER,
    filterType: filter,
    categoryId
  }
}

function requestDeleteItem(itemId) {
  return {
    type: REQUEST_DELETE_ITEM,
    id: itemId
  }
}

function receiveDeleteItem(res, itemId) {
  return {
    type: RECEIVE_DELETE_ITEM,
    res,
    id: itemId
  }
}

export function fetchDeleteItem(itemId) {
  return dispatch => {
    dispatch(deselectItem());
    dispatch(requestDeleteItem(itemId));
    return deleteItem(itemId)
      .then(res => dispatch(receiveDeleteItem(res, itemId)))
  }
}

function requestEditName(data) {
  return {
    type: REQUEST_EDIT_NAME,
    firstName: data.firstName,
    lastName: data.lastName
  }
}

function receiveEditName(res, data) {
  return {
    type: RECEIVE_EDIT_NAME,
    res,
    firstName: data.firstName,
    lastName: data.lastName
  }
}

export function fetchEditName(data) {
  return dispatch => {
    dispatch(requestEditName(data));
    return editUser(data)
      .then(res => dispatch(receiveEditName(res, data)))
  }
}

export function switchMode() {
  return {
    type: SWITCH_MODE 
  }
}