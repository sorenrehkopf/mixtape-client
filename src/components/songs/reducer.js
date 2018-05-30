import uniqBy from 'lodash/uniqBy';

import {
	CLEAR_SEARCH_RESULTS,
	LOAD_SONGS_START,
	LOAD_SONGS_FINISH,
	SEARCH_SONGS_FINISH,
	SEARCH_SONGS_START
} from './actions/types'

import {
	LOGIN_FINISH
} from '_/components/main/actions/types';

import {
	ADD_SONG_FINISH
} from '_/components/dashboard/actions/types';

import {
	QUICK_IMPORT_FINISH
} from '_/components/import-playlists/actions/types';

const initialState = {};

const songsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ADD_SONG_FINISH:
			return {
				...state,
				songs: [
					...[payload.addedSongData].filter(({ spotifyId }) => {
						return !state.songs.some(song => song.spotifyId == spotifyId);
					}),
					...state.songs
				]
			}
		case CLEAR_SEARCH_RESULTS:
			return {
				...state,
				search: false,
				queryResults: []
			}
		case LOAD_SONGS_START:
			return {
				...state,
				loading: true
			}
		case LOAD_SONGS_FINISH:
			return {
				...state,
				loading: false,
				loaded: true,
				songs: uniqBy([...state.songs, ...payload.songs], 'spotifyId')
			}
		case QUICK_IMPORT_FINISH:
			return {
				...state,
				songs: [
					...payload.songs,
					...state.songs
				]
			}
		case SEARCH_SONGS_START:
			return {
				...state,
				queryResults: [],
				search: true,
				loading: true	
			}
		case SEARCH_SONGS_FINISH:
			return {
				...state,
				loading: false,
				queryResults: payload.queryResults
			}
		default: 
			return state;
	}
};

export default songsReducer;