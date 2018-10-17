import React, { Component } from 'react';
import logo from '../logo.svg';
import axios from 'axios';
import queryString from "query-string";

class Login extends Component {
  super(props) {
    this.state = {
      data: null,
      jwt: null
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
    else {
      // this.setState({ jwt: localStorage.getItem('jwt') })
    }
  }

  showLoginButton() {
    // if (this.state.jwt==null) {
      return (
        <div><a href="http://localhost:5000/auth/facebook">
          <img src='https://comedydefensivedriving.com/images2011/fb-sign-in-button.png' /></a></div>
      )
    // }
  }

  render() {
    let data = this.state;
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" /><br></br>
        </header>
          {this.showLoginButton()}
      </div>
    );
  }
}

export default Login;
