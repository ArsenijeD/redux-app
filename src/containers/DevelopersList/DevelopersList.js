import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { connect } from 'react-redux';

import './DevelopersList.css';
import { getActiveDevelopersNames, getRemovedDevelopersNames, getSelectedCommit} from './../../store/selectors/selectors';
import * as actionCreators from './../../store/actions/index';

class DevelopersList extends Component {
    
    render() {
        
        let activeDevelopersList = null;
        let removedDevelopersList = null;
        let delimiter = null;
        let activeDevelopersTitle = null;
        let removedDevelopersTitle = null;

        if (this.props.showActiveDevelopers) {
            activeDevelopersTitle = <Card.Title as="h6">Active:</Card.Title>;
            activeDevelopersList = (                    
                <div className="row active-developers-row" >
                    <div className="col-4">
                        {
                            this.props.activeDevelopersNames.map (developersName => {
                                return (
                                    <a href="#/" key={developersName} onClick={() => this.props.onActiveDeveloperClick(developersName)}>
                                        <Badge variant="primary">{developersName}</Badge>
                                    </a>
                                );
                            })
                        }
                    </div>
                </div>
            );
        }

        if (this.props.showRemovedDevelopers) {
            removedDevelopersTitle = <Card.Title as="h6">Removed:</Card.Title>;
            removedDevelopersList = (
                <div className="row removed-developers-row" >
                    <div className="col-4">
                        {
                            this.props.removedDevelopersNames.map(developersName => {
                                return (
                                    <a href="#/" key={developersName} onClick={() => this.props.onRemovedDeveloperClick(developersName, this.props.selectedCommit)}> 
                                        <Badge variant="secondary">{developersName}</Badge>
                                    </a>
                                );
                            })
                        }
                    </div>
                </div>
            );
        }

        if (this.props.showActiveDevelopers && this.props.showRemovedDevelopers) {
            delimiter = <hr className="delimiter"/>;
        }

        return (
            <div className="root-developers-list-containter">
                {activeDevelopersTitle}
                {activeDevelopersList}
                {delimiter}
                {removedDevelopersTitle}
                {removedDevelopersList}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeDevelopersNames: getActiveDevelopersNames(state),
        removedDevelopersNames: getRemovedDevelopersNames(state),
        showActiveDevelopers: getActiveDevelopersNames(state).length !== 0,
        showRemovedDevelopers: getRemovedDevelopersNames(state).length !== 0,
        selectedCommit: getSelectedCommit(state)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onActiveDeveloperClick: (developersName) => dispatch(actionCreators.changeDevelopersStatus(developersName)),
        onRemovedDeveloperClick: (developersName, selectedCommit) => {
            //TODO Fix bug: Deselect developer, but commit form is not fully cleaned
            if(developersName === selectedCommit.developer) {
                dispatch(actionCreators.changeCommitSelectedSatus(selectedCommit.sha));
            }
            dispatch(actionCreators.changeDevelopersStatus(developersName));

        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DevelopersList);