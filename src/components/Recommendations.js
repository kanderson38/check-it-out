import React, { Component } from 'react';
import firebase from "../firebaseConfig";
import { Link } from 'react-router-dom';

import RecommendationItem from './RecommendationItem.js';

import './Recommendations.css';

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendationRequests: [],
    }
  }

  componentDidMount() {
    const allData = [];
    const db = firebase.firestore();
    db.collection("recommendationRequests").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        
        allData.push (
          {
            id: doc.id,
            user: doc.data().user,
            userEmail: doc.data().userEmail,
            dateCreated: doc.data().dateCreated,
            categories: doc.data().categories,
            responses: doc.data().responses,
          }
        )

      });

      const allRecReqs = allData.map ((doc) => {
        return (
          <RecommendationItem 
            {...this.props}
            key={doc.id}
            id={doc.id}
            requester={doc.user}
            userEmail={doc.userEmail}
            dateCreated={doc.dateCreated}
            categories={doc.categories}
            responses={doc.responses}
            deleteRequestCallback={this.deleteRequest}
          />
        )
      })

      this.setState ({
        recommendationRequests: allRecReqs,
      })
    });
  }

  deleteRequest = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      console.log("here");
      const db = firebase.firestore();

      db.collection("recommendationRequests").doc(id).delete().then(() => {
        const status = {
          type: "success",
          message: "Successfully deleted request!",
        }
        this.props.showStatusCallback(status);

      window.location.reload();
      }).catch((error) => {
        console.error("Error removing document: ", error);
        const status = {
          type: "error",
          message: error,
        }
        this.props.showStatusCallback(status);
      });
    }
  }

  render() {
    return (
      <div className="recommendations-container" >
        <div className="new-recommendation-container"><Link to="/addrec/">Request a new recommendation</Link></div>
        {this.state.recommendationRequests}
      </div>
    )
  }
}

export default Recommendations;