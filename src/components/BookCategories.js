import React, {Component} from 'react';
import firebase from '../firebaseConfig';

class BookCategories extends Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedCategories: [this.book.categories],
      unselectedCategories: [],
      editing: false,
    }
  }

  componentWillMount () {
    const categories = firebase.firestore().collection("categories")
  }

  render () {
    return (
      <div className="categories-container">
        Categories: (Add/edit)
      </div>

    )
  }
}

export default BookCategories;