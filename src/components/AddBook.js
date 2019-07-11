import React, { Component } from 'react';
import axios from 'axios';

import './AddBook.css';

import SearchResultItem from './SearchResultItem.js'



const API_URL = 'https://www.googleapis.com/books/v1/volumes';
class AddBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      results: [],
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

  getBooks = () => {
    axios.get(`${API_URL}?q=${this.state.searchQuery}&printType=books`)
      .then((response) => {
        console.log(response.data.items[0])
        const searchList = response.data.items.map((book) => {
          return <SearchResultItem
            key={book.id}
            title={book.volumeInfo.title}
            author={book.volumeInfo.authors[0]}
            publishedDate={book.volumeInfo.publishedDate}
            publisher={book.volumeInfo.publisher}
            thumbnail={book.volumeInfo.imageLinks.smallThumbnail}
            description={book.volumeInfo.description}

          // addBookCallback={this.addBook}
          />
        });
        this.setState({ results: searchList, movieSearch: '', clickSearch: true })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {

    return (
      <div className="add-book-container">
        <div className="add-book-search-bar">
          <label>
            Search for a new book:
          <input name="search-api" placeholder="Title, author" value={this.state.searchQuery} onChange={this.onHandleSearchChange}></input>
            <span onClick={this.onHandleSearchClick} className="submit-button">Search</span>
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