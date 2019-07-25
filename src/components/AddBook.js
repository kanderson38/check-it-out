import React, { Component } from 'react';
import axios from 'axios';
import firebase from '../firebaseConfig.js';
import { Redirect } from 'react-router-dom';
import './AddBook.css';
import AddNote from './AddNote.js';

import SearchResultItem from './SearchResultItem.js'



const API_URL = 'https://www.googleapis.com/books/v1/volumes';
class AddBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      results: [],
      shouldRedirect: false,
      addedBook: null,
      popUpAddNote: false,
    }
  }

  onHandleSearchClick = (event) => {
    event.preventDefault();
    this.getBooks();
  }

  onHandleSearchChange = (event) => {
    this.setState({
      searchQuery: event.target.value,
    })
  }

  addBook = (book) => {
    // add book to db
    const db = firebase.firestore().collection("books");
    const categoriesSubmitted = {};
    if (this.props.categoriesSubmitted) {
      this.props.categoriesSubmitted.forEach((cat) => {
        categoriesSubmitted[cat] = true;
      })
    }

    db.doc(book.id).set({
      id: book.id,
      title: book.title,
      author: book.author,
      thumbnail: book.thumbnail,
      publishedDate: book.publishedDate,
      publisher: book.publisher,
      previewLink: book.previewLink,
      description: book.description,
      createdByEmail: firebase.auth().currentUser.email,
      createdByName: firebase.auth().currentUser.displayName,
      categories: categoriesSubmitted,
      notetext: "",
    })
      .then(() => {
        console.log("added book");

        if (this.props.hideAddBookCallback) {
          const docRef = firebase.firestore().collection("recommendationRequests").doc(this.props.currentRequest);
          return docRef.update({
            responses: firebase.firestore.FieldValue.arrayUnion(book.id),
          })
            .then(() => {
              console.log("Document successfully updated!");
              this.setState({
                popUpAddNote: true,
                addedBook: book.id,
              })
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        }
        this.setState({
          shouldRedirect: true,
          popUpAddNote: true,
          addedBook: book.id,
        })

        const status = {
          type: "success",
          message: (this.props.hideAddBookCallback ? "Successfully added your response to recommendation request!" : "Successfully added book to library! Add categories on this page.")
        }
        this.props.showStatusCallback(status);
      })
      .catch(function (error) {
        const status = {
          type: "error",
          message: error,
        }
        this.props.showStatusCallback(status);
      });

  }


  getBooks = () => {
    axios.get(`${API_URL}?q=${this.state.searchQuery}&printType=books`)
      .then((response) => {
        const searchList = response.data.items.map((book) => {
          return <SearchResultItem
            key={book.id}
            id={book.id}
            title={book.volumeInfo.title}
            author={book.volumeInfo.authors ? book.volumeInfo.authors[0] : "unknown"}
            publishedDate={book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : "unknown"}
            publisher={book.volumeInfo.publisher ? book.volumeInfo.publisher : "Unknown"}
            thumbnail={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : ""}
            description={book.volumeInfo.description ? book.volumeInfo.description : ""}
            previewLink={book.volumeInfo.previewLink ? book.volumeInfo.previewLink : ""}

            addBookCallback={this.addBook}
          />
        });
        this.setState({ results: searchList })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  skipNote = () => {
    if (!this.props.hideAddBookCallback) {
      this.setState({
        popUpAddNote: false,
        shouldRedirect: true,
      })
    } else {
      this.setState({
        popUpAddNote: false,
      })
    }
  }

  addNote = (noteText) => {

    const db = firebase.firestore().collection("books");

    db.doc(this.state.addedBook).update({
      noteText: noteText,
    })
      .then(() => {
        const status = {
          type: "success",
          message: (this.props.hideAddBookCallback ? "Successfully added your response to recommendation request!" : "Successfully added book to library! Add categories on this page.")
        }
        this.props.showStatusCallback(status);

        if (!this.props.hideAddBookCallback) {
          this.setState({
            popUpAddNote: false,
            shouldRedirect: true,
          })
        } else {
          this.setState({
            popUpAddNote: false,
          })


          this.props.hideAddBookCallback();
          window.location.reload();
        }


      })
      .catch(function (error) {
        const status = {
          type: "error",
          message: error,
        }
        this.props.showStatusCallback(status);
      });
  }

  render() {

    if (this.state.shouldRedirect && !this.state.popUpAddNote) {
      return <Redirect to={`/books/${this.state.addedBook}`} />
    }

    if (this.state.popUpAddNote) {
      return (
        <div className="add-book-container">
          <AddNote addNoteCallback={this.addNote} skipNoteCallback={this.skipNote} />
          <div className="add-book-search-bar">
            <label>
              {this.props.history.location.pathname === "/addbook/" ? `Search for a new book:` : `Add a new book as a response to this recommendation request:`}
              <input name="search-api" placeholder="Title" value={this.state.searchQuery} onChange={this.onHandleSearchChange}></input>
              <span onClick={this.onHandleSearchClick} className="button submit-button">Search</span>
            </label>
          </div>

          <div className="search-results-container">
            {this.state.results}
          </div>
        </div>
      )
    }

    return (
      <div className="add-book-container">
        <div className="add-book-search-bar">
          <label>
            {this.props.history.location.pathname === "/addbook/" ? `Search for a new book:` : `Add a new book as a response to this recommendation request:`}
            <input name="search-api" placeholder="Title" value={this.state.searchQuery} onChange={this.onHandleSearchChange}></input>
            <span onClick={this.onHandleSearchClick} className="button submit-button">Search</span>
          </label>
        </div>

        <div className="search-results-container">
          {this.state.results}
        </div>
      </div>
    )
  }

}

export default AddBook;