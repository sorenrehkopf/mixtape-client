import {
	SELECT_MIX
} from './types';

import { push, go } from 'react-router-redux';

import Api from '_/services/api';

const selectMix = mix => async(dispatch, getState) => {
	dispatch({ type: SELECT_MIX, payload: { mix } });

	if (mix) {
		dispatch(push('/mixes/editMix'));
	} else {
		dispatch(go(-1));
	}
};

export default selectMix;