import React, { Component } from 'react';
import firebase from '../firebaseConfig';

import CategoryItem from './CategoryItem';

class BookCategories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allCategoryItems: [],
      editing: false,
    }
  }

  componentDidMount() {
    console.log(this.props);
    this.listCategories();
  }

  listCategories = () => {
    let allCategories = [];

    this.props.selectedCategories.forEach((cat) => {
      console.log(cat);
      allCategories.push(
        <CategoryItem 
          name={cat}
          selected={true}
        />
      );
    });

    this.props.unselectedCategories.forEach((cat) => {
      allCategories.push(
        <CategoryItem 
        name={cat}
        selected={false}
        />
      )
    });

    this.setState ({
      allCategoryItems: allCategories,
    });
    console.log(allCategories);
  }

  render() {
    return (
      <div className="categories-container" >
        <span className="categories-header"><strong>Categories:</strong> {this.state.editing ? `Save` : `(Add/edit)`}</span>
        {this.state.allCategoryItems}
      </div >

    )
  }
}

export default BookCategories;