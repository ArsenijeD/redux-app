import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const header = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#">GitHub Commits Visualizer</Navbar.Brand>
        </Navbar>
    );
}

export default header;