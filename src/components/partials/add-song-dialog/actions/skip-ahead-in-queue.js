import {
	SLOW_IMPORT_FINISH
} from '_/components/import-playlists/actions/types';

import { convertBasicSongInfoFromSpotify } from '_/services/transform-song-data';

import selectSong from '_/components/dashboard/actions/select-song';

const skipAheadInQueue = (n) => async(dispatch, getState) => {
	const { main: { importQueue } } = getState();
	
	importQueue.splice(0, n);

	const nextSong = importQueue[0];
	
	dispatch(selectSong(nextSong, true));
	
	dispatch({ type: SLOW_IMPORT_FINISH, payload: { tracks: importQueue } });
};

export default skipAheadInQueue;