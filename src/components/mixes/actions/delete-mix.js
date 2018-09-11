import {
	DELETE_MIX_START,
	DELETE_MIX_FINISH
} from './types';

import { go } from 'react-router-redux';

import Api from '_/services/api';

const deleteMix = () => async(dispatch, getState) => {	
	const { mixes: { selectedMix } } = getState();
	dispatch({ type: DELETE_MIX_START });

	if (window.confirm('Delete? Are you sure?')) {
		try {
			await Api.delete(`mixes/${selectedMix.id}`);

			dispatch({ type: DELETE_MIX_FINISH });
			dispatch(go(-1));
		} catch(error) {
			dispatch({ type: DELETE_MIX_FINISH, error });
		}
	}
};

export default deleteMix;