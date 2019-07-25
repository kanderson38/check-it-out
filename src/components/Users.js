import React, { Component } from 'react';
import firebase from '../firebaseConfig.js';

import './Users.css';
import UserItem from './UserItem.js';

class Users extends Component {
  
  constructor (props) {
    super(props);

    this.state = {
      users: [];
    }
  }

  componentDidMount () {
    
  }

  render () {
    return (
      <div className="users-container">
        Users
      </div>
    );
  }
}

export default Users;