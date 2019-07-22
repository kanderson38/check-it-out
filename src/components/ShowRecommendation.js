import React, { Component } from 'react';
import firebase from '../firebaseConfig';
import * as moment from 'moment';


import BookItem from './BookItem.js';


class ShowRecommendation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendationRequest: {},
      formattedDate: "",
    }
  }

  componentDidMount() {
    const recReq = firebase.firestore().collection("recommendationRequests").doc(this.props.match.params.id);
    recReq.get().then((doc) => {
      if (doc.exists) {
        
    var t = doc.data().dateCreated.toDate();
    const formatted = moment(t).format("MMM Do YYYY");
        this.setState({
          recommendationRequest: doc.data(),
          formattedDate: formatted,
        });


      } else {
        const status = {
          type: "error",
          message: `Recommendation request does not exist`,
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
  }

  render() {
    return (
      <div className="show-recommendation-container">

        {this.state.formattedDate}
        {this.state.recommendationRequest.user}
        {this.state.recommendationRequest.categories}
        {this.state.recommendationRequest.note}
      </div>
    );
  }
}

export default ShowRecommendation;