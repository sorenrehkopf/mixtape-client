import {
	DELETE_SONG_START,
	DELETE_SONG_FINISH
} from './types';

import {
	SLOW_IMPORT_FINISH
} from '_/components/import-playlists/actions/types';

import Api from '_/services/api';

import selectSong from '_/components/dashboard/actions/select-song';

const addSong = () => async(dispatch, getState) => {	
	const { main: { selectedSong, importQueue } } = getState();
	dispatch({ type: DELETE_SONG_START });

	if (window.confirm('Delete? Are you sure?')) {
		try {
			await Api.delete(`songs/${selectedSong.id}`);

			dispatch({ type: DELETE_SONG_FINISH });

			if (importQueue[0] && selectedSong.spotifyId == importQueue[0].spotifyId) {
				importQueue.shift();
			}

			const nextSong = importQueue[0];
			
			dispatch(selectSong(nextSong, true));
			
			dispatch({ type: SLOW_IMPORT_FINISH, payload: { tracks: importQueue } });
		} catch(error) {
			dispatch({ type: DELETE_SONG_FINISH, error });
		}
	}
};

export default addSong;