import {
	UPDATE_SELECTED_MIX,
} from './types';

import Api from '_/services/api';

const saveUserSettings = update => (dispatch, getState) => {
	dispatch({ type: UPDATE_SELECTED_MIX, payload: { update } });
};

export default saveUserSettings;