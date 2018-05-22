import {
	UPDATE_SONG_DATA
} from './types';

const updateSongData = (update) => (dispatch, getState) => {
	const keys = Object.keys(update);
	const keyWithHash = keys.find(key => key.startsWith('#'));

	if (keyWithHash) {
		const { main: { selectedSong: { tags } } } = getState();
		const tagKey = keyWithHash.substr(1);

		update = {
			tags: {
				...tags,
				[tagKey]: update[keyWithHash]
			}
		}
		console.log(update);
	};
	dispatch({ type: UPDATE_SONG_DATA, payload: { update }});
};

export default updateSongData;