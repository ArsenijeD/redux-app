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
        //TODO: Consider using third-party library for managing immutability of the statte (currently is manually)
        case actionTypes.SET_ENTITIES: return updateObject(state, { entities: action.payload.entities, result: action.payload.result });
        case actionTypes.CHANGE_DEVELOPERS_STATUS: 
            return updateObject(...state, { 
                entities: {
                    ...state.entities,
                    developers: {
                        ...state.entities.developers,
                        [action.payload]: {
                            ...state.entities.developers[action.payload],
                            removed: !state.entities.developers[action.payload].removed
                        }
                    }
                }, 
                result: state.result
            });
        case actionTypes.CHANGE_COMMIT_SELECTED_STATUS:
            return updateObject(...state, {
                entities: {
                    ...state.entities,
                    commits: {
                        ...state.entities.commits,
                        [action.payload]: {
                            ...state.entities.commits[action.payload],
                            selected: !state.entities.commits[action.payload].selected
                        }
                    }
                }, 
                result: state.result
            });
        case actionTypes.CHANGE_COMMITS_DEVELOPER:
            return updateObject(...state, {
                entities: {
                    ...state.entities,
                    commits: {
                        ...state.entities.commits,
                        [action.payload.sha]: {
                            ...state.entities.commits[action.payload.sha],
                            developer: action.payload.newDeveloper
                        }
                    }
                }, 
                result: state.result
            });
        case actionTypes.ADD_PARENT:
            return updateObject(...state, {
                entities: {
                    ...state.entities,
                    commits: {
                        ...state.entities.commits,
                        [action.payload.commitSha]: {
                            ...state.entities.commits[action.payload.commitSha],
                            parents: [...state.entities.commits[action.payload.commitSha].parents, action.payload.newParentSha]
                        }
                    }
                }, 
                result: state.result
            });
        case actionTypes.REMOVE_PARENT:
            const index = state.entities.commits[action.payload.commitSha].parents.indexOf(action.payload.oldParentSha);
            return updateObject(...state, {
                entities: {
                    ...state.entities,
                    commits: {
                        ...state.entities.commits,
                        [action.payload.commitSha]: {
                            ...state.entities.commits[action.payload.commitSha],
                            parents: [...state.entities.commits[action.payload.commitSha].parents.slice(0, index), 
                                      ...state.entities.commits[action.payload.commitSha].parents.slice(index + 1)]
                        }
                    }
                }, 
                result: state.result
            });
        case actionTypes.SET_COMMIT_AS_REMOVED:
            return updateObject(...state, {
                entities: {
                    ...state.entities,
                    commits: {
                        ...state.entities.commits,
                        [action.payload]: {
                            ...state.entities.commits[action.payload],
                            removed: true
                        }
                    }
                }, 
                result: state.result
            });
        default: return state;
    }
}

export default reducer;