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

  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
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
                  : <span className="login-button" onClick={signInWithGoogle}>Sign in with Google</span>
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
