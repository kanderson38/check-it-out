import React, { Component } from 'react';
import firebase from '../firebaseConfig.js';

import './Users.css';
import UserItem from './UserItem.js';

class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      readyToRenderBooks: false,
      readyToRenderRequests: false,
    }
  }

  componentDidMount() {
    const allUsers = this.state.users;
    const db = firebase.firestore().collection("users")
    db.get().then((querySnapshot) => {

      querySnapshot.forEach((doc) => {
        // get all books attached to user email
        const userBooks = [];
        const userRequests = [];
        const email = doc.data().email;
        const books = firebase.firestore().collection("books").where("createdByEmail", "==", email);
        books.get()
          .then((querySnapshot) => {

            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              userBooks.push({
                title: doc.data().title,
                author: doc.data().author,
                id: doc.data().id,
                thumbnail: doc.data().thumbnail,
                categories: doc.data().categories,
                noteText: doc.data().noteText,
              });
            });
            this.setState ({
              readyToRenderBooks: true,
            })
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });

        // get all requests attached to user email

        const requests = firebase.firestore().collection("recommendationRequests").where("userEmail", "==", email);
        requests.get()
          .then((querySnapshot) => {

            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              userRequests.push({
                id: doc.data().id,
                requester: doc.data().user,
                userEmail: doc.data().userEmail,
                dateCreated: doc.data().dateCreated,
                categories: doc.data().categories,
                responses: doc.data().responses,
              });
            });

            this.setState ({
              readyToRenderRequests: true
            })
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });


        allUsers.push({
          name: doc.data().name,
          email: doc.data().email,
          books: userBooks,
          requests: userRequests,
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
        name={user.name}
        email={user.email}
        books={user.books}
        requests={user.requests} />
    })
  }

  render() {
    console.log(this.state.users);
    if (this.state.readyToRenderBooks && this.state.readyToRenderRequests) {
    return (
      <div className="users-container">
        {this.state.users}
      </div>
    );
    } else {
      return (null);
    }
  }
}

export default Users;