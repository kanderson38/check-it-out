import React, { Component } from 'react';
import firebase from '../firebaseConfig';


class ShowRecommendation extends Component {
  constructor (props) {
    super(props);

    this.state = {
      recommendationRequest: {},
    }
  }

  componentDidMount() {
    const recReq = firebase.firestore().collection("recommendationRequests").doc(this.props.match.params.id);
    recReq.get().then((doc) => {
      if (doc.exists) {
        const categories = doc.data().categories;
        const arr = categories ? Object.keys(categories) : [];
        this.setState({
          recommendationRequest: doc.data(),
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

  render () {
    return (
<div className="show-recommendation-container">here</div>
    );
  }
}

export default ShowRecommendation;