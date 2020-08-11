import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import SearchBar from './containers/SearchBar/SearchBar';

class App extends Component {
  render() {
    return (
      <div className="root-container">
        <Header />
        <div className="container-fluid">
          <div className="row search-bar-row justify-content-center align-items-center">
            <SearchBar></SearchBar>
          </div>
          <div className="row panels-row justify-content-around">
              <div>First.</div>
              <div>Second.</div>
              <div>Third.</div>
              <div>Fourth.</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
