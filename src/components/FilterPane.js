import React, { Component } from 'react';
import firebase from '../firebaseConfig';
import FilterItem from './FilterItem.js';
import SearchBar from './SearchBar.js';
import './FilterPane.css';

class FilterPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    }
  };

  componentWillMount() {
    const allCategories = this.state.categories;
    const db = firebase.firestore().collection("categories");

    db.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allCategories.push({ name: doc.data().name, type: doc.data().type });
      });

      const categoryItems = allCategories.map((cat) => {
        return <FilterItem
          key={cat.name}
          name={cat.name}
          type={cat.type}
          addFilterCallback={this.props.addFilterCallback}
          removeFilterCallback={this.props.removeFilterCallback}
        />
      });

      this.setState({
        categories: categoryItems,
      });
    });
  }

  render() {
    return (
      <div className="filterpane-container">
        <SearchBar searchBooksCallback={this.props.searchBooksCallback} />
        <div className="categories-container">
          <p><strong>Filter by Category:</strong></p>
          {this.state.categories}
        </div>
      </div>
    )
  }

}

export default FilterPane;