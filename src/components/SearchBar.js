import React, { Component } from 'react';

class SearchBar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      searchText: "",
    }
  }

  onSearchChange = (event) => {
    this.setState ({
      searchText: event.target.value,
    })

    this.props.searchBooksCallback(event.target.value);
  }

  render() {
    return (
      <label>
        Search Books: 
        <input className="search-input" 
        placeholder="Title, author" 
        value={this.state.searchText} 
        onChange={this.onSearchChange}></input>
      </label>
    );
  }
}

export default SearchBar;