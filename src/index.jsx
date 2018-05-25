import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import Api from './services/api';

//custom components
import Main from './components/main';

import createPlaylistReducer from './components/create-playlist/reducer';
import dashboardReducer from './components/dashboard/reducer';
import importPlaylistsReducer from './components/import-playlists/reducer';
import mainReducer from './components/main/reducer';
import songsReducer from './components/songs/reducer';

const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const rootReducer = combineReducers({
	createPlaylist: createPlaylistReducer,
	dashboard: dashboardReducer,
	importPlaylists: importPlaylistsReducer,
	main: mainReducer,
	router: routerReducer,
	songs: songsReducer
});

let currentUser;

(async() => {
	try {
		const { data } = await Api.get('user');
		currentUser = data;
	} catch (error) {
		currentUser = null;
	}

	const store = createStore(rootReducer,
		{ 
			main: { 
				authenticated: !!currentUser, 
				currentUser,
				importQueue: [JSON.parse('{"albumName":"Pray For Me (with Kendrick Lamar)","artistName":"The Weeknd","duration":{"friendly":"3:31","ms":211440},"id":"6ZNo7Vi0TE9ul1fhKd4S1M","imageUrl":"https://i.scdn.co/image/58f537e877808ee72fd13b854aa46d5a6d643cf6","name":"Pray For Me (with Kendrick Lamar)","previewUrl":null,"mode":1,"speechiness":0.0871,"acousticness":0.092,"instrumentalness":0.0000212,"liveness":0.104,"type":"audio_features","uri":"spotify:track:6ZNo7Vi0TE9ul1fhKd4S1M","track_href":"https://api.spotify.com/v1/tracks/6ZNo7Vi0TE9ul1fhKd4S1M","analysis_url":"https://api.spotify.com/v1/audio-analysis/6ZNo7Vi0TE9ul1fhKd4S1M","duration_ms":211440,"danceability":7.3,"energy":6.7,"key":"D","loudness":-5,"tags": { "aBoolTag": true, "aNumberTag": 5 },"tempo":100.6,"timeSignature":"4/4","valence":1.7}')],
				selectedSong: JSON.parse('{"albumName":"Pray For Me (with Kendrick Lamar)","artistName":"The Weeknd","duration":{"friendly":"3:31","ms":211440},"id":"6ZNo7Vi0TE9ul1fhKd4S1M","imageUrl":"https://i.scdn.co/image/58f537e877808ee72fd13b854aa46d5a6d643cf6","name":"Pray For Me (with Kendrick Lamar)","previewUrl":null,"mode":1,"speechiness":0.0871,"acousticness":0.092,"instrumentalness":0.0000212,"liveness":0.104,"type":"audio_features","uri":"spotify:track:6ZNo7Vi0TE9ul1fhKd4S1M","track_href":"https://api.spotify.com/v1/tracks/6ZNo7Vi0TE9ul1fhKd4S1M","analysis_url":"https://api.spotify.com/v1/audio-analysis/6ZNo7Vi0TE9ul1fhKd4S1M","duration_ms":211440,"danceability":7.3,"energy":6.7,"key":"D","loudness":-5,"tags": { "aBoolTag": true, "aNumberTag": 5 },"tempo":100.6,"timeSignature":"4/4","valence":1.7}')
			}, 
			songs: { 
				songs: (currentUser && currentUser.Songs) || [],
				query: {
					include: {
						tags: [],
						params: []
					},
					exclude: {
						tags: [],
						params: []
					}
				}
			}
		},
		applyMiddleware(thunk, historyMiddleware)
	);

	render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Main />
			</ConnectedRouter>
		</Provider>, 
		document.getElementById('app')
	);
})();