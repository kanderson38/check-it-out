import React, { Component } from 'react';
import firebase from '../firebaseConfig';

import BookItem from './BookItem.js';
import RecommendationItem from './RecommendationItem.js';

import './ShowUser.css';

class ShowUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      books: [],
      requests: [],
    }
  }

  componentDidMount() {

    this.getName();

    this.getBooks();

    this.getRequests();
  }

  getName = () => {
    const user = firebase.firestore().collection("users").doc(this.props.match.params.id);
    user.get()
    .then((doc) => {
      if(doc.exists) {
        this.setState ({
          name: doc.data().name,
        })
      } else {
        console.log("Document does not exist");
      }
    })
  }

  getBooks = () => {
    const books = firebase.firestore().collection("books").where("createdByEmail", "==", this.props.match.params.id);
    const booksToMap = [];
    books.get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          booksToMap.push({
            title: doc.data().title,
            author: doc.data().author,
            thumbnail: doc.data().thumbnail,
            id: doc.data().id,
            categories: doc.data().categories,
            noteText: doc.data().noteText,
          });
        });

        const bookItems = this.mapBooks(booksToMap);
        this.setState({
          books: bookItems,
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  mapBooks = (books) => {
    const bookItems = books.map((book) => {
      return <BookItem
        {...this.props}
        key={book.id}
        title={book.title}
        author={book.author}
        id={book.id}
        noteText={book.noteText}
        thumbnail={book.thumbnail}
        categories={book.categories}
        deleteBookCallback={this.deleteBook}
      />
    });

    return (bookItems);
  }

  getRequests = () => {
    const requests = firebase.firestore().collection("recommendationRequests").where("userEmail", "==", this.props.match.params.id);
    const requestsToMap = [];
    requests.get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          requestsToMap.push(
            {
              id: doc.id,
              user: doc.data().user,
              userEmail: doc.data().userEmail,
              dateCreated: doc.data().dateCreated,
              categories: doc.data().categories,
              responses: doc.data().responses,
            }
          );
        });

        const requestItems = this.mapRequests(requestsToMap);
        this.setState({
          requests: requestItems,
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  mapRequests = (requests) => {
    const allRequests = requests.map((doc) => {
      return (
        <RecommendationItem
          {...this.props}
          key={doc.id}
          id={doc.id}
          requester={doc.user}
          userEmail={doc.userEmail}
          dateCreated={doc.dateCreated}
          categories={doc.categories}
          responses={doc.responses}
          deleteRequestCallback={this.deleteRequest}
        />
      )
    });

    return (allRequests);
  }

  deleteRequest = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      const db = firebase.firestore();

      db.collection("recommendationRequests").doc(id).delete().then(() => {
        const status = {
          type: "success",
          message: "Successfully deleted request!",
        }
        this.props.showStatusCallback(status);

        window.location.reload();
      }).catch((error) => {
        console.error("Error removing document: ", error);
        const status = {
          type: "error",
          message: error,
        }
        this.props.showStatusCallback(status);
      });
    }
  }

  render() {
    return (
      <div className="show-user-container">
        <div className="show-user-name">
          <h2>{this.state.name}</h2>
        </div>
        <div className="show-user-header">
          <h2>Requests for recommendations:</h2>
        </div>
        <div className="user-recommendations-container">
          {this.state.requests}
        </div>

        <div className="show-user-header">
          <h2>Books added to the library:</h2>
        </div>
        <div className="book-items-container">
          {this.state.books}
        </div>
      </div>
    )
  }
}

export default ShowUser;