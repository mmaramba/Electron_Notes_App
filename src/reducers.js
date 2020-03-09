import { combineReducers } from 'redux'
import {
	REQUEST_LOGIN,
	RECEIVE_LOGIN_SUCCESS,
	RECEIVE_LOGIN_ERROR
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

const rootReducer = combineReducers({
	loginStatus
})

export default rootReducer