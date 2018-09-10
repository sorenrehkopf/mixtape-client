import {
	DELETE_MIX_START,
	DELETE_MIX_FINISH,
	LOAD_MIXES_START,
	LOAD_MIXES_FINISH,
	SAVE_MIX_START,
	SAVE_MIX_FINISH,
	SELECT_MIX,
	UPDATE_SELECTED_MIX,
	USE_MIX
} from './actions/types'

const initialState = {};

const mixesReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case DELETE_MIX_FINISH:
			return {
				...state,
				selectedMix: null
			}
		case LOAD_MIXES_START:
			return {
				...state,
				loading: true
			}
		case LOAD_MIXES_FINISH:
			return {
				...state,
				loading: false,
				mixes: payload.mixes || []
			}
		case SELECT_MIX:
			return {
				...state,
				selectedMix: payload.mix
			}
		case UPDATE_SELECTED_MIX:
			return {
				...state,
				selectedMix: {
					...state.selectedMix,
					...payload.update
				}
			}
		case USE_MIX:
			return {
				...state,
				selectedMix: null
			}
		case SAVE_MIX_FINISH:
			return {
				...state,
				selectedMix: null,
				mixes: [
					...[payload.selectedMix]
						.filter(mix => !state.mixes.some(({ id }) => mix.id == id)), 
					...state.mixes
					]
			}
		default: 
			return state;
	}
};

export default mixesReducer;