import React, {Component} from 'react'
import './Home.css';
import logo from '../images/logo2.svg'

class Home extends Component {
  render () {

  return (
    <div className="home-container">
      
      <img className="home-logo" src={logo} alt="Check It Out"></img>
      <h1 className="logo-header">
        Check It Out
      </h1>
    </div>
  )}
}

export default Home;