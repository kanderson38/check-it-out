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

  componentWillMount() {
    const allBooks = this.state.books;
    const db = firebase.firestore().collection("books");

    db.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        allBooks.push({ title: doc.data().title, author: doc.data().author });

      });

      const bookItems = allBooks.map((book) => {
        return <BookItem
          {...this.props}
          key={book.title}
          title={book.title}
          author={book.author}
        />
      });

      this.setState({
        books: bookItems,
        defaultBooks: bookItems,
      });
    });
  }

  onAddFilter = (name) => {
    const allFilters = this.state.filters;
    if (!allFilters.includes(name)) {
      allFilters.push(name);
    }

    // console.log(allFilters);
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
      filteredResults = filteredResults.where(thingToCheck, '==', true)
    });

    filteredResults.get().then((querySnapshot) => {

      querySnapshot.forEach(function (doc) {
        filteredBooks.push({ title: doc.data().title, author: doc.data().author });
      });


      const bookItems = filteredBooks.map((book) => {
        return <BookItem
          {...this.props}
          key={book.title}
          title={book.title}
          author={book.author}
        />
      });

      this.setState({
        books: bookItems,
      });
    });
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
        <FilterPane addFilterCallback={this.onAddFilter}
          removeFilterCallback={this.onRemoveFilter}
          searchBooksCallback={this.onSearchBooks} />

      </div>
    )
  }

}

export default Books;