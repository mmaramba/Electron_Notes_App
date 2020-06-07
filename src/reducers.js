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
  SELECT_ITEM,
  REQUEST_STARRED_ITEMS,
  RECEIVE_STARRED_ITEMS,
  DESELECT_ITEM,
  REQUEST_CATEGORY_ITEMS,
  RECEIVE_CATEGORY_ITEMS,
  REQUEST_EDIT_ITEM,
  RECEIVE_EDIT_ITEM,
  REQUEST_CREATE_ITEM,
  RECEIVE_CREATE_ITEM,
  CHANGE_FILTER,
  REQUEST_DELETE_ITEM,
  RECEIVE_DELETE_ITEM,
  SWITCH_MODE,
  REQUEST_EDIT_NAME,
  RECEIVE_EDIT_NAME, 
  REQUEST_SEARCH_ITEMS,
  RECEIVE_SEARCH_ITEMS,
  REQUEST_EDIT_CAT_NAME,
  RECEIVE_EDIT_CAT_NAME,
  UPDATE_FILTER_NAME,
  REQUEST_CREATE_CAT,
  RECEIVE_CREATE_CAT,
  REQUEST_DELETE_CAT,
  RECEIVE_DELETE_CAT
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
    lightMode: 'true',
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
    case REQUEST_EDIT_NAME:
      return state;
    case RECEIVE_EDIT_NAME:
      return Object.assign({}, state, {
        firstName: action.firstName,
        lastName: action.lastName
      });
    case SWITCH_MODE:
      const newMode = state.lightMode === 'true' ? 'false' : 'true';
      return Object.assign({}, state, {
        lightMode: newMode
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
    case REQUEST_EDIT_CAT_NAME:
      return state;
    case RECEIVE_EDIT_CAT_NAME:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            name: action.name
          }
        }
      }
    case REQUEST_CREATE_CAT:
      return state;
    case RECEIVE_CREATE_CAT:
      // we just manually fetch categories after so i don't do anything here
      return state;
    case REQUEST_DELETE_CAT:
      return state;
    case RECEIVE_DELETE_CAT:
      const { 
        [action.id] : _,
        ...rest
      } = state.byId;

      return Object.assign({}, state, {
        byId: rest,
        allIds: state.allIds.filter(id => id !== action.id)
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
      action.data.forEach(item => byIdObj[item._id.$oid] = item)

      return Object.assign({}, state, {
        isFetchingItems: false,
        itemsById: byIdObj,
        allItemIds: action.data.map(item => item._id.$oid)
      });
    case REQUEST_STARRED_ITEMS:
      return Object.assign({}, state, {
        isFetchingItems: true
      });
    case RECEIVE_STARRED_ITEMS:
      const byIdObjS = {}
      action.data.forEach(item => byIdObjS[item._id.$oid] = item)

      return Object.assign({}, state, {
        isFetchingItems: false,
        itemsById: byIdObjS,
        allItemIds: action.data.map(item => item._id.$oid)
      });
    case REQUEST_SEARCH_ITEMS:
      return Object.assign({}, state, {
        isFetchingItems: true
      });
    case RECEIVE_SEARCH_ITEMS:
      const byIdObjQ = {}
      action.data.forEach(item => byIdObjQ[item._id.$oid] = item)

      return Object.assign({}, state, {
        isFetchingItems: false,
        itemsById: byIdObjQ,
        allItemIds: action.data.map(item => item._id.$oid)
      });
    case REQUEST_CATEGORY_ITEMS:
      return Object.assign({}, state, {
        isFetchingItems: true
      });
    case RECEIVE_CATEGORY_ITEMS:
      const byIdObjC = {}
      action.data.forEach(item => byIdObjC[item._id.$oid] = item)

      return Object.assign({}, state, {
        isFetchingItems: false,
        itemsById: byIdObjC,
        allItemIds: action.data.map(item => item._id.$oid)
      });
    case REQUEST_EDIT_ITEM:
      return state;
    case RECEIVE_EDIT_ITEM:
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [action.id]: {
            ...state.itemsById[action.id],
            ...action.data
          }
        }
      }
    case REQUEST_CREATE_ITEM:
      return state;
    case RECEIVE_CREATE_ITEM:
      console.log(action.data);
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [action.data._id.$oid] : {
            ...action.data
          }
        },
        allItemIds: [
          action.data._id.$oid,
          ...state.allItemIds
        ]
      }
    case REQUEST_DELETE_ITEM:
      return state;
    case RECEIVE_DELETE_ITEM:
      const { 
        [action.id] : _,
        ...rest
      } = state.itemsById;

      return Object.assign({}, state, {
        itemsById: rest,
        allItemIds: state.allItemIds.filter(id => id !== action.id)
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
    case DESELECT_ITEM:
      return Object.assign({}, state, {
        isSelected: false,
        selectedId: ''
      });
    default:
      return state;
  }
}

function filter(
  state = {
    filterType: 'all',
    categoryId: null
  },
  action
) {
  switch (action.type) {
    case CHANGE_FILTER:
      return Object.assign({}, state, {
        filterType: action.filterType,
        categoryId: action.categoryId
      });
    case UPDATE_FILTER_NAME:
      return Object.assign({}, state, {
        filterType: action.name
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
  selectedItem,
  filter
})

export default rootReducer