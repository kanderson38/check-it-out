import React, { Component } from 'react';
import firebase from '../firebaseConfig';
import { Redirect } from 'react-router-dom';

import BookCategories from './BookCategories';
import './AddRecommendation.css'

class AddRecommendation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategories: [],
      unselectedCategories: [],
      categories: [],
      note: "",
      shouldRedirect: false,
    }
  }

  componentDidMount() {
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

  saveCurrentRecRequest = () => {
    const db = firebase.firestore();

    db.collection("recommendationRequests").add({
      user: this.props.user.displayName,
      categories: this.state.selectedCategories,
      note: this.state.noteText,
      responses: [],
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    })
      .then((docRef) => {
        const status = {
          type:"success",
          message: "Successfully submitted request!"
        };
        this.props.showStatusCallback(status);
        this.setState({
          shouldRedirect: true,
          newDoc: docRef.id,
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

  updateTextArea = (event) => {
    this.setState ({
      noteText: event.target.value,
    })
  }

  render() {
    if (this.state.shouldRedirect) {
      return <Redirect to={`/recs/${this.state.newDoc}`} />
    }
    return (
      <div className="add-rec-container">
        <div className="add-rec-instructions"><p>
          <strong>Can't find the kind of book you're looking for in the existing Check It Out library?</strong>
        </p>
          <p>
            To request recommendations, select the categories you would like the recommended books to have,
            and then click the "Submit" button to notify all users that you would like them to
          add new books that meet your criteria. You may also add a note to further describe the kind of books you're looking for.</p></div>


        <div className="add-rec-categories-container">
          <BookCategories {...this.props}
            categories={this.state.categories}
            selectedCategories={this.state.selectedCategories}
            unselectedCategories={this.state.unselectedCategories}
            updateSelectedCategoriesCallback={this.updateSelectedCategories}
            saveSelectedCategoriesCallback={this.saveSelectedCategories}
            showStatusCallback={this.props.showStatusCallback}
          />
        </div>
        <div className="message-text-area-container">
          <textarea className="message-text-area" value={this.state.noteText} placeholder="Additional notes" onChange={this.updateTextArea}></textarea>
        </div>
        <span className="button save-button" onClick={this.saveCurrentRecRequest}>Submit Request</span>

      </div>
    )
  }

}

export default AddRecommendation;