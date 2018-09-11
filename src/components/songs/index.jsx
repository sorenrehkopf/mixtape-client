import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import ListItem from '_/components/partials/list-item';
import QueryForm from '_/components/partials/query-form';
import Modal from '_/components/partials/modal';
import Form from '_/components/partials/form';
import style from './style';

import clearSearchResults from './actions/clear-search-results';
import searchSongCollection from './actions/search-song-collection';
import selectSong from '_/components/dashboard/actions/select-song';
import loadSongs from '_/components/songs/actions/load-songs';

import { defaultQueryFields } from '_/services/get-collections';

class Songs extends Component {
	constructor() {
		super()
		this.state = {
			showSearchModal: false
		}
	}

	componentDidMount() {
		const { loadSongs, loaded } = this.props;

		if (!loaded) {
			loadSongs();
		}
	}

	async searchSongs(data) {
		const { searchSongs } = this.props;
		await searchSongs(data);
		this.toggleSearchModal();
	}

	toggleSearchModal() {
		this.setState({
			showSearchModal: !this.state.showSearchModal
		});
	}

	render() {
		const { 
			clearSearchResults,
			editSong,
			loaded,
			loading,
			loadSongs,
			navigate,
			queryResults,
			search,
			simpleSearch,
			selectSong,
			songs,
			tags,
			total
		} = this.props;
		const { showSearchModal } = this.state;
		const songsSource = search ? queryResults : songs;

		const songsList = songsSource.map(({
			albumName,
			artistName,
			durationFriendly,
			durationMs,
			imageUrl,
			name,
			previewUrl,
			spotifyId,
			tags,
			...rest
		}) => {
			const songData = { albumName,
				artistName,
				duration: { 
					friendly: durationFriendly,
					ms: durationMs 
				},
				spotifyId,
				imageUrl,
				name,
				previewUrl,
				tags,
				...rest
			};

			return (<ListItem key={spotifyId} songData={songData} onSelect={() => selectSong(songData) } iconName="edit" />);
		});

		const options = [...tags, ...defaultQueryFields];

		return(
			<div>
				<h1>Your Songs</h1>
				{total && <p>
					<span>{search ? queryResults.length : total} </span>
					<span>
						{search ? 
							' songs match that search' 
							: ' total songs in collection'
						}
					</span>
				</p>}
				<button className={`pure-button ${style.button}`} onClick={() => this.toggleSearchModal()}>Advanced Search</button>
				{search && <button className={`pure-button ${style.clear_button}`} onClick={clearSearchResults}>Clear search results</button>}
				<Form onChange={simpleSearch} className={`pure-form ${style.simple_search_form}`}>
					<input type="text" name="searchTerm" className={`pure-input-2-3 ${style.simple_input}`} placeholder="Simple Search (song, artist, or album name)"/>
				</Form>
				{showSearchModal && 
					<Modal onBackgroundClick={() => this.toggleSearchModal()}>
						<div className={style.query_form_container}>
							<h2 className={style.search_title}>Search your songs</h2>
							<QueryForm onSubmit={data => this.searchSongs(data)} options={options} tags={tags} />
						</div>
					</Modal>
				}
				<div>
					{!loaded && <p>loading...</p>}
					{songsList}
					{!search && loaded && (<div className={style.load_more_container}>
						<button className={`pure-button ${style.button} ${loading ? style.loading_button : ''}`} onClick={() => loadSongs(songs[songs.length - 1])}>Load More</button>
					</div>)}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ 
	songs: {
		loaded,
		loading,
		queryResults,
		search,
		songs,
		showSearchModal,
		total
	},
	main: {
		currentUser: {
			Tags: tags
		}
	} 
}) => ({
	loaded,
	loading,
	queryResults,
	search,
	songs,
	showSearchModal,
	tags: tags.map(tag => {
		tag.name = tag.name.toUpperCase();
		return tag;
	}),
	total
});

const mapDispatchToProps = (dispatch) => ({
	clearSearchResults: () => dispatch(clearSearchResults()),
	loadSongs: (song) => dispatch(loadSongs(song)),
	selectSong: (song) => dispatch(selectSong(song)),
	searchSongs: (data) => dispatch(searchSongCollection(data)),
	simpleSearch: debounce(({ formData: { searchTerm } }) => {
		if (searchTerm) {
			dispatch(searchSongCollection({
				include: {
					params: {
						"NAME": { type: 'loose_equivalence', value0: searchTerm },
						"ARTIST NAME": { type: 'loose_equivalence', value0: searchTerm },
						"ALBUM NAME": { type: 'loose_equivalence', value0: searchTerm }
					}, 
					tags: {}
				},
				exclude: { tags: {} }
			}));
		} else {
			dispatch(clearSearchResults())
		}
	}, 500)
});

export default connect(mapStateToProps, mapDispatchToProps)(Songs);