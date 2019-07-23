import React, { Component } from 'react';
import firebase from '../firebaseConfig';
import * as moment from 'moment';

import './ShowRecommendation.css';

import BookItem from './BookItem.js';
import AddBook from './AddBook.js';


class ShowRecommendation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendationRequest: {},
      formattedDate: "",
      books: [],
      showAddBook: false,
    }
  }

  formatCategories = () => {
    return (this.state.recommendationRequest.categories.map((cat, i) => {
      return (<li className="category-button" key={i}>{cat}</li>);
    })

    )
  }

  componentDidMount() {
    const recReq = firebase.firestore().collection("recommendationRequests").doc(this.props.match.params.id);
    recReq.get().then((doc) => {
      if (doc.exists) {
        var t = doc.data().dateCreated.toDate();
        const formatted = moment(t).format("MMM Do YYYY");
        let allMappedBooks = [];
        let allBooks = [];
        // get books from responses
        const books = firebase.firestore().collection("books");
        if (doc.data().responses.length > 0) {
          doc.data().responses.forEach((response) => {
            books.where("id", "==", response)
              .get()
              .then((querySnapshot) => {

                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  allBooks.push({
                    title: doc.data().title,
                    author: doc.data().author,
                    id: doc.data().id,
                    thumbnail: doc.data().thumbnail,
                    categories: doc.data().categories,
                  });
                });

                allMappedBooks = this.mapBooks(allBooks);

                this.setState({
                  recommendationRequest: doc.data(),
                  formattedDate: formatted,
                  books: allMappedBooks,
                });
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });
          });
        } else {
          this.setState({
            recommendationRequest: doc.data(),
            formattedDate: formatted,
            books: [],
          });
        }

      } else {
        const status = {
          type: "error",
          message: `Recommendation request does not exist`,
        }
        this.props.showStatusCallback(status);
      }
    }).catch((error) => {
      const status = {
        type: "error",
        message: error.message,
      }
      this.props.showStatusCallback(status);
      console.log("Error getting document:", error);
    });
  }

  mapBooks = (books) => {
    const bookItems = books.map((book) => {
      return <BookItem
        {...this.props}
        key={book.id}
        title={book.title}
        author={book.author}
        id={book.id}
        thumbnail={book.thumbnail}
        categories={book.categories}
        deleteBookCallback={this.deleteBook}
        submittedBy={this.state.recommendationRequest.user}
      />
    });

    return (bookItems);
  }

  onShowAddBookPage = () => {
    this.setState({
      showAddBook: true,
    })
  }

  onHideAddBookPage = () => {
    this.setState({
      showAddBook: false,
    })
    window.location.reload();
  }

  render() {
    if (this.state.showAddBook) {
      return (
        <div>
          <div className="show-recommendation-container">
            <h2>Request Details:</h2>
            <span className="rec-name-date-container">
              {this.state.formattedDate}
              {` ${this.state.recommendationRequest.user}`}
              {this.state.recommendationRequest.categories ? <ul className="rec-category-list">{this.formatCategories()}</ul> : null}
            </span>
            <div className="note-container">{this.state.recommendationRequest.note}</div>

          </div>
          <AddBook {...this.props}
            hideAddBookCallback={this.onHideAddBookPage}
            categoriesSubmitted={this.state.recommendationRequest.categories}
            currentRequest={this.props.match.params.id} />
        </div>
      )
    }

    if (this.state.recommendationRequest.user) {
      return (
        <div>
          <div className="show-recommendation-container">
            <h2>Request Details:</h2>
            <span className="rec-name-date-container">
              {this.state.formattedDate}
              {` ${this.state.recommendationRequest.user}`}
              {this.state.recommendationRequest.categories ? <ul className="rec-category-list">{this.formatCategories()}</ul> : null}
            </span>
            <div className="note-container">{this.state.recommendationRequest.note}</div>

          </div>
          <div className="book-items-container">
            <h2 className="show-recommendation-header">Responses:</h2>
            <span className="button submit-button" onClick={this.onShowAddBookPage}>Submit a New Book</span>


            {this.state.books !== [] ? this.state.books : "null"}

          </div>
        </div>
      );
    } else {
      return (null);
    }
  }
}

export default ShowRecommendation;