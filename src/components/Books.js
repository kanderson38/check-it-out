import React, { Component } from 'react';
import BookItem from './BookItem.js';
import firebase from '../firebaseConfig.js'


class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    }
    
  }

  componentWillMount () {
    const allBooks = this.state.books;
    const db = firebase.firestore().collection("books");

    db.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        allBooks.push({ title: doc.data().title, author: doc.data().author });
        console.log(allBooks);
        // console.log(`${doc.id} => ${doc.data().title}`);
      });

      const bookItems = allBooks.map((book) => {
        return <BookItem
          key={book.id}
          title={book.title}
          author={book.author}
        />
      });

      this.setState ({
        books: bookItems,
      });
    });
  }

  render() {

    return (
      <div>

        {this.state.books}

      </div>
    )
  }

}

export default Books;