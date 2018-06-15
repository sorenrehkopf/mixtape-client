import {
	SELECT_SONG_START,
	SELECT_SONG_FINISH
} from './types';

import { push, go, replace } from 'react-router-redux';

import Api from '_/services/api';
import { convertDBTags, convertFromSpotify, convertBasicSongInfoFromSpotify } from '_/services/transform-song-data';

const selectSong = (songData, shouldLoad, isFromShare) => async(dispatch, getState) => {
	dispatch({ type: SELECT_SONG_START });
	const { router: { location }, main: { isSelectedSongFromShare } } = getState();
	const { pathname } = location;
	if (songData) {
		// if we don't need to load the data for this song than just set it directly
		if (!shouldLoad) {
			const selectedSong = {
				...songData,
				tags: convertDBTags(songData.tags),
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
					SPOTIFYID: {
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
			if (isFromShare) {
				const { song: songInfo, songData } = await Api.get(`spotify/songWithData/${spotifyId}`).then(({ data }) => data);
				const transformedSongInfo = convertBasicSongInfoFromSpotify(songInfo)
				const transformedSongData = convertFromSpotify(songData);

				payload = { selectedSong: { 
						...transformedSongInfo,
						...transformedSongData
					},
					isSelectedSongNew: true,
					isSelectedSongFromShare: true
				}
				dispatch(replace('/addSong'));
			} else {
				song = await Api.get(`spotify/songData/${spotifyId}`).then(({ data: { song } }) => song);
				const transformedSongData = convertFromSpotify(song);
				
				payload = { selectedSong: { ...songData, ...transformedSongData }, isSelectedSongNew: true };
			}
		} else {
			payload = { selectedSong: {
					...song,
					tags: convertDBTags(song.tags),
					duration: {
						friendly: song.durationFriendly,
						ms: song.durationMs
					}
				},
				isSelectedSongNew: false,
				isSelectedSongFromShare: isFromShare
			};
		}

		dispatch({ type: SELECT_SONG_FINISH, payload });
		if (!/addSong/.test(pathname)) {
			dispatch(push(`${pathname.replace(/\/$/, '')}/addSong`))
		}
	} else {
		dispatch({ type: SELECT_SONG_FINISH, payload: { selectedSong: null } });
		if (isSelectedSongFromShare) {
			// Todo: implement functionality to take user back to Spotify here.
		}
		
		if (/addSong/.test(pathname)) {
			dispatch(go(-1))
		}
	}
};

export default selectSong;