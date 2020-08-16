import * as actionTypes from './actionTypes';

export const showSearchBarProgress = () => {
    return {
        type: actionTypes.SHOW_SEARCH_BAR_PROGRESS
    };
};

export const setDataLoaded = () => {
    return {
        type: actionTypes.SET_DATA_LOADED
    };
};