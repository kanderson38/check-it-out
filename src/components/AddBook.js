import React, {Component} from 'react';

class AddBook extends Component {
  constructor (props) {
    super(props);

    this.state = {
      searchQuery: "",
    }
  }

  render() {

    return(
      <div className="add-book-container">
        <label>
          Search for a new book:
          <input name="search-api" placeholder="Title, author"></input>
        </label>
      </div>
    )
  }

}

export default AddBook;