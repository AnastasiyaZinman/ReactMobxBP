import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
 import LoginForm from './components/login'
import Navbar from './components/navbar'
import Home from './components/home'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    } 
  }

  componentDidMount = ()=> {
    this.getUser()
  }

  updateUser = (userObject) =>{
    this.setState(userObject)
  }

  getUser = ()=>{
    axios.get('/user/', {
      headers: {
          'Authorization': "Bearer " + localStorage.getItem('token'),
      }
  }).then(response => { 
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ') 
        this.updateUser({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.updateUser({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  logout = (event)=>{
    event.preventDefault()
    axios.post('/user/logout').then(response => {
        if (response.status === 200) {
            this.updateUser({
                loggedIn: false,
                username: null
            })
            localStorage.setItem('token','');   
        }
    }).catch(error => {
        console.log('Logout error')
    })
}

  render() {
    return (
      <div className="App">
        <Navbar logout={this.logout} loggedIn={this.state.loggedIn} />  
        <Route exact path="/" component={Home} />
        <Route path="/login" render={() => <LoginForm updateUser={this.updateUser} />}/> 
      </div>
    );
  }
}

export default App;
