import React, { Component } from 'react';
import firebase from '../firebaseConfig';
import CategoryItem from './CategoryItem.js';
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
        return <CategoryItem
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
    console.log(this.props.match.params.id);
    return (
      <div className="filterpane-container">
        {this.props.match.params.id ? <span></span> : <SearchBar searchBooksCallback={this.props.searchBooksCallback} />}
        <div className="categories-container">
          {this.props.match.params.id ? <p><strong>Choose Categories for this Book:</strong></p> : <p><strong>Filter by Category:</strong></p>}
          {this.state.categories}
        </div>
      </div>
    )
  }

}

export default FilterPane;