import { createSelector } from 'reselect';

//createSelector is used to create memorized methods for getting parts of the state 
//method is called only if arguments (in this case fragments) have changed

const getDevelopers = state => {
    return state.normalizedSlice.entities.developers;
}

export const getActiveDevelopersNames = createSelector(
    getDevelopers,
    (developers) => {
        return Object.keys(developers).filter(name => {
            if(!developers[name].removed)
                return name;
            else 
                return undefined;
        });
    }
);

export const getRemovedDevelopersNames = createSelector(
    getDevelopers,
    (developers) => {
        return Object.keys(developers).filter(name => {
            if(developers[name].removed)
                return name;
            else 
                return undefined;
        });
    }
);