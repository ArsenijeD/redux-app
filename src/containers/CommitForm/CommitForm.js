import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { connect } from 'react-redux';

import './CommitForm.css';
import { getSelectedCommit, getActiveDevelopersNames, getNonParentsForSelectedCommit } from '../../store/selectors/selectors';
import * as actionCreators from './../../store/actions/index';


class CommitForm extends Component {

    render() {
        //TODO: Replace current dropdown with React Bootstrap Component

        const formDisabled = !this.props.selectedCommit.sha;
        let parentsPanel = null;
        let progress = null;

        if (!formDisabled) {
            parentsPanel = (
                <div className="row justify-content-end list-groups-row">
                    <ListGroup className="col-5 parents-list">
                        {
                            this.props.selectedCommit.parents.map(parent => {
                                return (
                                    <ListGroup.Item key={parent} className="list-group-item" action href="#/" onClick={() => this.props.onParentClick(this.props.selectedCommit.sha, parent)}>
                                        {parent.substring(0, 2)}..
                                    </ListGroup.Item>
                                );
                            })
                        }
                    </ListGroup>
                    <ListGroup className="col-5 non-parents-list">
                    {
                        this.props.nonParents.map(nonParent => {
                            return (
                                <ListGroup.Item key={nonParent} className="list-group-item" action href="#/" onClick={() => this.props.onNonParentClick(this.props.selectedCommit.sha, nonParent)}>
                                    {nonParent.substring(0, 2)}..
                                </ListGroup.Item>
                            );
                        })
                    }
                    </ListGroup>
                </div>
            );
        } else {
            progress = (
                <div className="progress-div row justify-content-center list-groups-row align-items-center">
                    <ProgressBar className="progress-bar progress-bar-striped progress-bar-animated" now={100}>No parents currently...</ProgressBar>
                </div>
            );
        }
        return (
            <Form className="commit-form">
                <Form.Group>
                    <Form.Label>SHA: </Form.Label>
                    <Form.Control type="text" id="shaInput" disabled value ={this.props.selectedCommit.sha || ''}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Message: </Form.Label>
                    <Form.Control type="text" id="messageInput"disabled  value ={this.props.selectedCommit.message || ''}  />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Developer: </Form.Label>
                    <select id="developerInput" className="form-control" disabled={formDisabled} value ={this.props.selectedCommit.sha ? this.props.selectedCommit.developer : ''} onChange={(event) => this.props.onDeveloperChange(event.target.value, this.props.selectedCommit.sha)}>
                        <option hidden></option>
                        {
                            this.props.activeDevelopersNames.map(activeDeveloperName => {
                                return (
                                    <option key={activeDeveloperName}>{activeDeveloperName}</option>
                                );
                            })
                        }
                    </select>
                </Form.Group>
                <Form.Group className="parents-group">
                    <Form.Label>Parents: </Form.Label>
                    {parentsPanel}
                    {progress}
                </Form.Group>
                <div className="row justify-content-end button-div align-items-end">
                    <Button variant="secondary" type="button" disabled={formDisabled} onClick={() => this.props.onRemoveClick(this.props.selectedCommit.sha)}>Remove</Button>
                </div>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedCommit: getSelectedCommit(state),
        activeDevelopersNames: getActiveDevelopersNames(state),
        nonParents: getNonParentsForSelectedCommit(state)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onDeveloperChange: (newDeveloper, sha) => dispatch(actionCreators.changeCommitsDeveloper(newDeveloper, sha)),
        onNonParentClick: (selectedCommitSha, nonParentSha) => dispatch(actionCreators.addParent(selectedCommitSha, nonParentSha)),
        onParentClick: (selectedCommitSha, parentSha) => dispatch(actionCreators.removeParent(selectedCommitSha, parentSha)),
        onRemoveClick: (sha) => {
            dispatch(actionCreators.setCommitAsRemoved(sha));
            dispatch(actionCreators.changeCommitSelectedSatus(sha));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitForm);