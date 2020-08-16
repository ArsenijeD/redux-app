import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import Header from './components/Header/Header';
import PanelPlaceholder from './components/PanelPlaceholder/PanelPlaceholder';
import SearchBar from './containers/SearchBar/SearchBar';


class App extends Component {
  render() {
    let panels = null;

    if (this.props.dataLoaded) {
      panels = (
        <div className="row panels-row justify-content-around">
          <div className="col-2 panels-col" >
            <PanelPlaceholder title="Developers List"></PanelPlaceholder>
          </div>
          <div className="col-3 panels-col" >
            <PanelPlaceholder title="Developers Contribution"></PanelPlaceholder>
          </div>
          <div className="col-2 panels-col" >
            <PanelPlaceholder title="Selected Commit"></PanelPlaceholder>
          </div>
          <div className="col-3 panels-col" >
            <PanelPlaceholder title="Commits Graph"></PanelPlaceholder>
          </div>
        </div>
      );
    }
    
    return (
      <div className="root-container">
        <Header />
        <div className="container-fluid">
          <div className="row search-bar-row justify-content-center align-items-center">
            <SearchBar></SearchBar>
          </div>
          {panels}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      dataLoaded: state.flags.dataLoaded
  }
};

export default connect(mapStateToProps)(App);
