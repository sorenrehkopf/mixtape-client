import {
	UPDATE_USER_SETTINGS
} from './types';

const updateUserSettings = data => (dispatch, getState) => {
	console.log('updating', data);
	dispatch({ type: UPDATE_USER_SETTINGS, payload: data });
};

export default updateUserSettings;