import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css'
import Home from "./components/Home.js";
import Books from './components/Books.js';
import ShowBook from './components/ShowBook.js';
import AddBook from './components/AddBook.js';
import Recommendations from './components/Recommendations.js';
import AddRecommendation from './components/AddRecommendation.js';
import ShowRecommendation from './components/ShowRecommendation.js';

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
      statusToShow: {
        message: "",
        type: "hidden",
      },
    }
  }

  showNewStatus = (status) => {
      this.setState ({
        statusToShow: {
          message: status.message,
          type: status.type,
        }
      });

      setTimeout(this.resetStatus, 8000);
  }

  resetStatus = () => {
    this.setState ({
      statusToShow: {
        message: "",
        type: "hidden",
      }
    })
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
      const status = {
        type: "success",
        message: "Successfully logged in",
      }
      this.showNewStatus(status);
    }).catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      const status = {
        type: "error",
        message: error.message,
      }
      this.showNewStatus(status);
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
                  ? <span className="button" onClick={signOut}>Sign out</span>
                  : <span className="button" onClick={this.onSignIn}>Sign in with Google</span>
              }
            </div>

            <h1 className="logo"><Link to="/">Check It Out</Link></h1>

            <ul>
              <li>
                <Link to="/books/">Full Library</Link>
              </li>
              <li>
                <Link to="/recs/">Recommendation Requests</Link>
              </li>
            </ul>
          </nav>
          <div className={`status ${this.state.statusToShow.type}`}>
              <p>{this.state.statusToShow.message}</p>
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path='/books/' exact
              render={(props) => <Books {...props} showStatusCallback={this.showNewStatus} />}
            />
            <Route path="/users/" component={Users} />
            <Route path="/books/:id" render={(props) => <ShowBook {...props} showStatusCallback={this.showNewStatus} />} />
            <Route path="/addbook/" render={(props) => <AddBook {...props} showStatusCallback={this.showNewStatus} />} />
            <Route path="/recs/" exact render={(props) => <Recommendations {...props} {...this.props} showStatusCallback={this.showNewStatus} />} />
            <Route path="/addrec/" render={(props) => <AddRecommendation {...props} {...this.props} showStatusCallback={this.showNewStatus} />} />
            <Route path="/recs/:id" render={(props) => <ShowRecommendation {...props} {...this.props} showStatusCallback={this.showNewStatus} />} />
           
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
