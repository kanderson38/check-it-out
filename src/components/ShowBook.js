import React, { Component } from 'react';
import firebase from '../firebaseConfig.js';
import { Link } from 'react-router-dom';


class ShowBook extends Component {

  constructor (props) {
    super(props);

    this.state = {
      book: {},
    }
  }

  componentWillMount() {
    const db = firebase.firestore().collection("books").doc(this.props.match.params.id);

    db.get().then((doc) => {
      if (doc.exists) {
        this.setState ({
          book: doc.data(),
        });
        console.log(this.state.book);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }



  render() {
    return (
      <div className="show-book-container">
        <Link to="/books/">Back to book list</Link>
        {this.state.book.title}
        {this.state.book.author}

      </div>
    )
  }
}

export default ShowBook;