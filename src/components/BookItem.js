import React, {Component} from 'react';

import { Link } from 'react-router-dom';
import './BookItem.css';

class BookItem extends Component {

  render () {
    return (
      <div className="bookitem">
        <img src={this.props.thumbnail} alt={this.props.title} className="book-item-thumbnail"></img>
        <Link to={`${this.props.match.url}${this.props.id}`}>{this.props.title}</Link><p> {this.props.author}</p>
      </div>
    )
  }
}

export default BookItem;