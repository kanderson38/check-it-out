import React, {Component} from 'react';
import './BookItem.css';

class BookItem extends Component {

  render () {
    return (
      <div className="bookitem">
        <p>{this.props.title} {this.props.author}</p>
      </div>
    )
  }
}

export default BookItem;