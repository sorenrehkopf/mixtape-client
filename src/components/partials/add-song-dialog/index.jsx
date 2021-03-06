import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import Form from '_/components/partials/form';
import PreviewPlayer from '_/components/partials/preview-player';
import Tag from '_/components/partials/tag';
import Autocomplete from '_/components/partials/autocomplete';

import addSong from '_/components/dashboard/actions/add-song';
import deleteSong from '_/components/partials/add-song-dialog/actions/delete-song';
import updateSongData from '_/components/dashboard/actions/update-song-data';
import skipAheadInQueue from '_/components/partials/add-song-dialog/actions/skip-ahead-in-queue';

import style from './style';

import { songDataValues } from '_/services/get-collections';

class AddSongDialog extends Component {
	render() {
		const { addSong, addTag, deleteSong, importQueue, isSelectedSongNew, removeTag, selectedSong: { 
			albumName,
			artistName,
			duration,
			imageUrl,
			name,
			previewUrl,
			tags: songTags,
			...songData
		}, skipAheadInQueue, tags, updateSongData } = this.props;
		const defaultInputs = Object.keys(songDataValues).map(key => <Tag key={key} name={key} type={songDataValues[key].type} title={songDataValues[key].tip} value={songData[key]} />);
		const tagInputs = Object.keys(songTags).map(key => <Tag key={key} name={`#${key}`} type={typeof songTags[key] != 'boolean' ? 'number' : null} value={songTags[key]} remove={() => removeTag(key)} />);
		const inputs = [...defaultInputs, ...tagInputs];

		return(
			<div className={style.main}>
				<div className={style.header_info}>
					<h2 className={style.header}>Adding song</h2>
					<div className={style.queue_info}>
						<span className={style.queue_info_text}><strong>{importQueue.length} in queue</strong></span>
						{importQueue.length > 0 && (
							<span className={style.queue_skip_button} onClick={() => skipAheadInQueue(1)}> 
								skip 1<i className="fas fa-step-forward"/>
							</span>
						)}
						{importQueue.length > 10 && (
							<span className={style.queue_skip_button} onClick={() => skipAheadInQueue(10)}>
								skip 10<i className="fas fa-fast-forward"/>
							</span>
						)}
					</div>
				</div>
				<div className={style.info}>
					<span className={style.info__item}><em>{name}</em> <span>by</span> </span>
					<span className={`${style.info__item} ${style.small}`}>{artistName} <span>from</span> </span>
					<span className={style.info__item}><em>{albumName}</em></span>
					<br/>
					<br/>
					<div className={style.player_and_time}>
						<PreviewPlayer className={style.player} {...{ imageUrl, previewUrl} } />
						<span className={style.info__item}>{duration.friendly}</span>
					</div>
				</div>
				<p className={style.data_label}>Data: </p>
				<p className={style.disclaimer}><em>** Pre-populated values are taken from the availabile spotify audio analysis. They are by no means perfect. Please adjust.**</em></p>
				<Form id="add-song-form" onSubmit={addSong} onChange={updateSongData} className={`pure-form ${style.form}`}>
					<div className={style.input_group}>
						{inputs}
					</div>
				</Form>
				<Form className={`pure-form ${style.new_tag_form}`} onSubmit={addTag} clearOnSubmit={true}>
					<Autocomplete name="newTagName" className={`pure-input ${style.input}`} options={tags} />
					<div>
						<label className={`pure-checkbox ${style.tag_type_radio}`}>
							<input type="checkbox" name="newTagNumeric" />
							  Numeric
						</label>
					</div>
					<button className={`pure-button ${style.tag_button}`}><i className="fas fa-plus"/> add a tag!</button>
				</Form>
				<div className={style.actions}>
					<button form="add-song-form" type="submit" className={`pure-button ${style.button}`}>
						<i className="fas fa-plus"/>
						{isSelectedSongNew ? ' Add' : ' Update'} song!
					</button>
					{!isSelectedSongNew && (
						<button type="button" onClick={deleteSong} className={`pure-button ${style.delete_button}`}>
							<i className="fas fa-trash"/> <span className={style.delete_text}>delete!</span>
						</button>
					)}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ main: { currentUser: { Tags: tags }, isSelectedSongNew, selectedSong, importQueue } }) => ({
	importQueue,
	isSelectedSongNew,
	selectedSong,
	tags
});

const mapDispatchToProps = (dispatch) => ({
	addSong: () => dispatch(addSong()),
	deleteSong: () => dispatch(deleteSong()),
	addTag: ({ formData: { newTagName, newTagNumeric } }) => {
		const update = {};
		update[`#${newTagName}`] = newTagNumeric ? 5 : true;
		dispatch(updateSongData(update))
	},
	removeTag: tagName => {
		const update = {};
		update[`#${tagName}`] = false;
		dispatch(updateSongData(update))
	},
	skipAheadInQueue: n => dispatch(skipAheadInQueue(n)),
	updateSongData: ({ delta }) => dispatch(updateSongData(delta))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSongDialog);