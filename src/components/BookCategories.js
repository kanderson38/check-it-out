import React, { Component } from 'react';
import firebase from '../firebaseConfig';

class BookCategories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCategories: [],
      unselectedCategories: [],
      editing: false,
    }
  }

  componentWillMount() {

    const allCategories = firebase.firestore().collection("categories");

  }

  render() {

    return (
      <div className="categories-container">
        <span className="categories-header"><strong>Categories:</strong> {this.state.editing ? `Save` : `(Add/edit)`}</span>
        {this.props.categories}
      </div>

    )
  }
}

export default BookCategories;