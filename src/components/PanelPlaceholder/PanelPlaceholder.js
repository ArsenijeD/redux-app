import React from 'react';
import Card from 'react-bootstrap/Card';

const panelPlaceholder = (props) => {
    //TODO: Find solution for text-left and height 100% (not working currently)
    return (
        <Card border="primary" className="card text-left row">
            <Card.Header as="h5" className="bg-primary text-white">
                {props.title}
            </Card.Header>
            <Card.Body className="card-body row justify-content-center align-items-top">
                {props.children}
            </Card.Body>
        </Card>
    );
}

export default panelPlaceholder;