import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import axios from 'axios'

class Navbar extends Component {  
    render() {
        const loggedIn = this.props.loggedIn;
        //Conditional render of nav bar
        return (
            <header>
                {loggedIn ? ( 
                        <Link to="#" className="btn btn-link text-secondary" onClick={this.props.logout}>
                            <span className="text-secondary">logout</span></Link> 
                ) : (
                        <div>
                            <Link to="/" className="btn btn-link text-secondary">
                                <span className="text-secondary">home</span>
                            </Link>
                            &nbsp;|&nbsp;
                            <Link to="/login" className="btn btn-link text-secondary">
                                <span className="text-secondary">login</span>
                            </Link>
                        </div>
                    )}
            </header>
        );

    }
}

export default Navbar