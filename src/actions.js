import { CHANGE_SEARCH_FIELD, REQUEST_ROBOTS } from './actionTypes'
import { apiCall } from './api/api'

export const setSearchField = (text) => {
	return {
		type: CHANGE_SEARCH_FIELD,
		payload: text
	};
}

export const requestRobots = () => (dispatch) => {
	dispatch({ type: REQUEST_ROBOTS.PENDING });
	apiCall('https://jsonplaceholder.typicode.com/users')
		.then((users) => dispatch({
			type: REQUEST_ROBOTS.SUCCESS,
			payload: users
		}))
		.catch((error) => dispatch({
			type: REQUEST_ROBOTS.FAILED,
			payload: error
		}));
}