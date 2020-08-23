import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { connect } from 'react-redux';

import './DevelopersList.css';
import { getActiveDevelopersNames, getRemovedDevelopersNames} from './../../store/selectors/selectors';
import * as actionCreators from './../../store/actions/index';

class DevelopersList extends Component {
    render() {
        let activeDevelopersList = null;
        let removedDevelopersList = null;
        let delimiter = null;

        if (this.props.showActiveDevelopers) {
            activeDevelopersList = (
                <div>
                    <Card.Title as="h6">Active:</Card.Title>
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
                </div>
            );
        }

        if (this.props.showRemovedDevelopers) {
            removedDevelopersList = (
                <div>
                    <Card.Title as="h6">Removed:</Card.Title>
                    <div className="row removed-developers-row" >
                        <div className="col-4">
                            {
                                this.props.removedDevelopersNames.map(developersName => {
                                    return (
                                        <a href="#/" key={developersName} onClick={() => this.props.onRemovedDeveloperClick(developersName)}> 
                                            <Badge variant="secondary">{developersName}</Badge>
                                        </a>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            );
        }

        if (this.props.showActiveDevelopers && this.props.showRemovedDevelopers) {
            delimiter = (<hr/>);
        }

        return (
            <div className="root-developers-list-containter">
                {activeDevelopersList}
                {delimiter}
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
        showRemovedDevelopers: getRemovedDevelopersNames(state).length !== 0
    }
};

const mapDispatchToProps = dispatch => {
    return {
        //TODO: Add code for deselecting commit if user is removing developer whose commit is currently selected
        onActiveDeveloperClick: (developersName) => dispatch(actionCreators.changeDevelopersStatus(developersName)),
        onRemovedDeveloperClick: (developersName) => dispatch(actionCreators.changeDevelopersStatus(developersName))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DevelopersList);