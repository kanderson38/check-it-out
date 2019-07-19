import React, { Component } from 'react';
import * as moment from 'moment'
import firebase from "../firebaseConfig";

import { Link } from 'react-router-dom';

import './RecommendationItem.css';

class RecommendationItem extends Component {

  formatCategories = () => {
    return (this.props.categories.map((cat, i) => {
      return (<li className="category-button" key={i}>{cat}</li>);
    })

    )
  }

  render() {
    var t = this.props.dateCreated.toDate();
    const formatted = moment(t).format("MMM Do YYYY")
    return (
      <div className="rec-item-link">
          <div className="rec-item-container">
            
        <span className="rec-name-date">
        <Link to={`${this.props.match.url}${this.props.id}`}>
              {formatted}: Submitted by
          {` ${this.props.requester}`}
          </Link>
          <span className="delete-rec-link"><small>Delete this request {this.props.user.displayName}</small></span>
            </span>
            <ul className="rec-category-list">{this.formatCategories()}</ul>
            <span className="responses">{this.props.responses.length} {this.props.responses.length === 1 ? "response" : "responses"}</span>
          </div>
      </div >
    )
  }

}

export default RecommendationItem;