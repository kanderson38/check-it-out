import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css'
import Home from "./components/Home.js";
import Books from './components/Books.js';
import ShowBook from './components/ShowBook.js';
import AddBook from './components/AddBook.js';

import withFirebaseAuth from 'react-with-firebase-auth';
import 'firebase/auth';
import firebase from './firebaseConfig';
// import * as firebase from 'firebase/app';

// Required for side-effects
require("firebase/firestore");

// const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebase.auth();


const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};


function Users() {
  return <h2>Users</h2>;
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    }
  }

  checkAgainstDatabase = (user) => {
    const docRef = firebase.firestore().collection("users").doc(user.email);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        this.addUserToDatabase(user);
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  }

  addUserToDatabase = (user) => {
    const db = firebase.firestore();
        db.collection("users").doc(user.email).set({
          name: user.displayName,
          email: user.email,
        })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
        console.log("No such document!");
  }

  onSignIn = (event) => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      this.checkAgainstDatabase(user);
    }).catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      console.log(error);
    });
  }

  render() {
    const {
      user,
      signOut,
    } = this.props;

    return (
      <Router>
        <div>
          <nav>
            <div className="login">
              {
                user
                  ? <span className="login-span">Hello, {user.displayName}</span>
                  : <span className="login-span">Please sign in.</span>
              }
              {
                user
                  ? <span className="login-button" onClick={signOut}>Sign out</span>
                  : <span className="login-button" onClick={this.onSignIn}>Sign in with Google</span>
              }
            </div>

            <h1 className="logo">Check It Out</h1>

            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/books/">Full Library</Link>
              </li>
              <li>
                <Link to="/users/">Users</Link>
              </li>
            </ul>
          </nav>
          <div className="status">

          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path='/books/' exact
              render={(props) => <Books {...props} />}
            />
            <Route path="/users/" component={Users} />
            <Route path="/books/:id" render={(props) => <ShowBook {...props} />} />
            <Route path="/addbook/" component={AddBook} />
          </Switch>

        </div>
      </Router>
    )
  };
}


export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
