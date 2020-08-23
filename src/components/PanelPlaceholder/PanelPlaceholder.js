import React from 'react';
import Card from 'react-bootstrap/Card';

const panelPlaceholder = (props) => {
    return (
        <Card style={{ height: '100%'}} border="primary" className="card text-left row">
            <Card.Header as="h5" className="bg-primary text-white">
                {props.title}
            </Card.Header>
            <Card.Body className="row justify-content-center align-items-top">
                {props.children}
            </Card.Body>
        </Card>
    );
}

export default panelPlaceholder;