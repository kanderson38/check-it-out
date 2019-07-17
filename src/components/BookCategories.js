import React, { Component } from 'react';
import firebase from '../firebaseConfig';

import CategoryItem from './CategoryItem';
import './BookCategories.css';

class BookCategories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allCategoryItems: [],
      editing: false,
    }
  }

  componentDidMount() {
    this.listCategories(this.state.editing);
  }

  listCategories = (editing) => {
    let allCategories = [];
    this.props.selectedCategories.forEach((cat) => {

      allCategories.push(
        <CategoryItem
          key={cat}
          name={cat}
          selected={true}
          editing={editing}

        />
      );
    });

    const isHidden = !editing;
    this.props.unselectedCategories.forEach((cat) => {
      allCategories.push(
        <CategoryItem
          key={cat}
          name={cat}
          selected={false}
          editing={editing}
          hidden={isHidden}
        />
      )
    });

    this.setState({
      allCategoryItems: allCategories,
    });
  }

  saveCategories = () => {
    this.changeEditState();

  }

  editCategories = () => {
    this.changeEditState();
  }

  changeEditState = () => {
    const isEditing = !this.state.editing;

    this.listCategories(isEditing);

    this.setState({
      editing: !this.state.editing,
    })
  }

  render() {
    return (
      <div className="categories-container" >
        <span className="categories-header">
          <strong>Categories:</strong>
          {this.state.editing ? <span className="edit-button" onClick={this.saveCategories}>Save</span> : <span className="edit-button" onClick={this.editCategories}>Add/Edit</span>}
        </span>
        <div className="category-items-container">
          {this.state.allCategoryItems}
        </div>
      </div >

    )
  }
}

export default BookCategories;