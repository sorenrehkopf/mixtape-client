import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import Api from './services/api';
import ReduxBatchLogger from './services/redux-batch-logger';

//custom components
import Main from './components/main';

import createPlaylistReducer, { initialPlaylistState } from './components/create-playlist/reducer';
import dashboardReducer from './components/dashboard/reducer';
import importPlaylistsReducer from './components/import-playlists/reducer';
import mainReducer from './components/main/reducer';
import songsReducer from './components/songs/reducer';

const history = createHistory();
const historyMiddleware = routerMiddleware(history);
const loggerOptions = window.location.host == 'www.myxtape.io' ? { logger: new ReduxBatchLogger() } : {};
const loggerMiddleware = createLogger(loggerOptions);

const rootReducer = combineReducers({
	createPlaylist: createPlaylistReducer,
	dashboard: dashboardReducer,
	importPlaylists: importPlaylistsReducer,
	main: mainReducer,
	router: routerReducer,
	songs: songsReducer
});

(async() => {
	let currentUser;

	try {
		const { data } = await Api.get('user');
		currentUser = data;
	} catch (error) {
		currentUser = null;
	}

	if (loggerOptions.logger && currentUser) {
		loggerOptions.logger.setStaticData({
			userId: currentUser.id,
			userName: currentUser.displayName
		});
	}

	const store = createStore(rootReducer,
		{ 
			createPlaylist: initialPlaylistState,
			main: { 
				authenticated: !!currentUser, 
				currentUser,
				importQueue: []
			}, 
			songs: {
				query: {
					include: {
						tags: [],
						params: []
					},
					exclude: {
						tags: [],
						params: []
					}
				},
				songs: []
			}
		},
		applyMiddleware(thunk, historyMiddleware, loggerMiddleware)
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