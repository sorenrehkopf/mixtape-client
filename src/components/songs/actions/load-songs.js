import {
	LOAD_SONGS_START,
	LOAD_SONGS_FINISH
} from './types';

import Api from '_/services/api';

const loadSongs = () => async(dispatch, getState) => {
	dispatch({ type: LOAD_SONGS_START });

	const { data: { songs }} = await Api.get('songs');
	const payload = { songs };
	
	dispatch({ type: LOAD_SONGS_FINISH, payload });
}

export default loadSongs;
