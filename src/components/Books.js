import React, { Component } from 'react';

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

    const filteredBooks = [];
    let filteredResults = firebase.firestore().collection('books');
    this.state.filters.forEach(function (cat) {
      const thingToCheck = 'categories.' + cat;
      filteredResults = filteredResults.where(thingToCheck, '==', true)
    });

    filteredResults.get().then(function (querySnapshot) {

      querySnapshot.forEach(function (doc) {
        filteredBooks.push({ title: doc.data().title, author: doc.data().author });
      });


      const bookItems = filteredBooks.map((book) => {
        return <BookItem
          key={book.title}
          title={book.title}
          author={book.author}
        />
      });

      console.log(bookItems);
      this.onFilterResults(bookItems);

    });


  }

  onRemoveFilter = (name) => {
    const allFilters = this.state.filters;
    if (allFilters.includes(name)) {
      let index = allFilters.indexOf(name);
      if (index !== -1) allFilters.splice(index, 1);
    }

    console.log(allFilters);
    this.setState({
      filters: allFilters,
    })


  }

  onFilterResults = (results) => {
    this.setState ({
      books: results,
    });

  }

  render() {
    console.log(this.state.books);
    return (
      <div className="books-container">
        <div className="booklist-container">
          {this.state.books}
        </div>
        <FilterPane addFilterCallback={this.onAddFilter}
          removeFilterCallback={this.onRemoveFilter} />

      </div>
    )
  }

}

export default Books;