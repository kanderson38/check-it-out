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
        console.log(doc.id, " => ", doc.data());
        allData.push (
          {
            id: doc.id,
            user: doc.data().user,
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
            dateCreated={doc.dateCreated}
            categories={doc.categories}
            responses={doc.responses}
          />
        )
      })

      this.setState ({
        recommendationRequests: allRecReqs,
      })
    });
  }

  render() {
    console.log(this.props);
    return (
      <div className="recommendations-container" >
        <div className="new-recommendation-container"><Link to="/addrec/">Request a new recommendation</Link></div>
        {this.state.recommendationRequests}
      </div>
    )
  }
}

export default Recommendations;