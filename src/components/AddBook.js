import React, { Component } from 'react';
import axios from 'axios';

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
    axios.get(`${API_URL}?q=${this.state.searchQuery}`)
      .then((response) => {
        const searchList = response.data.items.map((book) => {
          return <SearchResultItem
            key={book.id}
            title={book.volumeInfo.title}
            author={book.volumeInfo.authors[0]}
            publishedDate={book.volumeInfo.publishedDate}
            publisher={book.volumeInfo.publisher}
            thumbnail={book.volumeInfo.imageLinks.smallThumbnail}
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
        <label>
          Search for a new book:
          <input name="search-api" placeholder="Title, author" value={this.state.searchQuery} onChange={this.onHandleSearchChange}></input>
          <button type="submit" onClick={this.onHandleSearchClick}>Search</button>
        </label>

        <div>
          {this.state.results}
        </div>
      </div>
    )
  }

}

export default AddBook;