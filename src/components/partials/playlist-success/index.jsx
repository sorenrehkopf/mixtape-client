import React, { Component } from 'react';
import style from './style';

import Api from '_/services/api';

class PlaylistSuccess extends Component {
	play = () => {
		const { playlist: { uri } } = this.props
		Api.put('spotify/play', { uri });
	}

	get height() {
		return window.innerHeight > 800 ? 600 : 380;
	}

	get width() {
		return window.innerWidth > 800 ? 500 : 300;
	}

	get currentMSKey() {
		return Date.now();
	}

	render() {
		const { 
			currentMSKey,
			play,
			props: {
				clearCreatedPlaylist,
				playlist: {
					external_urls: {
						spotify: viewUrl
					},
					uri,
					name,
					description
				},
				saveMix
			},
			refs: {
				player
			},
			height,
			width
		} = this;

		return(
			<div>
				<p>Your playlist <em><strong>{name}</strong></em> was successfully created.</p>
				<p>Description: <em>{description}</em></p>
				<iframe
					ref="player"
					src={`https://open.spotify.com/embed?uri=${uri}&timestamp=${currentMSKey}`} 
					width={width} 
					height={height}
					frameBorder="0"
					allowtransparency="true"
					allow="encrypted-media">
				</iframe>
				<br/>
				<button className={`${style.button} ${style.clear}`} onClick={saveMix}>
					<i className="far fa-star"/>
					<span>Save This Mix</span>
				</button>
				<button className={`${style.button} ${style.clear}`} onClick={clearCreatedPlaylist}>
					<i className="fas fa-sync"/>
					<span>Make Another</span>
				</button>
			</div>
		)
	}
}

export default PlaylistSuccess;