import React, {Component} from 'react';
import './SearchBar.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar';

class SearchBar extends Component {

    state = {
        gitUsername: '',
        gitRepository: '',
        showProgress: false
    }

    gitUsernameHandler = (event) => {
        this.setState({gitUsername: event.target.value});
    }

    gitRepositoryHandler = (event) => {
        this.setState({gitRepository: event.target.value})
    }

    checkCommitsHandler = () => {
        this.setState({showProgress: true});
    }

    render() {
        let progress = null;

        if (this.state.showProgress) {
            progress = (
                <div className="progress row">
                    <ProgressBar className="progress-bar progress-bar-striped progress-bar-animated" now={100}>Loading...</ProgressBar>
                </div>
            );
        }

        return (
            <div className="col-6 search-bar-root-col">
                <div className="card search-bar-card row">
                    <div className="card-body row">
                        <Form className="form-inline container-fluid">
                            <Form.Group className="col-5">
                                <Form.Control placeholder="Enter GitHub Username" type="text" value={this.state.gitUsername} onChange={this.gitUsernameHandler} className="form-control col-12" id="username" />
                            </Form.Group>
                            <Form.Group className="col-5">
                                <Form.Control placeholder="Enter Repository Name" type="text" value={this.state.gitRepository} onChange={this.gitRepositoryHandler} className="form-control col-12" id="repository" />
                            </Form.Group>
                            <div className="col-2 submit">
                                <Button variant="primary" type="button" className="col-12" onClick={this.checkCommitsHandler} disabled={this.state.gitUsername.trim() === '' || this.state.gitRepository.trim() === ''}>Check</Button>
                            </div>
                        </Form>
                    </div>
                </div>
                {progress}
            </div>
        );
    }
}

export default SearchBar;