import React, { Component } from 'react';

import './UserItem.css';


class UserItem extends Component {

  render() {
    console.log(this.props);
    if (this.props.books) {
      return (
        <div className="user-item-container">
          <span className="user-name">{this.props.name}</span>
          <span className="user-books">{this.props.books.length} Books Added to Library</span>
          <span className="user-requests">{this.props.requests.length} Recommendation Requests</span>

        </div>
      )
    } else {
      return (null);
    }

  }
}

export default UserItem;