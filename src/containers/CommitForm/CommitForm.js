import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import './CommitForm.css';

class CommitForm extends Component {

    render() {
        //TODO: Replace current dropdown with React Bootstrap Component
        return (
            <Form className="commit-form">
                <Form.Group>
                    <Form.Label>SHA: </Form.Label>
                    <Form.Control type="text" id="shaInput" disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Message: </Form.Label>
                    <Form.Control type="text" id="messageInput" disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Developer: </Form.Label>
                    <select id="developerInput" className="form-control">
                        <option hidden></option>
                        <option>First Option</option>
                    </select>
                </Form.Group>
                <Form.Group className="parents-group">
                    <Form.Label>Parents: </Form.Label>
                    <div className="row justify-content-end list-groups-row">
                        <ListGroup className="col-5 parents-list">
                            <ListGroup.Item className="list-group-item" action href="#/">
                            ddd
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item" action href="#/">
                                ddd
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item" action href="#/">
                            ddd
                            </ListGroup.Item>

                            <ListGroup.Item className="list-group-item" action href="#/">
                            ddd
                            </ListGroup.Item>

                            <ListGroup.Item className="list-group-item" action href="#/">
                            ddd
                            </ListGroup.Item>

                        </ListGroup>
                        <ListGroup className="col-5 non-parents-list">
                            <ListGroup.Item className="list-group-item" action href="#/">
                            ddd
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item" action href="#/">
                            ddd
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item" action href="#/">
                            ddd
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item" action href="#/">
                            ddd
                            </ListGroup.Item>

                            <ListGroup.Item className="list-group-item" action href="#/">
                            ddd
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                    {/* <div className="row justify-content-center list-groups-row align-items-center">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">No parents currently..</div>
                    </div> */}
                </Form.Group>
                <div className="row justify-content-end button-div align-items-end">
                    <Button variant="secondary" type="button">Remove</Button>
                </div>
            </Form>
        );
    }
}

export default CommitForm;