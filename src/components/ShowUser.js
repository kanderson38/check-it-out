import React, { Component } from 'react';

import './ShowUser.css';

class ShowUser extends Component {

  render() {
    return (
      <div className="show-user-container">
        {this.props.match.params.id}
      </div>
    )
  }
}

export default ShowUser;