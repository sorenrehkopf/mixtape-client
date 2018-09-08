import {
	SAVE_USER_SETTINGS_START,
	SAVE_USER_SETTINGS_FINISH
} from './types';

import Api from '_/services/api';

const saveUserSettings = () => async(dispatch, getState) => {
	const { main: { currentUser: { settings } } } = getState();

	dispatch({ type: SAVE_USER_SETTINGS_START });

	await Api.post('user/settings', { settings });

	dispatch({ type: SAVE_USER_SETTINGS_FINISH, payload: {} });
};

export default saveUserSettings;