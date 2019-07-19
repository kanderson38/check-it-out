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
      newCategory: "",
    }
  }

  componentDidMount() {
    this.listCategories(this.state.editing);
  }

  changeNewCategory = (event) => {
    this.setState({
      newCategory: event.target.value,
    });
  }

  createNewCategory = () => {
    const catCollection = firebase.firestore().collection("categories");

    catCollection.doc(this.state.newCategory).set({
      name: this.state.newCategory
    })
      .then(() => {
        const status = {
          type: "success",
          message: "Successfully created category!"
        }
        this.props.showStatusCallback(status);
        console.log("Document successfully written!");

        const allCategories = this.state.allCategoryItems;
        allCategories.unshift(
          <CategoryItem
            key={this.state.newCategory}
            name={this.state.newCategory}
            selected={false}
            editing={this.state.editing}
            updateSelectedCategoriesCallback={this.props.updateSelectedCategoriesCallback}
            recommendationsPage={this.props.recommendationsPage}
          />
        )

        this.setState({
          allCategoryItems: allCategories,
          newCategory: "",
        })
      })
      .catch((error) => {
        const status = {
          type: "error",
          message: error,
        }
        this.props.showStatusCallback(status);
        console.error("Error writing document: ", error);
      });


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
          updateSelectedCategoriesCallback={this.props.updateSelectedCategoriesCallback}
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
          updateSelectedCategoriesCallback={this.props.updateSelectedCategoriesCallback}
          hidden={isHidden}
        />
      )
    });

    this.setState({
      allCategoryItems: allCategories,
    });
  };

  saveCategories = () => {
    this.changeEditState();
    if (!this.props.match.url === "/addrec/") {
    this.props.saveSelectedCategoriesCallback();
    }
  };

  editCategories = () => {
    this.changeEditState();
  };

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
          <strong>Categories: </strong>
          {this.state.editing ? <span className="button" onClick={this.saveCategories}>Save</span> : <span className="button" onClick={this.editCategories}>Add/Edit</span>}
        </span>
        <div className={this.state.editing ? "new-categories" : "hidden"}>
          <span>
            Don't see the category you want? <span className="create-category-label">Create a new category:</span>
            <input name="add-category" value={this.state.newCategory}
              onChange={this.changeNewCategory}></input>
            <span className="create-category-submit" onClick={this.createNewCategory}>Create</span>
          </span>
        </div>
        <div className="category-items-container">
          {this.state.allCategoryItems}
        </div>
      </div >

    )
  }
}

export default BookCategories;