import React, {Component} from 'react';

import { Link } from 'react-router-dom';
import './BookItem.css';

class BookItem extends Component {

  render () {
    return (
      <div className="bookitem">
        <Link to={`${this.props.match.url}/${this.props.title}`}>{this.props.title}</Link><p> {this.props.author}</p>
      </div>
    )
  }
}

export default BookItem;