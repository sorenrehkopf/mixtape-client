import {
	LOAD_SONGS_START,
	LOAD_SONGS_FINISH
} from './types';

import Api from '_/services/api';

const loadSongs = lastResult => async(dispatch, getState) => {
	dispatch({ type: LOAD_SONGS_START });

	const before = lastResult ? lastResult.id : '';
	const { data: { songs }} = await Api.get(`songs?before=${before}`);
	const payload = { songs };
	
	dispatch({ type: LOAD_SONGS_FINISH, payload });
}

export default loadSongs;
