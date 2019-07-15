import React, { Component } from 'react';
import firebase from '../firebaseConfig.js';
import { Link } from 'react-router-dom';

import BookCategories from './BookCategories.js'

import './ShowBook.css';

class ShowBook extends Component {

  constructor(props) {
    super(props);

    this.state = {
      book: {},
      categories: [],
    }
  }

  componentWillMount() {
    const db = firebase.firestore().collection("books").doc(this.props.match.params.id);
    db.get().then((doc) => {
      if (doc.exists) {
        const categories = doc.data().categories;
        const arr = Object.keys(categories);
        this.setState({
          book: doc.data(),
          categories: arr,
        });
      } else {
        const status = {
          type: "error",
          message: `Book does not exist`,
        }
        this.props.showStatusCallback(status);
      }
    }).catch(function (error) {
      const status = {
        type: "error",
        message: error.message,
      }
      this.props.showStatusCallback(status);
      console.log("Error getting document:", error);
    });
  }



  render() {
    return (
      <div className="show-book-container">
        <Link to="/books/" className="back-link">Back to book list</Link>
        <div className="book-info">
          <img src={this.state.book.thumbnail} alt={this.state.book.title} className="thumbnail"></img>
          <h2 className="title">{this.state.book.title}</h2>
          <span className="author"><strong>{this.state.book.author}</strong></span>
          <span className="publish-info">Published by: {this.state.book.publisher}, {this.state.book.publishedDate}</span>
          <span className="description">{this.state.book.description}</span>
          <span className="created-by"><strong>Book added by:</strong> {this.state.book.createdByName ? this.state.book.createdByName : ""}</span>
        </div>
        <div className="book-categories-container">
          <BookCategories {...this.props} categories={this.state.categories} />
        </div>
      </div>
    )
  }
}

export default ShowBook;