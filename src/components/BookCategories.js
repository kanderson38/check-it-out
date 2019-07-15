import React, {Component} from 'react';
import firebase from '../firebaseConfig';

class BookCategories extends Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedCategories: [],
      unselectedCategories: [],
      editing: false,
    }
  }

  componentWillMount () {

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