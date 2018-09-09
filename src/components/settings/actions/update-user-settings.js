import {
	UPDATE_USER_SETTINGS
} from './types';

const updateUserSettings = data => (dispatch, getState) => {
	dispatch({ type: UPDATE_USER_SETTINGS, payload: data });
};

export default updateUserSettings;