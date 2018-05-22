import React, { Component } from 'react';
import style from './style';

import Api from '_/services/api';

class PlaylistSuccess extends Component {
	play = () => {
		const { playlist: { uri } } = this.props
		Api.put('spotify/play', { uri });
	}

	render() {
		console.log(this.props.playlist);
		const { 
			play,
			props: {
				clearCreatedPlaylist,
				playlist: {
					external_urls: {
						spotify: viewUrl
					},
					name
				}
			} 
		} = this;
		return(
			<div>
				<h2 className={style.success_header}>Success!</h2>
				<p>Your playlist <em><strong>{name}</strong></em> was successfully created.</p>
				<button className={style.button} onClick={play}>
					<i className="fas fa-play"/>
					<span>Play</span>
				</button>
				<a href={viewUrl} target="_blank">
					<button className={style.button}>
						<i className="fas fa-external-link-square-alt"/>
						<span>View</span>
					</button>
				</a>
				<button className={`${style.button} ${style.clear}`} onClick={clearCreatedPlaylist}>
					<i className="fas fa-sync"/>
					<span>Make Another</span>
				</button>
			</div>
		)
	}
}

export default PlaylistSuccess;