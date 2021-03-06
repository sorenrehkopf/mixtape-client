import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './style';

import QueryForm from '_/components/partials/query-form';
import Form from '_/components/partials/form';
import PlaylistSuccess from '_/components/partials/playlist-success';
import { defaultQueryFields } from '_/services/get-collections';

import createPlaylist from './actions/create-playlist';
import updatePlaylistData from './actions/update-playlist-data';
import clearCreatedPlaylist from './actions/clear-created-playlist';

import selectMix from '_/components/mixes/actions/select-mix';

class CreatePlaylist extends Component {
	render() {
		const {
			createPlaylist,
			createdPlaylist,
			clearCreatedPlaylist,
			loading,
			playlistData,
			saveMix,
			tags,
			updatePlaylistData
		} = this.props;
		const { name, recycle } = playlistData;
		const options = [...tags, ...defaultQueryFields];

		return(
			<div>
				<h1>Create A Playlist</h1>
				{!createdPlaylist && !loading && (<div>
					<h2 className={style.sub_header}>Playlist Details</h2>
					<Form className={`pure-form`} onChange={updatePlaylistData}>
						<label className={`pure-checkbox ${style.recycle_toggle}`}>
							<strong>Recycle</strong>
							<input className={style.recycle} type="checkbox" name="recycle" checked={recycle} value={recycle} onChange={() => null} />
							<p className={style.recycle_explanation}>**Recycle means that your default mixtape playlist will be used. If you haven't used this option yet then it will be created for you.**</p>
						</label>
						<label><strong>Name</strong></label>
						<br/>
						<input name="name" readOnly={recycle} value={name} type="text" className={`pure-input ${style.name_input}`} />
						<br/>
						<label><strong>Ordering</strong></label>
						<br/>
						<br/>
						<select name="order" type="text">
							<option value="shuffle">shuffle</option>
							<option value="oldest_first">oldest first</option>
							<option value="newest_first">newest first</option>
						</select>
						<br/>
					</Form>
					<h2 className={style.sub_header}>Song Criteria</h2>
					<QueryForm onSubmit={createPlaylist} onChange={updatePlaylistData} options={options} queryData={playlistData} tags={tags} submitText="Create!" />
				</div>)}
				{!loading && createdPlaylist ? 
					<PlaylistSuccess
						clearCreatedPlaylist={clearCreatedPlaylist}
						playlist={createdPlaylist}
						saveMix={() => saveMix({ parameters: playlistData })}
					/>
					: null
				}
				{loading && <p>loading...</p>}
			</div>
		)
	}
}

const mapStateToProps = ({ 
	main: {
		currentUser: {
			Tags: tags
		}
	},
	createPlaylist: {
		playlistData,
		createdPlaylist,
		loading
	}
}) =>({
	createdPlaylist,
	loading,
	playlistData,
	tags
});

const mapDispatchToProps = (dispatch) => ({
	createPlaylist: (data) => dispatch(createPlaylist(data)),
	clearCreatedPlaylist: () => dispatch(clearCreatedPlaylist()),
	saveMix: playlistData => dispatch(selectMix(playlistData)),
	updatePlaylistData: ({ formData: data }) => dispatch(updatePlaylistData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist);