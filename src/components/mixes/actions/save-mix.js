import {
	SAVE_MIX_START,
	SAVE_MIX_FINISH
} from './types';

import { go } from 'react-router-redux';

import Api from '_/services/api';


const saveMix = () => async(dispatch, getState) => {
	const { mixes: { selectedMix } } = getState();

	dispatch({ type: SAVE_MIX_START });

	try {
		if (selectedMix.id) {
			await Api.put('mixes', selectedMix);
		} else {
			await Api.post('mixes', selectedMix);
		}
		dispatch({ type: SAVE_MIX_FINISH, payload: { selectedMix } });
		dispatch(go(-1));
	} catch(error) {
		dispatch({ type: SAVE_MIX_FINISH, payload: { error } });
	}
};

export default saveMix;