import React, { Component } from 'react';
import axios from 'axios';

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {username: 'john',password: 'password'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({[event.target.id]: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();

      axios.post('http://localhost:5000/login', this.state)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
        <label>
        username:
          <input type="text" id="username" value={this.state.username} onChange={this.handleChange} />
        </label>
          <label>
          password:
          <input type="password" id="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }


export default Form;