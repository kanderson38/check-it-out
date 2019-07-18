import React, { Component } from 'react';
import firebase from '../firebaseConfig.js';
import { Link } from 'react-router-dom';

import BookCategories from './BookCategories.js'

import './ShowBook.css';

class ShowBook extends Component {

  constructor(props) {
    super(props);

    this.state = {
      book: {},
      categories: [],
      selectedCategories: [],
      unselectedCategories: [],
    }
  }

  componentDidMount() {
    const book = firebase.firestore().collection("books").doc(this.props.match.params.id);
    book.get().then((doc) => {
      if (doc.exists) {
        const categories = doc.data().categories;
        const arr = categories ? Object.keys(categories) : [];
        this.setState({
          book: doc.data(),
          categories: arr,
        });


      } else {
        const status = {
          type: "error",
          message: `Book does not exist`,
        }
        this.props.showStatusCallback(status);
      }
    }).catch((error) => {
      const status = {
        type: "error",
        message: error.message,
      }
      this.props.showStatusCallback(status);
      console.log("Error getting document:", error);
    });

    const unselectedCats = [];
    const selectedCats = [];

    const dbCats = firebase.firestore().collection("categories");
    dbCats.get().then((querySnapshot) => {

      querySnapshot.forEach((doc) => {
        if (!this.state.categories.includes(doc.data().name)) {

          unselectedCats.push(
            doc.data().name
          );
        } else {
          selectedCats.push(
            doc.data().name
          )
        }
      });
      this.setState({
        selectedCategories: selectedCats,
        unselectedCategories: unselectedCats,
      });

    });
  }

  changeCategoryAssignment = (catObject) => {
    const book = firebase.firestore().collection("books").doc(this.props.match.params.id);
    book.update({
      categories: catObject,
    })
      .then(() => {

        const status = {
          type: "success",
          message: "Successfully updated categories!"
        }
        this.props.showStatusCallback(status);
      })
      .catch(function (error) {
        const status = {
          type: "error",
          message: error,
        }
        this.props.showStatusCallback(status);
      });
  }

  saveSelectedCategories = () => {
    const catObject = {};
    this.state.selectedCategories.forEach((cat) => {
      catObject[cat] = true;

    })

    this.changeCategoryAssignment(catObject);
  }

  updateSelectedCategories = (name, checked) => {
    const selected = this.state.selectedCategories;
    const unselected = this.state.unselectedCategories;

    if (!checked) {
      selected.push(name);
      const filtered = unselected.filter(function (currentName) {
        return currentName !== name;
      });
      this.setState({
        selectedCategories: selected,
        unselectedCategories: filtered,
      })
    } else {
      unselected.push(name);
      const filtered = selected.filter(function (currentName) {
        return currentName !== name;
      });
      this.setState({
        unselectedCategories: unselected,
        selectedCategories: filtered,
      })
    }
  }

  render() {
    if (this.state.book.title) {
      return (
        <div className="show-book-container">
          <Link to="/books/" className="back-link">Back to book list</Link>
          <div className="book-info">
            <img src={this.state.book.thumbnail} alt={this.state.book.title} className="thumbnail"></img>
            <h2 className="title">{this.state.book.title}</h2>
            <span className="author"><strong>{this.state.book.author}</strong></span>
            <span className="publish-info">Published by: {this.state.book.publisher}, {this.state.book.publishedDate}</span>
            <span className="description">{this.state.book.description}</span>
            <span className="created-by"><strong>Book added by:</strong> {this.state.book.createdByName ? this.state.book.createdByName : ""}</span>
          </div>
          <div className="book-categories-container">
            {this.state.unselectedCategories.length > 0 || this.state.selectedCategories.length > 0 ? <BookCategories {...this.props}
              categories={this.state.categories}
              selectedCategories={this.state.selectedCategories}
              unselectedCategories={this.state.unselectedCategories}
              updateSelectedCategoriesCallback={this.updateSelectedCategories}
              saveSelectedCategoriesCallback={this.saveSelectedCategories}
              showStatusCallback={this.props.showStatusCallback}
            /> : null}
          </div>
        </div>
      )
    } else {
      return (null);
    }
  }
}

export default ShowBook;