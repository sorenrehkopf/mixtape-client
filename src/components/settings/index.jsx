import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import style from './style';

import Form from '_/components/partials/form';

import updateUserSettings from './actions/update-user-settings';
import saveUserSettings from './actions/save-user-settings';
import logout from'_/components/authenticated/actions/logout';

class Settings extends Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		const { settings } = this.props;

		this.setState({
			originalSettings: { ...settings }
		});
	}

	get hasChanged() {
		const { props, state } = this;
		const { originalSettings } = state;
		const { settings } = this.props;

		return !isEqual(settings, originalSettings);
	}

	render() {
		const { props, hasChanged } = this;
		const { logout, settings, saveUserSettings, saveFailed, saveSucceeded, updateUserSettings } = props;
		const { dontSaveAddedSongs, defaultPlaylistName } = settings;
		console.log('props!', hasChanged, dontSaveAddedSongs, saveFailed, saveSucceeded)

		return (
			<div>
				<h1>Settings</h1>
				<Form className="pure-form pure-form-stacked" onChange={updateUserSettings}>
					<label className={style.form_label}>Default playlist name - </label>
					<input
						type="text"
						className={`pure-input`}
						name="defaultPlaylistName"
						value={defaultPlaylistName}
						onChange={() => null}
					/>
					<br/>
					<label className={`pure-checkbox`}>
						<input
							type="checkbox"
							name="dontSaveAddedSongs"
							checked={!dontSaveAddedSongs}
							value={dontSaveAddedSongs}
							onChange={() => null}
						/>
						<span> Save Added Songs to Your Spotify Song Collection</span>
					</label>
				</Form>
				<div className={style.buttons}>
					<button className={style.submit_button} disabled={!hasChanged} onClick={saveUserSettings}>Update Settings!</button>
					<button className={style.logout_button} onClick={logout}>
						<i className="fas fa-sign-out-alt"></i> Logout
					</button>
				</div>
				<p>
					{saveSucceeded && 'Settings Saved'}
					{saveFailed && 'Something went wrong while saving your settings...'}
				</p>
			</div>
		)
	}
}

const mapStateToProps = ({
	main: {
		currentUser: { settings } 
	},
	settings: {
		saveFailed,
		saveSucceeded
	}  
}) => ({
	saveFailed,
	saveSucceeded,
	settings: {
		...settings,
		dontSaveAddedSongs: settings.dontSaveAddedSongs || false,
		defaultPlaylistName: settings.defaultPlaylistName || 'My Mixtape'
	}
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout()),
	updateUserSettings: ({ formData: data }) => dispatch(updateUserSettings(data)),
	saveUserSettings: () => dispatch(saveUserSettings())
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);