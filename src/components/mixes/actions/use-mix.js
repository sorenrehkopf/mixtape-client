import {
	USE_MIX
} from './types';

import { push, replace } from 'react-router-redux';

const useMix = ({ parameters }) => (dispatch, getState) => {
	const { mixes: { selectedMix } } = getState();	
	dispatch({ type: USE_MIX, payload: parameters } );

	if (selectedMix) {
		dispatch(replace('/create'))
	} else {
		dispatch(push('/create'));
	}
};

export default useMix;