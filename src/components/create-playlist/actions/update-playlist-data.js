import {
	UPDATE_PLAYLIST_DATA
} from './types';

const updatePlaylistData = (data) => async(dispatch, getState) => {
	dispatch({ type: UPDATE_PLAYLIST_DATA, payload: data });
};

export default updatePlaylistData;