import React, { Component } from 'react';
import firebase from '../firebaseConfig.js';

import './Users.css';
import UserItem from './UserItem.js';

class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    const allUsers = this.state.users;
    const db = firebase.firestore().collection("users")
    db.get().then((querySnapshot) => {

      querySnapshot.forEach((doc) => {

        allUsers.push({
          name: doc.data().name,
          email: doc.data().email,
        });
      });

      const userItems = this.mapUsers(allUsers);

      this.setState({
        users: userItems,
      });
    });
  }

  mapUsers = (users) => {
    return users.map((user) => {
      return <UserItem
        key={user.email}
        id={user.email}
        name={user.name}
        email={user.email} />
    })
  }

  render() {
    console.log(this.state.users.length);
    if (this.state.users.length > 0) {
      return (<div>
        <div className="users-header">Select a user to see her/his recommendation requests and the books she/he has added to the library.</div>
        <div className="users-container">
          {this.state.users}
        </div>
      </div>
      );
    } else {
      return (null);
    }
  }
}

export default Users;