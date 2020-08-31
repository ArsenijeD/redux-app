import { createSelector } from 'reselect';

//createSelector is used to create memorized methods for getting parts of the state 
//method is called only if arguments (in this case fragments) have changed

const getDevelopers = state => {
    return state.normalizedSlice.entities.developers;
}

const getCommits = state => {
    return state.normalizedSlice.entities.commits;
}

const getResult = state => {
    return state.normalizedSlice.result;
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

export const getCommitsPerActiveDevelopers = createSelector(
    getActiveDevelopersNames,
    getCommits,
    getResult,
    (activeDevelopersNames, commits, result) => {
        // eslint-disable-next-line
        let commitsPerActiveDevelopers = activeDevelopersNames.reduce((a, b)=> (a[b] = 0, a), {});
        activeDevelopersNames.forEach(activeDevelopersName => {
            result.forEach(sha => {
                if (commits[sha].developer === activeDevelopersName) {
                    commitsPerActiveDevelopers[activeDevelopersName]+= 1;
                }
            })
        });
        return commitsPerActiveDevelopers;
    }
);

export const getActiveCommits = createSelector(
    getCommits,
    getActiveDevelopersNames,
    (commits, activeDevelopersNames) => {
        // eslint-disable-next-line
        return Object.values(commits).filter(commit => {
            if (!commits[commit.sha].removed && activeDevelopersNames.includes(commit.developer)) {
                return commit;
            } 
        });
    }
);

export const getSelectedCommit = createSelector(
    getCommits,
    commits => {
        const selectedCommit = Object.values(commits).find(commit => { return commit.selected });
        return selectedCommit ? selectedCommit : {};
    }
);

export const getNonParentsForSelectedCommit = createSelector(
    getSelectedCommit,
    getResult,
    (selectedCommit, result) => {
        // eslint-disable-next-line
        return result.filter(commitSha => {
            if (selectedCommit.sha && !selectedCommit.parents.includes(commitSha) && selectedCommit.sha !== commitSha) {
                return commitSha;
            }
        })
    }
);