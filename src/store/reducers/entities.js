import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility.js';

const initialState = {
    entities: {
        commits: {},
        developers: {}
    },
    result: []
}

const reducer = ( state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.SET_ENTITIES: return updateObject(state, { entities: action.payload.entities, result: action.payload.result });
        default: return state;
    }
}

export default reducer;