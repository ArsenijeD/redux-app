import axios from 'axios';
import { normalize } from 'normalizr';

import * as actionTypes from './actionTypes';
import { commitCollectionSchema } from '../schemas/commitsSchema';
import { showSearchBarProgress, setDataLoaded } from './flags';

export const setEntitiesAsync = (gitUsername, gitRepository) => {
    return dispatch => {
        dispatch(showSearchBarProgress());
        axios.get('/repos/' + gitUsername + '/' + gitRepository + '/commits')
                    .then(response => {
                        dispatch(setDataLoaded());
                        dispatch(setEntities(response.data));
                    })
                    .catch(error => {
                        //TODO: Handle this
                    })
                    .finally(response => {
                        dispatch(showSearchBarProgress());
                    });
    };
};

export const setEntities = (entities) => {
    return {
        type: actionTypes.SET_ENTITIES,
        payload: normalize(entities, commitCollectionSchema)
    };
};

export const changeDevelopersStatus = (developersName) => {
    return {
        type: actionTypes.CHANGE_DEVELOPERS_STATUS,
        payload: developersName
    }
};

export const changeCommitSelectedSatus = (sha) => {
    return {
        type: actionTypes.CHANGE_COMMIT_SELECTED_STATUS,
        payload: sha
    }
};

export const changeCommitsDeveloper = (newDeveloper, sha) => {
    return {
        type: actionTypes.CHANGE_COMMITS_DEVELOPER,
        payload: {newDeveloper, sha}
    }
};