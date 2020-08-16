import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility.js';

const initialState = {
    dataLoaded: false,
    showSearchBarProgress: false
}

const reducer = ( state = initialState, action) => {
    switch ( action.type) {
        case actionTypes.SHOW_SEARCH_BAR_PROGRESS: return updateObject(state, { showSearchBarProgress: !state.showSearchBarProgress });
        case actionTypes.SET_DATA_LOADED: return updateObject(state, { dataLoaded: true });
        default: return state;
    }
}

export default reducer;