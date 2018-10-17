import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import queryString from "query-string";

class App extends Component {
  super(props) {
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    //Testing api works
    let data = axios('/foodApi')
      .then(data => this.setState({ data: data.data }));
  }

  componentWillMount() {
    var query = queryString.parse(this.props.location.search);

    if (query.code) {
      window.localStorage.setItem("jwt", query.code);
      this.props.history.push("/");
    }
  }
  
  render() {
    let data = this.state;
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" /><br></br>
        </header>
      </div>
    );
  }
}

export default App;
