import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import QueryForm from '_/components/partials/query-form';
import MixItem from '_/components/partials/mix-item';
import Modal from '_/components/partials/modal';
import Form from '_/components/partials/form';
import style from './style';

import deleteMix from './actions/delete-mix';
import loadMixes from './actions/load-mixes';
import saveMix from './actions/save-mix';
import selectMix from './actions/select-mix';
import updateSelectedMix from './actions/update-selected-mix';
import useMix from './actions/use-mix';

import { defaultQueryFields } from '_/services/get-collections';

class Mixes extends Component {
	componentDidMount() {
		const { mixes, loadMixes } = this.props;

		if (!mixes) {
			loadMixes();
		}
	}

	render() {
		const {
			deleteMix,
			loading,
			mixes,
			saveMix,
			selectedMix,
			selectMix,
			tags,
			updateSelectedMix,
			useMix
		} = this.props;
		const options = [...tags, ...defaultQueryFields];
		const mixesList = mixes && mixes.map(
			mix => 
			<MixItem
				key={mix.id || mix.name}
				mix={mix}
				edit={() => selectMix(mix)}
				use={() => useMix(mix)}
			/>
		)

		return(
			<div>
				<h1>Your Mixes</h1>
				<button className={`pure-button ${style.button}`} onClick={() => selectMix({})}>Create A New Mix</button>
				<Route
					path="/mixes/editMix"
					render={() => selectedMix ? (
							<Modal onBackgroundClick={() => selectMix(null)}>
								<div className={style.query_form_container}>
									<h2 className={style.search_title}>{selectedMix.id ? 'Editing' : 'Adding'} a mix</h2>
									<Form className="pure-form" onChange={({ formData }) => updateSelectedMix(formData)}>
										<label>Name</label><br/>
										<input type="text" className="pure-input" name="name" value={selectedMix.name || ''} onChange={() => {}}></input>
									</Form>
									<QueryForm
										onSubmit={() => useMix(selectedMix)}
										onChange={({ formData: parameters }) => updateSelectedMix({ parameters })}
										options={options}
										queryData={selectedMix.parameters}
										submitText={'Use Mix'}
										tags={tags}
									/>
									<div className={style.buttons}>
										<button className={`pure-button ${style.button}`} onClick={saveMix}>
											Save
										</button>
										<button className={`pure-button ${style.delete_button}`} onClick={deleteMix}>
											<i className="fas fa-trash"/> <span className={style.delete_text}>delete!</span>
										</button>
									</div>
								</div>
							</Modal>
						) : null
					}
				/>
				<div className={style.mix_list}>
					{loading && <p>loading...</p>}
					{mixesList}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ 
	mixes: {
		loading,
		mixes,
		selectedMix
	},
	main: {
		currentUser: {
			Tags: tags
		}
	} 
}) => ({
	loading,
	mixes,
	selectedMix,
	tags: tags.map(tag => {
		tag.name = tag.name.toUpperCase();
		return tag;
	})
});

const mapDispatchToProps = (dispatch) => ({
	deleteMix: () => dispatch(deleteMix()),
	loadMixes: () => dispatch(loadMixes()),
	saveMix: data => dispatch(saveMix(data)),
	selectMix: mix => dispatch(selectMix(mix)),
	updateSelectedMix: data => dispatch(updateSelectedMix(data)),
	useMix: mix => dispatch(useMix(mix))
});

export default connect(mapStateToProps, mapDispatchToProps)(Mixes);