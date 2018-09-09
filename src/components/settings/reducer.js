import {
	SAVE_USER_SETTINGS_START,
	SAVE_USER_SETTINGS_FINISH
} from './actions/types';

const initialState = {
	songs: [],
};

const settingsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SAVE_USER_SETTINGS_START:
			return {
				...state,
				loading: true
			}
		case SAVE_USER_SETTINGS_FINISH:
			return {
				...state,
				loading: false,
				saveSucceeded: !payload.error,
				saveFailed: !!payload.error
			}
		default: 
			return state;
	}
};

export default settingsReducer;