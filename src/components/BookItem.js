import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import './BookItem.css';

class BookItem extends Component {

  onDelete = () => {
    this.props.deleteBookCallback(this.props.id);
  }

  render() {
    return (
      <div className="bookitem">
        <section className="title-author-container">
          <Link to={`/books/${this.props.id}`}>{this.props.title}</Link><p> {this.props.author}</p>
          {this.props.submittedBy ? <p>Submitted by: {this.props.submittedBy}</p> : null}

          {this.props.match.url === "/books/" ? <span className="delete-button" onClick={this.onDelete}>
            <small>Delete from Library</small>
          </span> : null}
        </section>
        {this.props.submittedBy ? <span>{this.props.noteText}</span> : null}

        <img src={this.props.thumbnail} alt={this.props.title} className="book-item-thumbnail"></img>
      </div>
    )
  }
}

export default BookItem;