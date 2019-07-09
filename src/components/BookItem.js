import React, {Component} from 'react';

class BookItem extends Component {

  render () {
    console.log(this.props);
    return (
      <div>
        <p>{this.props.title}</p>
      </div>
    )
  }
}

export default BookItem;