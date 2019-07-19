import React, { Component } from 'react';
import firebase from '../firebaseConfig';


class AddRecommendation extends Component {
  constructor (props) {
    super(props);

    this.state={

    }
  }

  render () {
    return (
      <div className="add-rec-container">
        <div className="add-rec-instructions"><p>
          <strong>Can't find the kind of book you're looking for in the existing Check It Out library?</strong>
          </p>
          <p>
          To request recommendations, select the categories you would like the recommended books to have,
          and then click the "Submit" button to notify all users that you would like them to
          add new books that meet your criteria. You may also add a note to further describe the kind of books you're looking for.</p></div>
        <div className="rec-categories-container">
          
        </div>

      </div>
    )
  }

}

export default AddRecommendation;