import {
	SELECT_SONG_START,
	SELECT_SONG_FINISH
} from './types';

import { push, go } from 'react-router-redux';

import Api from '_/services/api';
import { convertDBTags, convertFromSpotify } from '_/services/transform-song-data';

const selectSong = (songData, shouldLoad) => async(dispatch, getState) => {
	dispatch({ type: SELECT_SONG_START });
	const { router: { location } } = getState();
	console.log(location)
	const { pathname } = location;
	if (songData) {
		// if we don't need to load the data for this song than just set it directly
		if (!shouldLoad) {
			const selectedSong = {
				...songData,
				duration: {
					friendly: songData.durationFriendly,
					ms: songData.durationMs
				}
			};
			if (!/addSong/.test(pathname)) {
				// remove trailing forward slash from pathname if present
				dispatch(push(`${pathname.replace(/\/$/, '')}/addSong`))
			}
			return dispatch({ type: SELECT_SONG_FINISH, payload: { selectedSong: songData, isSelectedSongNew: false } });
		}

		const { spotifyId } = songData;
		const data = {
			include: { 
				params: { 
					spotifyId: {
						type: 'strict_equivalence',
						value0: spotifyId
					}
				},
				tags: {},
			},
			exclude: { params: {}, tags: {}}
		};
		
		let { data: { songs: [song] } } = await Api.get(`songs/search/${encodeURIComponent(JSON.stringify(data))}`);
		let payload;
		if (!song) {
			song = await Api.get(`spotify/song/${spotifyId}`).then(({ data: { song } }) => song);
			const transformedSongData = convertFromSpotify(song);
			
			payload = { selectedSong: { ...songData, ...transformedSongData }, isSelectedSongNew: true };
		} else {
			payload = { selectedSong: {
					...song,
					duration: {
						friendly: song.durationFriendly,
						ms: song.durationMs
					}
				},
				isSelectedSongNew: false
			};
		}

		dispatch({ type: SELECT_SONG_FINISH, payload });
		if (!/addSong/.test(pathname)) {
			dispatch(push(`${pathname.replace(/\/$/, '')}/addSong`))
		}
	} else {
		dispatch({ type: SELECT_SONG_FINISH, payload: { selectedSong: null } });
		if (/addSong/.test(pathname)) {
			dispatch(go(-1))
		}
	}
};

export default selectSong;