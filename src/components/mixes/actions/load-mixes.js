import {
	LOAD_MIXES_START,
	LOAD_MIXES_FINISH
} from './types';

import Api from '_/services/api';

const loadMixes = () => async(dispatch, getState) => {
	dispatch({ type: LOAD_MIXES_START });

	try {
		const { data: { mixes } } = await Api.get('mixes');
		
		dispatch({ type: LOAD_MIXES_FINISH, payload: { mixes } });
	} catch(error) {
		dispatch({ type: LOAD_MIXES_FINISH, payload: { error } });
	}
}

export default loadMixes;
