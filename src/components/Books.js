import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FilterPane from './FilterPane.js';
import BookItem from './BookItem.js';
import firebase from '../firebaseConfig.js'

import './Books.css';


class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      defaultBooks: [],
      filters: [],
    }

  }

  componentDidMount() {
    const allBooks = this.state.books;
    const db = firebase.firestore().collection("books").orderBy("title");

    db.get().then((querySnapshot) => {

      querySnapshot.forEach((doc) => {

        allBooks.push({
          title: doc.data().title,
          author: doc.data().author,
          id: doc.data().id,
          thumbnail: doc.data().thumbnail,
          categories: doc.data().categories,
        });
      });

      const bookItems = this.mapBooks(allBooks);

      this.setState({
        books: bookItems,
        defaultBooks: bookItems,
      });
    });
  }

  deleteBook = (id) => {
    // delete book from db
    if (window.confirm("Are you sure you want to delete this book?")) {
      const db = firebase.firestore();

      db.collection("books").doc(id).delete().then(() => {
        const status = {
          type: "success",
          message: "Successfully deleted book from library!",
        }
        this.props.showStatusCallback(status);
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
        const status = {
          type: "error",
          message: error,
        }
        this.props.showStatusCallback(status);
      });

      this.onFilterResults();
    }
  }

  compareTitles = (a, b) => {
    const title1 = a.title.toUpperCase();
    const title2 = b.title.toUpperCase();

    let comparison = 0;
    if (title1 > title2) {
      comparison = 1;
    } else if (title1 < title2) {
      comparison = -1;
    }
    return comparison;

  }

  onAddFilter = (name) => {
    const allFilters = this.state.filters;
    if (!allFilters.includes(name)) {
      allFilters.push(name);
    }

    this.setState({
      filters: allFilters,
    });

    this.onFilterResults();

  }

  onRemoveFilter = (name) => {
    const allFilters = this.state.filters;
    if (allFilters.includes(name)) {
      let index = allFilters.indexOf(name);
      if (index !== -1) allFilters.splice(index, 1);
    }

    this.setState({
      filters: allFilters,
    })

    this.onFilterResults();

  }

  onSearchBooks = (searchString) => {
    const booksToSearch = this.state.books;
    const foundBooks = [];

    if (searchString !== "") {
      booksToSearch.forEach(function (book) {
        if (book.props.title.toLowerCase().includes(searchString.toLowerCase()) ||
          book.props.author.toLowerCase().includes(searchString.toLowerCase())) {
          foundBooks.push(book);
        }
      });
    } else {
      this.onFilterResults();
    }


    this.setState({
      books: foundBooks,
    })
  }

  onFilterResults = (results) => {
    const filteredBooks = [];
    let filteredResults = firebase.firestore().collection('books');

    this.state.filters.forEach(function (cat) {
      const thingToCheck = 'categories.' + cat;
      filteredResults = filteredResults.where(thingToCheck, '==', true);
    });

    filteredResults.get().then((querySnapshot) => {

      querySnapshot.forEach(function (doc) {
        filteredBooks.push({
          title: doc.data().title,
          author: doc.data().author,
          thumbnail: doc.data().thumbnail,
          id: doc.data().id,
          categories: doc.data().categories,
        });
      });

      filteredBooks.sort(this.compareTitles);


      const bookItems = this.mapBooks(filteredBooks);

      this.setState({
        books: bookItems,
      });
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
      />
    });

    return (bookItems);
  }

  render() {
    return (
      <div className="books-container">
        <div className="booklist-container">
          <div className="book-search">
            <Link to="/addbook/">Add a book to the library</Link>
          </div>
          {this.state.books}
        </div>
        <div className="filter-pane-container">
          <FilterPane {...this.props} addFilterCallback={this.onAddFilter}
            removeFilterCallback={this.onRemoveFilter}
            searchBooksCallback={this.onSearchBooks} />
        </div>
      </div>
    )
  }

}

export default Books;