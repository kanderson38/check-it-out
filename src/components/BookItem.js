import React, {Component} from 'react';

import { Link } from 'react-router-dom';
import './BookItem.css';

class BookItem extends Component {

  onDelete = () => {
    this.props.deleteBookCallback(this.props.id);
  }

  render () {
    return (
      <div className="bookitem">
        <img src={this.props.thumbnail} alt={this.props.title} className="book-item-thumbnail"></img>
        <Link to={`${this.props.match.url}${this.props.id}`}>{this.props.title}</Link><p> {this.props.author}</p>
        <span className="delete-button" onClick={this.onDelete}><small>Delete from Library</small></span>
      </div>
    )
  }
}

export default BookItem;